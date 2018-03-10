import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './models/product'

@Injectable()
export class GstService{

  constructor(private http:HttpClient) {

   }

   //get all products from the database through server
   getAllProducts(){
     return this.http.get<Product[]>('http://localhost:3000/products');
   }

   //get the product with the product code through the server from database
   getProductFromCode(product_code){
     return this.http.get<Product>('http://localhost:3000/code/'+product_code)
   }

   //get the product with the product name from the server
   getProductFromName(product_name){
    return this.http.get<Product>('http://localhost:3000/name/'+product_name)
   }

   //add new product to the database
   addProduct(product:Product){
     const body = JSON.stringify(product)
     return this.http.post<any>('http://localhost:3000/product',body);
   }

   //edit the existing product in the database
   editProduct(product:Product,product_code){
    const body = JSON.stringify(product)
    return this.http.post<any>('http://localhost:3000/'+ product_code,body);
   }
}
