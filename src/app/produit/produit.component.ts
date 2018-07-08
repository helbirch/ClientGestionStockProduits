import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {ProduitMockService} from './produit.mock.service';
import {Produit} from '../shared/produit';
import { Column } from '../shared/column.model';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit{

    produits: Produit[];

    produitForm: FormGroup;

    initProduit = new Produit();

    dataDesc: Column[];

    constructor(private produitService: ProduitMockService, private route: ActivatedRoute, private fb: FormBuilder){

    }

    ngOnInit(){
      this.produits = this.route.snapshot.data.produits;
      this.produitForm = this.fb.group({
        ref: ['', Validators.required],
        quantite: '',
        prixUnitaire: ''
      });

      this.dataDesc = [
        new Column('id','ID','number',true,[]),
        new Column('ref','Référence','text',false,[]),
        new Column('quantite','Quantité','number',false,[]),
        new Column('prixUnitaire','Prix Unitaire','number',false,[])
      ];
    }
}
