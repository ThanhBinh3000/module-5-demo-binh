import {Injectable} from '@angular/core';
import {Product} from '../model/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  listProduct() {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {
  }
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + '/products');
  }

  saveProduct(product): Observable<Product> {
    return this.http.post<Product>(API_URL + '/products', product);
  }

  findById(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/products/${id}`);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${API_URL}/products/${id}`, product);
  }
  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${API_URL}/products/${id}`);
  }
}
