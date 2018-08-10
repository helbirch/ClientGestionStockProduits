import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { CrudService } from './../crud.service';
import { Column } from '../../column.model';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css']
})
export class SimpleComponent implements OnInit {

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

  constructor(private fb: FormBuilder){
    this.createForm();
  }

  ngOnInit(){
    this.initData();
  }

  createForm(){
    if(this.initCrudForm){
      this.crudForm = this.initCrudForm;
    } else {
      this.crudForm = this.fb.group({});
    }
  }



  loadData(){
    this.service.getAll().subscribe(
      data => {this.data = data},
      error => { console.log('An error was occured.')},
      () => { console.log('loading data was done.')}
    );
  }

  add(){
    const p = this.crudForm.value;
    this.service.add(p).subscribe(
      res => {
        this.initData();
        this.loadData();
      }
    );
  }

  update(){
    this.service.update(this.selectedItem)
    .subscribe(
      res => {
        this.initData();
        this.loadData();
      }
    );
  }

  initData(){
    this.selectedItem = this.initItem;
    this.createForm();
  }

  delete(){
    this.service.delete(this.selectedItem.id).
    subscribe(
      res =>{
        this.selectedItem = this.initItem;
        this.loadData();
      }
    );
  }

}
