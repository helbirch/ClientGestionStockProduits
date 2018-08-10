import { Component, OnInit, Input } from '@angular/core';
import { FormGroup} from '@angular/forms';

import { CrudService } from './crud.service';
import { Column } from '../column.model';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  initItem: any;

  @Input()
  initCrudForm: FormGroup;

  @Input()
  data: any;

  @Input()
  service: CrudService;

  @Input()
  dataDesc: Column[];

  crudForm: FormGroup;

  operation: string = 'add';

  selectedItem: any;

  keys = [];

  crudType = 'simple';



  constructor(){
  }

  ngOnInit(){
  }

}
