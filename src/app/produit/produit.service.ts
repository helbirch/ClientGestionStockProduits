import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { API_URLS} from '../config/api.url.config';
import { Produit } from '../shared/produit';
import { CrudService } from '../shared/crud.service';

@Injectable()
export class ProduitService implements CrudService<Produit, number>{

  constructor(private http: HttpClient){

  }

  getAll(): Observable<any>{
    return this.http.get(API_URLS.PRODUITS_URL);
  }

  add(produit:Produit): Observable<any>{
    return this.http.post(API_URLS.PRODUITS_URL, produit);
  }

  update(produit: Produit): Observable<any>{
    return this.http.put(API_URLS.PRODUITS_URL, produit);
  }

  delete(id:number): Observable<any>{
    return this.http.delete(API_URLS.PRODUITS_URL + `/${id}`);
  }




}
