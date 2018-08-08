import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { CrudService } from '../crud/crud.service';
import { Column } from '../column.model';
import { ChartComponent as Chart } from 'angular2-chartjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  private _selectedColumnName = '';

  data = {
  labels: [],
  datasets: []
  };

  options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    };

  @Input()
  dataDescList: Column[];

  @Input()
  type: string = '';

  @Input()
  service: CrudService;

  @Input()
  title: string = '';

  @ViewChild("myChart") myChart: Chart;

  myDataDescList: Column[];


  constructor() { }

  ngOnInit() {
    this.myDataDescList = this.dataDescList.filter(item => item.dataType === 'number' && !item.readonly);

    this.buildData();
  }

  get selectedColumnName(){
    return this._selectedColumnName;
  }

  set selectedColumnName(selectedColumnName){
    this._selectedColumnName = selectedColumnName;
    this.buildData();
  }

  buildData(){

    this.service.getAll().subscribe(list => {
      this.data.labels = [];
      list.forEach(item => this.data.labels.push(item.ref));

      this.data.datasets = [];

      const colors = ['rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'];

      let index = 0;
      let nextColor = () => {
        if(index>=colors.length){
          index = 0;
        }
        return colors[index++];
      }

      if(!this.selectedColumnName){
        this.myDataDescList.forEach(dataDesc => {
          const datasetsItem = {
            label: dataDesc.columnRef,
            backgroundColor: nextColor(),
            borderColor: 'rgb(255, 99, 132)',
            data: []
          };

          list.forEach(item => datasetsItem.data.push(item[dataDesc.columnName]));
          this.data.datasets.push(datasetsItem);
        });
      } else {
        const selectColumn = this.myDataDescList.find(item => item.columnName === this.selectedColumnName);

        if(selectColumn){
          const datasetsItem = {
            label: selectColumn.columnRef,
            backgroundColor: nextColor(),
            borderColor: 'rgb(255, 99, 132)',
            data: []
          };

          list.forEach(item => datasetsItem.data.push(item[selectColumn.columnName]));
          this.data.datasets.push(datasetsItem);
        }
      }

      if(this.myChart.chart){
        this.myChart.chart.update();
      }
    });


  }

}
