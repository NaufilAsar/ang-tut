import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { GetProductsApiService } from '../services/get-products-api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  search_product = new FormControl(''); // search bar
  search_icon = faMagnifyingGlass; // search icon
  apiUrl = 'https://jsonplaceholder.typicode.com/todos/1';
  displayLoadingAnimation = false;
  resultsLoaded = false; // change to true when results loaded from API
  hideSectionAnimations = this.resultsLoaded;
  gotError = false; // if error when loading results
  results: any;

  constructor(
    private router: Router,
    private api: GetProductsApiService,
    private title: Title
  ) {
    title.setTitle('Thrifty - Home');
  }

  ngOnInit(): void {}
  onClickSearch() {
    this.gotError = false;
    console.log('User entered: ' + this.search_product.value);
    // display loading animation
    this.displayLoadingAnimation = true;
    // Access API and display the products
    var url =
      'http://52.207.101.56:8080/results?product=' + this.search_product.value;
    this.api.getProducts(url).subscribe(
      (products) => {
        this.results = products;
        console.log(products);
        this.resultsLoaded = true;
        this.hideSectionAnimations = true;
        this.displayLoadingAnimation = false; // turn off loading animation
      },
      (error) => {
        console.log('oops', error);
        this.gotError = true;
        this.hideSectionAnimations = true;
        this.displayLoadingAnimation = false;
      }
    );
  }
}
/* 

{
  "site": "amazon",
  "titles": "Price and other details may vary based on product size and colour.",
  "prices": "197",
  "urls": "https://www.amazon.in/Hello-Sunblock-Lotion-Sunscreen-120ml/dp/B0854749FD/ref=sr_1_2?keywords=hello&qid=1666252790&qu=eyJxc2MiOiI1Ljc2IiwicXNhIjoiNC44MyIsInFzcCI6IjAuMDAifQ%3D%3D&sr=8-2",
  "imgs": "https://m.media-amazon.com/images/I/71R8ETeC-gL._AC_UL320_.jpg"
} 

*/
