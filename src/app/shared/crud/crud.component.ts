import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  @Input()
  data: [];

  @Input()
  title: string;

  @Input()
  initCrudForm: FormGroup;

  crudForm: FormGroup;

  operation: string = 'add';

  selectedItem: any;

  constructor(private produitService: ProduitMockService, private fb: FormBuilder){
    this.createForm();
  }

  ngOnInit(){

    this.initProduit();

  }

  createForm(){
    if(this.initCrudForm){
      this.crudForm = this.initCrudForm;
    } else {
      this.crudForm = this.fb.group();
    }
  }
  
  loadProduits(){
    this.produitService.getAll().subscribe(
      data => {this.data = data},
      error => { console.log('An error was occured.')},
      () => { console.log('loading produits was done.')}
    );
  }

  addProduit(){
    const p = this.produitForm.value;
    this.produitService.add(p).subscribe(
      res => {
        this.initProduit();
        this.loadProduits();
      }
    );
  }

  updateProduit(){
    this.produitService.update(this.selectedProduit)
    .subscribe(
      res => {
        this.initProduit();
        this.loadProduits();
      }
    );
  }

  initProduit(){
    this.selectedProduit = new Produit();
    this.createForm();
  }

  deleteProduit(){
    this.produitService.delete(this.selectedProduit.id).
    subscribe(
      res =>{
        this.selectedProduit = new Produit();
        this.loadProduits();
      }
    );
  }

}
