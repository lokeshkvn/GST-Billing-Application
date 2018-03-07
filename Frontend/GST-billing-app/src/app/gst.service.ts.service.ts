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

}
