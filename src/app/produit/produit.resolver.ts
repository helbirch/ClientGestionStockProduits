import {Injectable} from '@angular/core';
import { Resolve } from '@angular/router';
import { ProduitMockService } from './produit.mock.service';

@Injectable()
export class ProduitResolver implements Resolve<any>{

  constructor(private produitService:ProduitMockService){

  }
  resolve(){
    return this.produitService.getAll();
  }
}
