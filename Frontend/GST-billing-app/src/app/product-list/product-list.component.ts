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
  //declaring and initializing variables
  productsList: Product[];
  productsListForBilling: Product[];
  product: Product;
  display: boolean;
  product_added;
  total_price = 0;
  total_gst = 0;
  total = 0;
  total_quantity = 0;
  billList = [];
  editedProduct;
  constructor(private gstService: GstService) { }

  //Getting Products list from the server on initialisation
  ngOnInit() {
    this.display = true;
    this.getAllProducts();
  }

  //Calling Service for retrieving all products from server
  getAllProducts() {
    this.gstService.getAllProducts().subscribe(
      data => {
        this.productsList = data;
        this.productsListForBilling = this.productsList;
        //filter the products to display in the billing page i.e if product is already added to the bill its will not be displayed 
        // for adding again in billing list
        for (let i of this.billList) {
          this.productsListForBilling = this.productsListForBilling.filter(item => item.product_code !== i.product_code);
        }
      }
    )
  }

  //creating the function to display the modal to edit the selected product
  selectedProduct(product: Product) {
    this.product = product;
  }

  //creating the function to display the modal to add the new product
  addNewProduct(product: Product) {
    this.product = new Product;
  }

  //Calling Service for editing data of the selected product to server.
  editProduct() {
    if (this.product.id) {
      this.editedProduct = {
        product_name: this.product.product_name,
        product_price: this.product.product_price,
        product_gst: this.product.product_gst
      }
      this.gstService.editProduct(this.editedProduct, this.product.product_code).subscribe(
        data => {
          this.display = false;
          this.getAllProducts();
        }
      )
    }
    else {
      this.addaProduct();
    }
  }

  //Calling Service for adding data of the new product to server.
  addaProduct() {
    this.gstService.addProduct(this.product).subscribe(
      data => {
        this.display = false;
        this.getAllProducts();
      }
    )
  }

  //function to add the selected product to the billing list and update the values of the data table accordingly
  selectProductforBill(product_added) {
    this.productsListForBilling = this.productsListForBilling.filter(item => item.product_code !== product_added.product_code);
    this.product_added = product_added;
    this.product_added.quantity = Number(1);
    this.billList.push(product_added);
    this.calculateTotal();
  }

  //function to edit the quantity if the product added to the billing list
  editQuantity(p) {
    this.calculateTotal();
  }

  //function to calculate the total billing amount of all the products
  calculateTotal() {
    this.total_gst = 0;
    this.total_price = 0;
    this.total = 0;
    this.total_quantity = 0
    for (let product_added of this.billList) {
      this.total_gst += product_added.product_price * Number(product_added.quantity) * product_added.product_gst / 100;
      this.total_price += product_added.product_price * Number(product_added.quantity);
      this.total_quantity += Number(product_added.quantity);
      this.total += product_added.product_price * Number(product_added.quantity) * product_added.product_gst / 100 + product_added.product_price * Number(product_added.quantity)
    }

  }

}
