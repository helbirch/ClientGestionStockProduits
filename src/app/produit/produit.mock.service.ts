import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import {Produit} from '../shared/produit';

@Injectable()
export class ProduitMockService{

  private PRODUITS: Produit[] = [];
  private ID = 0;

  constructor(){
    let p1: Produit = new Produit(this.ID++,'Livre', 50, 20);
    let p2: Produit = new Produit(this.ID++,'Cahier', 200, 5.25);
    let p3: Produit = new Produit(this.ID++,'Stylo', 500, 2.10);
    this.PRODUITS.push(p1);
    this.PRODUITS.push(p2);
    this.PRODUITS.push(p3);
  }

  getProduits(): Observable<any>{
    return of(this.PRODUITS);
  }

  addProduit(produit:Produit): Observable<any>{
    produit.id = this.ID++;
    this.PRODUITS.push(produit);
    return of('success');
  }

  updateProduit(produit: Produit): Observable<any>{
    const index = this.findIndexOfProduit(produit.id);
    if(index>=0){
      this.PRODUITS.splice(index,1);
      this.PRODUITS.push(produit);
    }
    return of('success');
  }

  deleteProduit(id:number): Observable<any>{
    const index = this.findIndexOfProduit(id);
    if(index>=0){
      this.PRODUITS.splice(index,1);
    }
    return of('success');
  }

  findIndexOfProduit(id:number){
    let index = -1;
    this.PRODUITS.forEach( (produit, i) => {
      if(produit.id === id){
        index = i;
        return;
      }
    });
    return index;
  }
}
