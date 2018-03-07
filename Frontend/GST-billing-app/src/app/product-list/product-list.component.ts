import { Component, OnInit } from '@angular/core';
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
  constructor(private gstService:GstService) { }

  ngOnInit() {
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
  }
}
