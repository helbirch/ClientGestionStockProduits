import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input()
  item: any;

  keys = [];

  constructor() {
    console.log('ici');
  }

  ngOnInit() {
    if(this.item){
      this.keys = Object.keys(this.item);
    }
  }

}
