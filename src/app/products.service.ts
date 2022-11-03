import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/User';
import { Observable } from 'rxjs';
import { Product } from 'src/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url : String;

  constructor(private http : HttpClient) {
    this.url = 'http://localhost:8080';
   }

  public getAllProducts() : Observable<Product[]>{
    console.log("SERVICE ----------------->");
    return this.http.get<Product[]>(this.url + '/getProducts');
  }

  public searchProduct(productName : String) : Observable<Product>{
    return this.http.get<Product>(this.url + `/getProductByName?productName=${productName}`);
  }

  public deleteProduct(productName : String) : Observable<Product>{
    return this.http.delete<Product>(this.url + `/deleteProductByName?productName=${productName}`);
  }

  public changeProductStatus(productName : String , product : Product) : Observable<Product>{
    return this.http.put<Product>(this.url + `/updateProductStatus?productName=${productName}`,product.productStatus);
  }

  public createProduct(product : Product) : Observable<Product>{
    return this.http.post<Product>(this.url + `/addProduct`,product);
  }

  public placeOrder(loginId : String, product : Product) : any{
    return this.http.post(this.url + `/placeOrder?loginId=${loginId}`,product);
  }

  public getAllOrders() : any{
    return this.http.get(this.url + `/getOrders`);
  }
}

