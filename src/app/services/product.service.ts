import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { jsonIgnoreReplacer } from 'json-ignore';

const baseUrl = 'http://localhost:8000/api/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl);
  }
  get(id: any): Observable<Product> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    debugger
    data.startDate = data.startDate.toLocaleString()
    data.developers = [{"name":"Stevie"}]
    return this.http.post(baseUrl, data);
  }

  // update(id: any, data: any): Observable<any> {
  // update(id: any): Observable<any> {    
  //   return this.http.put(`${baseUrl}/${id}`, data);
  // }
  update(data:any): Observable<Product> {
    //debugger
    // const data_json = JSON.stringify(data, jsonIgnoreReplacer);

    return this.http.patch<Product>(`${baseUrl}/${data.id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}?title=${title}`);
  }
}
