import { Injectable, Input } from '@angular/core';
import * as signalR from "@aspnet/signalr"; 
import { ChartConfiguration } from 'chart.js';
import { ApexAxisChartSeries, ApexChart, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { Observable, of } from 'rxjs';
import { DataModel } from '../interfaces/data-model';
import { TotalResult } from '../interfaces/total-result';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: DataModel[] = [];
  public chartLabels!: number[];
  @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
    {
        name: "My-series",
        data: [0, 3,6,3,2,1,6,8,8,55,4,3,55,0,12,43,23]
    }];
  @Input() chart: ApexChart = {height: 350, type: "line" };
  @Input() title: ApexTitleSubtitle = {text: "accelerometer"};
  
  public graph = {
    data: [
        { x: [0], y: [0], type: '', mode: '', name: '', length: 1},
        { x: [0], y: [0], type: '', mode: '', name: ''},
        { x: [0], y: [0], type: '', mode: '', name: ''}
    ]
  };

  public testas = {
    name: "testas",
    data: [0]
  }

  private hubConnection!: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://localhost:5001/chart')
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data) => {
      //this.data = data;
      //this.results[0].x.push(2);
      //this.results[0].y.push(2);
      //this.graph.data.push(data);
      
      this.graph.data[0].x.push(data[0].x[0]);    
      this.graph.data[0].y.push(data[0].y[0]);
      this.graph.data[0].name = data[0].name;
      this.graph.data[0].type = data[0].type;
      this.graph.data[0].mode = 'lines+points';

      this.graph.data[1].x.push(data[1].x[0]);    
      this.graph.data[1].y.push(data[1].y[0]);
      this.graph.data[1].name = data[1].name;
      this.graph.data[1].type = data[1].type;
      this.graph.data[1].mode = 'lines+points';

      this.graph.data[2].x.push(data[2].x[0]);    
      this.graph.data[2].y.push(data[2].y[0]);
      this.graph.data[2].name = data[2].name;
      this.graph.data[2].type = data[2].type;
      this.graph.data[2].mode = 'lines+points';

      this.testas.data.push(this.graph.data[0].x)
      this.series.push(this.graph.data[0].x);
    });
  }

}
