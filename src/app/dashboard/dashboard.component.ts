import { Component, OnInit } from '@angular/core';

import { ProduitMockService } from '../produit/produit.mock.service';
import { DataDescService } from '../shared/data.desc.service';
import { Column } from '../shared/column.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  columnName: 'quantite';
  data = {
  labels: [],
  datasets: []
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };
  produitDataDesc: Column[];
  constructor(private produitService: ProduitMockService,
  private dataDescService: DataDescService) { }

  ngOnInit() {
    this.produitDataDesc = this.dataDescService.getProduitDataDesc();

    this.buildData();
  }

  buildData(){
    this.produitService.getAll().subscribe(list => {
      this.data.labels = [];
      list.forEach(produit => this.data.labels.push(produit.ref));

      this.data.datasets = [];
      const columnName = 'quantite';
      switch(columnName){
        case 'quantite':
          const datasetsItem = {
            label: 'Quantité',
            data: []
          };
          list.forEach(produit => datasetsItem.data.push(produit['quantite']));
          this.data.datasets.push(datasetsItem);
        };
    });


  }

}
