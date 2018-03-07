import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './models/product'

@Injectable()
export class GstService{

  constructor(private http:HttpClient) {

   }

   getAllProducts(){
     return this.http.get<Product[]>('http://localhost:3000/products');
   }

   getProductFromCode(product_code){
     return this.http.get<Product>('http://localhost:3000/code/'+product_code)
   }

   getProductFromName(product_name){
    return this.http.get<Product>('http://localhost:3000/name/'+product_name)
   }

   addProduct(product:Product){
     const body = JSON.stringify(product)
     return this.http.post<any>('http://localhost:3000/product',body);
   }

   editProduct(product:Product,product_code){
    const body = JSON.stringify(product)
    return this.http.post<any>('http://localhost:3000/'+ product_code,body);
   }
}
