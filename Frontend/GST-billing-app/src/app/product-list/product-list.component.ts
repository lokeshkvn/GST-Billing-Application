import { Component, OnInit } from '@angular/core';
import {GstService} from '../gst.service.ts.service'
import {Product} from '../models/product'
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productsList:Product[];
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

}
