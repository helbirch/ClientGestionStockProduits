import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { Column } from '../../column.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input()
  dataDesc: Column[];

  csvRecords: any[] = [];

  bindingArray: any[] = [];

  @ViewChild('fileimportInput') fileimportInput: any;

  constructor() { }

  ngOnInit() {
  }

  isCSVFile(file: any){
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any){
    let headers = csvRecordsArr[0].split(';');
    let headerArray = [];
    headers.forEach(header => headerArray.push(header));
    return headerArray;
  }

  getDataRecordsFromCSVFile(csvRecordsArray: any, headerLength: any){
    let dataArr = [];
    for(let i = 1; i < csvRecordsArray.length; i++){
      let data = csvRecordsArray[i].split(';');

      if(data.length == headerLength){
        let csvRecord = {};
        this.bindingArray.forEach(bindingItem => {
          if(bindingItem.index !== -1){
            const value = data[bindingItem.index].trim();
            csvRecord[bindingItem.columnName] = bindingItem.dataType == 'number' ? Number(value) : bindingItem.dataType == 'text' ? value : null;
          }
        });

        dataArr.push(csvRecord);
      }
    }
    return dataArr;
  }

  getBindingArray(headerArray): any[]{
    let bindingArray = [];
    let i = 0;
    headerArray.forEach(header => {
      if(header.toUpperCase() !== 'ID'){
        const bindingItem = {
          columnName: '',
          dataType: '',
          index: -1
        }
        const index = this.dataDesc.findIndex( datadescItem => datadescItem.columnName.toUpperCase() == header.toUpperCase());
        if(index>-1){
          bindingItem.columnName = this.dataDesc[index].columnName;
          bindingItem.dataType = this.dataDesc[index].dataType;
          bindingItem.index = i;
        }
        bindingArray.push(bindingItem);
      }
      i++;
    });
    return bindingArray;
  }

  fileReset(){
    this.fileimportInput.nativeElement.value = "";
    this.csvRecords = [];
    this.bindingArray = [];
  }

  fileChangelistener($event: any){
    let text = [];
    let files = $event.srcElement.files;

    if(this.isCSVFile(files[0])){
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = (data) => {
        let csvData = reader.result;
        let csvRecordsArray = csvData.split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.bindingArray = this.getBindingArray(headersRow);

        this.csvRecords = this.getDataRecordsFromCSVFile(csvRecordsArray, headersRow.length);
        console.log(this.csvRecords);
      };

      reader.onerror = () => alert('Unable to read '+ input.files[0]);
    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

}
