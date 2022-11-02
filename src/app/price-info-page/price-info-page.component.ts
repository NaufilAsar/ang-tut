import { Component, OnInit } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-price-info-page',
  templateUrl: './price-info-page.component.html',
  styleUrls: ['./price-info-page.component.css'],
})
export class PriceInfoPageComponent implements OnInit {
  suggestions: any = [];
  product: any;
  lineChartData: ChartConfiguration<'line'>['data'];
  lineChartOptions: ChartOptions<'line'>;
  lineChartLegend: boolean;
  priceData: number[] = [];
  months = [
    'January 2022',
    'February 2022',
    'March 2022',
    'April 2022',
    'May 2022',
    'June 2022',
    'July 2022',
    'August 2022',
    'September 2022',
    'October 2022',
    'November 2022',
    'December 2022',
  ];
  constructor(private title: Title) {
    title.setTitle('Product - Thrifty');
    this.lineChartData = {
      labels: this.months,
      datasets: [
        {
          data: this.priceData,
          label: 'Price Information',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgb(166, 177, 225, 0.3)',
        },
      ],
    };
    this.lineChartOptions = {
      responsive: true,
    };
    this.lineChartLegend = true;
  }

  ngOnInit(): void {
    this.product = JSON.parse(localStorage.getItem('product') as string);
    console.log(this.product);

    this.suggestions = JSON.parse(
      localStorage.getItem('suggestions') as string
    );
    console.log('Suggestions' + this.suggestions);

    let currentMonth = new Date().toLocaleString('en-us', { month: 'long' });
    let currentMonthNumber = new Date().getMonth() + 1;
    // get current month and display prices till the current month
    this.months.splice(currentMonthNumber);
    // data should be only as long as no of months
    console.log(currentMonth + ' ' + currentMonthNumber);
    console.log(this.months);

    this.calculatePricesForMonth();
  }
  onChartHover() {}
  calculatePricesForMonth() {
    let price = parseInt(
      this.product.price.toLocaleString().replace('₹', '').replace(',', '')
    );
    console.log(typeof price);
    let result = this.months; // priceData
    for (let i = 0; i < this.months.length; i++) {
      if (i == 4) this.priceData[i] = Math.ceil(price + price * 0.1);
      this.priceData[i] = price;
    }
    // this.priceData = [price];
    console.log(this.priceData);
  }
}
