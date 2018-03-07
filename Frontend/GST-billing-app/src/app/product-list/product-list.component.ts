import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {GstService} from '../gst.service.ts.service'
import {Product} from '../models/product'
import {TableModule} from 'primeng/table';
import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productsList:Product[];
  product:Product;
  display:boolean;
  editedProduct;
  @Output() displayNotify = new EventEmitter<boolean>()
  constructor(private gstService:GstService) { }

  ngOnInit() {
    this.display = true;
    this.getAllProducts();
  }

  getAllProducts(){
    this.gstService.getAllProducts().subscribe(
      data=>{
        this.productsList = data;
        console.log(this.productsList);
      }
    )
  }

  selectedProduct(product:Product){
    this.product = product;
  }

  addNewProduct(product:Product){
    this.product = new Product;
  }

  addProduct(product:Product){
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
        // this.addProductNotify.emit(this.product)
        this.getAllProducts();
      }
    )
  }
}
