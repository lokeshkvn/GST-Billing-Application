import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product';
import { InputTextModule } from 'primeng/inputtext';
import { GstService } from '../gst.service.ts.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;
  @Output() addProductNotify = new EventEmitter<Product>()
  editedProduct;
  display: boolean;

  constructor(private gstService: GstService) {
    this.display = true;
  }

  ngOnInit() {
    this.display = true;
    console.log(this.product);
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
        }
      )
    }
    else {
      this.addProduct();
    }
  }

  addProduct() {
    this.gstService.addProduct(this.product).subscribe(
      data => {
        console.log(data);
        this.display = false;
        this.addProductNotify.emit(this.product)
      }
    )
  }


}
