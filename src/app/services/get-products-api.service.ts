import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetProductsApiService {
  constructor(private http: HttpClient) {}
  getProducts(url: string) {
    return this.http.get(url);
  }
}
