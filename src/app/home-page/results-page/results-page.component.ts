import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.css']
})
export class ResultsPageComponent implements OnInit {

  resultsFetched = true;
  @Input() results = {} // take results from parent HomePageComponent

  constructor() { }

  ngOnInit(): void {
  }

}
