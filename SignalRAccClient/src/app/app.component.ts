import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { ApexAxisChartSeries, ApexChart, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { SignalRService } from './services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  

  constructor(public signalRService: SignalRService, private http: HttpClient) { }
  
  

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
    this.startHttpRequest();
    console.log(this.signalRService.graph);
  }
  private startHttpRequest = () => {
    this.http.get('https://localhost:5001/api/chart')
      .subscribe(res => {
        console.log(res);
      })
  }
  
}
