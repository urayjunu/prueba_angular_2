import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
 
  constructor(private http: HttpClient) { }
  
  getProducList(): Observable<any> {
    return  this.http.get('https://fakestoreapi.com/products'); 
    
  }

  getCategories(): Observable<any> {
    return  this.http.get('https://fakestoreapi.com/products/categories'); 
    
  }

  seachCategory( texto: string ):Observable<any> {
    return this.http.get(`https://fakestoreapi.com/products/category/${ texto }`); 

  }
  limitProducts( limit: string ):Observable<any> {
    return this.http.get(`https://fakestoreapi.com/products?limit=${ limit }`); 

  }

  productM( id: number ):Observable<any> {
    return this.http.get(`https://fakestoreapi.com/products/${ id }`); 

  }

   
}
