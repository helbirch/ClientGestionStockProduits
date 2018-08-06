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

  selectedColumnName = 'prixUnitaire';
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
    this.produitDataDesc = this.dataDescService.getProduitDataDesc().filter(item => item.dataType === 'number' && !item.readonly);

    this.buildData();
  }

  buildData(){
    this.produitService.getAll().subscribe(list => {
      this.data.labels = [];
      list.forEach(produit => this.data.labels.push(produit.ref));

      this.data.datasets = [];

      const selectColumn = this.produitDataDesc.find(item => item.columnName === this.selectedColumnName);

      if(selectColumn){
        const datasetsItem = {
          label: selectColumn.columnRef,
          data: []
        };

        list.forEach(produit => datasetsItem.data.push(produit[selectColumn.columnName]));
        this.data.datasets.push(datasetsItem);
      }

    });


  }

}
