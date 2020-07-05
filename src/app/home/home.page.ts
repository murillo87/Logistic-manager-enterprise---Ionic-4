import { Component, OnInit, ViewChild } from '@angular/core';

import { IonInfiniteScroll } from '@ionic/angular';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {  

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  dataList:any;

  list_array: any;
  items: Array<any>;

  slice: number = 6;

  constructor(private http: HttpClient) {

    /*this.dataList = [];
    
    for (let i = 0; i < 50; i++) { 
      this.dataList.push("Item number "+this.dataList.length);
    }*/
    
  }

  /*loadData(event) {
    
    setTimeout(() => {
      for (let i = 0; i < 10; i++) { 
        
       console.log('Done', i);

        this.dataList.push("Item number "+this.dataList.length);
        console.log('Frank', this.dataList.length);
      }
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.dataList.length == 50) {
        event.target.disabled = true;
      }
    }, 1500);
    
  }*/

  /*toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }*/

  ngOnInit(){

    try {
      this.http.get('http://apiservicepruebas.portalclientes.finesa.com.co/api/v1/aseguradoras').subscribe((response) => {
        this.list_array = response;
        this.items = this.list_array.data.aseguradoras;
        console.log(this.items);
      });
    }catch (err) {
      console.log('Lo sentimos hay problemas de conexión', err);
    }

  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.slice += 5;
      infiniteScroll.target.complete();
    }, 1500);
    
  }

}
