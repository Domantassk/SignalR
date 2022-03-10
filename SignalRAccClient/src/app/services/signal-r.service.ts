import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr"; 
import { ChartConfiguration } from 'chart.js';
import { Observable, of } from 'rxjs';
import { DataModel } from '../interfaces/data-model';
import { TotalResult } from '../interfaces/total-result';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: DataModel[] = [];
  public chartLabels!: number[];
  
  public graph = {
    data: [
        { x: [0], y: [0], type: '', mode: '', name: '', length: 1},
        { x: [0], y: [0], type: '', mode: '', name: ''},
        { x: [0], y: [0], type: '', mode: '', name: ''}
    ]
  };

  public graph2 = {
    data: [
        { x: [0], y: [0], type: '', mode: '', name: '', length: 1},
        { x: [0], y: [0], type: '', mode: '', name: ''},
        { x: [0], y: [0], type: '', mode: '', name: ''}
    ]
  };

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

      
      this.graph2 = {
        data: [
            { x: this.graph.data[0].x, y: this.graph.data[0].y, type: this.graph.data[0].type, mode: this.graph.data[0].mode, name:  this.graph.data[0].name, length: this.graph.data[0].x.length},
            { x: [0], y: [0], type: '', mode: '', name: ''},
            { x: [0], y: [0], type: '', mode: '', name: ''}
        ]
      };
      console.log(this.graph2);
    });
  }

}
