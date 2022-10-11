import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  search_product = new FormControl(''); // search bar
  search_icon = faMagnifyingGlass; // search icon
  apiUrl = 'https://jsonplaceholder.typicode.com/todos/1';
  resultsLoading = false;
  resultsLoaded = false; // change to true when results loaded from API
  results: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}
  onClickSearch() {
    console.log(this.search_product.value);
    this.resultsLoading = true;
    // Access API and display the products
    // this.router.navigate(['/results']);
    // this.resultsLoaded = true;

    // this.resultsLoading = false; // turn off loading
  }
}
