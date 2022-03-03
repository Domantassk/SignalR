import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr"; 
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
      this.graph.data[0].x.push(data[0].x[0]);    
      this.graph.data[0].y.push(data[0].y[0]);
      this.graph.data[0].name = data[0].name;
      this.graph.data[0].type = data[0].type;
      this.graph.data[0].mode = 'lines+points';
      //this.graph.data[0].x.push(this.data[0].x[0]);
      //this.graph.data[0].y.push(this.data[0].x[0]);
      this.graph.data = data;
      //this.data = this.graph.data;
      //this.data.pipe(data);
    });
  }

}
