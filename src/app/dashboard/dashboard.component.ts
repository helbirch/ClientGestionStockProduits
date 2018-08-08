import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ProduitMockService } from '../produit/produit.mock.service';
import { DataDescService } from '../shared/data.desc.service';
import { Column } from '../shared/column.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private produitService: ProduitMockService,
  private dataDescService: DataDescService) { }

  ngOnInit() {
  }
}
