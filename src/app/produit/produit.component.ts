import {Component, OnInit} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import {ProduitMockService} from './produit.mock.service';
import {Produit} from '../shared/produit';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit{

    produits: Produit[];

    constructor(private route: ActivatedRoute){

    }

    ngOnInit(){
      this.produits = this.route.snapshot.data.produits;
      this.crudForm = this.fb.group({
        ref: ['', Validators.required],
        quantite: '',
        prixUnitaire: ''
      });
    }
}
