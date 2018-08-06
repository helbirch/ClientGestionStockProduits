import { Injectable } from '@angular/core';

import { Column } from './column.model';

@Injectable()
export class DataDescService {

  constructor() { }

  getProduitDataDesc(){
    return [
      new Column('id','ID','number',true,[]),
      new Column('ref','Référence','text',false,[]),
      new Column('quantite','Quantité','number',false,[]),
      new Column('prixUnitaire','Prix Unitaire','number',false,[])
    ];
  }
}
