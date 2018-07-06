import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";

import {Produit} from '../shared/produit';
import { CrudService } from '../shared/crud.service';

@Injectable()
export class ProduitMockService implements CrudService<Produit, number>{

  private PRODUITS: Produit[] = [];

  constructor(){
    let p1: Produit = new Produit(1,'Livre', 50, 20);
    let p2: Produit = new Produit(2,'Cahier', 200, 5.25);
    let p3: Produit = new Produit(3,'Stylo', 500, 2.10);
    this.PRODUITS.push(p1);
    this.PRODUITS.push(p2);
    this.PRODUITS.push(p3);
  }

  getAll(): Observable<any>{
    return of(this.PRODUITS);
  }

  add(entity:Produit): Observable<any>{
    this.PRODUITS.push(entity);
    return of('success');
  }

  update(entity: Produit): Observable<any>{
    return of('success');
  }

  delete(id:number): Observable<any>{
    return of('success');
  }
}
