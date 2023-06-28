import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { jsonIgnoreReplacer } from 'json-ignore';
import { formatDate} from '@angular/common';


//const baseUrl = 'http://localhost:8006/api/products';
const baseUrl = 'http://localhost:3000/api/products';

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
    data.startDate = formatDate(data.startDate, 'yyyy-MM-dd', 'en-US');
    data.developers = JSON.stringify(data.developers.split(',').map((x:any) => ({'name': x})))
    return this.http.post(baseUrl, data);
  }

  update(data:any): Observable<Product> {
    data.startDate = formatDate(data.startDate, 'yyyy-MM-dd', 'en-US');
    return this.http.patch<Product>(`${baseUrl}/${data.id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
