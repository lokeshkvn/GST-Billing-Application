import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GstService } from '../gst.service.ts.service'
import { Product } from '../models/product'
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productsList: Product[];
  productsListForBilling: Product[];
  product: Product;
  display: boolean;
  product_added;
  total_price = 0;
  total_gst = 0;
  total = 0;
  total_quantity= 0;
  billList = [];
  editedProduct;
  @Output() displayNotify = new EventEmitter<boolean>()
  constructor(private gstService: GstService) { }

  ngOnInit() {
    this.display = true;
    this.getAllProducts();
  }

  getAllProducts() {
    this.gstService.getAllProducts().subscribe(
      data => {
        this.productsList = data;
        this.productsListForBilling = this.productsList;
        for (let i of this.billList) {
          console.log(this.productsList,this.productsListForBilling,"before");
          this.productsListForBilling = this.productsListForBilling.filter(item => item.product_code !== i.product_code);
          console.log(this.productsList,this.productsListForBilling);
        }
      }
    )
  }

  selectedProduct(product: Product) {
    this.product = product;
  }

  addNewProduct(product: Product) {
    this.product = new Product;
  }

  addProduct(product: Product) {
    this.getAllProducts();
    this.displayNotify.emit(true);
  }

  editProduct() {
    if (this.product.id) {
      this.editedProduct = {
        product_name: this.product.product_name,
        product_price: this.product.product_price,
        product_gst: this.product.product_gst
      }
      console.log("Edited", this.editedProduct);
      this.gstService.editProduct(this.editedProduct, this.product.product_code).subscribe(
        data => {
          console.log(data);
          this.display = false;
          this.getAllProducts();
        }
      )
    }
    else {
      this.addaProduct();
    }
  }

  addaProduct() {
    this.gstService.addProduct(this.product).subscribe(
      data => {
        console.log(data);
        this.display = false;
        this.getAllProducts();
      }
    )
  }

  selectProductforBill(product_added) {
    console.log(product_added, "Selected Product");
    console.log(this.productsList,this.productsListForBilling,"before");
    this.productsListForBilling = this.productsListForBilling.filter(item => item.product_code !== product_added.product_code);
    this.product_added = product_added;
    this.product_added.quantity = Number(1);
    this.billList.push(product_added);
    this.calculateTotal();
    console.log(this.billList,this.productsList,this.productsListForBilling);
  }

  editQuantity(p){
    console.log(p,"quantity",p.quantity);
    this.calculateTotal();
  }
  calculateTotal(){
    this.total_gst = 0;
    this.total_price =0;
    this.total = 0;
    this.total_quantity = 0
    for(let product_added of this.billList){
    this.total_gst += product_added.product_price*Number(product_added.quantity)*product_added.product_gst/100;
    this.total_price += product_added.product_price*Number(product_added.quantity);
    this.total_quantity += Number(product_added.quantity);
    this.total += product_added.product_price*Number(product_added.quantity)*product_added.product_gst/100 + product_added.product_price*Number(product_added.quantity) 
  }
}

}
