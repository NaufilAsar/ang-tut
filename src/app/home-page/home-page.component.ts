import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { GetProductsApiService } from '../services/get-products-api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  p: number = 1;
  search_product = new FormControl(''); // search bar
  search_icon = faMagnifyingGlass; // search icon
  apiUrl = 'https://thrifty-one.vercel.app/results?product=';
  displayLoadingAnimation = false;
  resultsLoaded = false; // change to true when results loaded from API
  hideSectionAnimations = this.resultsLoaded;
  gotError = false; // if error when loading results
  results: any;
  usingParams = false;
  productName = '';

  constructor(
    private router: Router,
    private api: GetProductsApiService,
    private title: Title,
    private activatedRoute: ActivatedRoute
  ) {
    title.setTitle('Thrifty - Home');
  }

  ngOnInit(): void {
    // this.developmentAutoClick();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (Object.keys(params).length === 0) {
        console.log('no params found');
      } else {
        console.log(params['category']);
        // reslove params
        let search_bar = <HTMLInputElement>(
          document.getElementById('search_box')
        );
        if (search_bar) {
          search_bar.value = this.productName = params['category'];
          this.usingParams = true;
          this.onClickSearch();
        }
      }
    });
  }

  developmentAutoClick() {
    this.gotError = false;
    this.results = [];
    this.displayLoadingAnimation = true;
    var local_url = 'http://localhost:8080/results?data=iphone';
    var url = 'https://thrifty-one.vercel.app/results?product=iphone';
    this.api.getProducts(local_url).subscribe({
      next: (products) => {
        this.results = products;
        console.log(products);
        this.resultsLoaded = true;
        this.hideSectionAnimations = true;
        this.displayLoadingAnimation = false; // turn off loading animation
      },
      error: (error) => {
        console.log('oops', error);
        this.gotError = true;
        this.hideSectionAnimations = true;
        this.displayLoadingAnimation = false;
      },
    });
  }

  onClickSearch() {
    this.gotError = false;

    console.log('User entered: ' + this.search_product.value);
    // display loading animation
    this.displayLoadingAnimation = true;
    // Access API and display the products
    var local_url =
      'http://localhost:8080/results?data=' +
      this.search_product.value?.replace(' ', '_');
    var url = this.apiUrl + this.search_product.value?.replace(' ', '_');
    this.api.getProducts(url).subscribe({
      next: (products) => {
        this.results = [];
        this.results = products;
        console.log(products);
        this.resultsLoaded = true;
        this.hideSectionAnimations = true;
        this.displayLoadingAnimation = false; // turn off loading animation
      },
      error: (error) => {
        console.log('oops', error);
        this.gotError = true;
        this.hideSectionAnimations = true;
        this.displayLoadingAnimation = false;
      },
    });
  }

  onClickViewPriceHistory(data: Object, suggestions: Object[]): void {
    console.log(data);
    // save product to local storage
    localStorage.setItem('product', JSON.stringify(data));
    let indexes = this.results[Math.floor(Math.random() * this.results.length)];
    console.log(this.results);
    this.router.navigate(['/price-info']);
  }
}
/* 

[{
  "site": "amazon",
  "titles": "Price and other details may vary based on data size and colour.",
  "prices": "197",
  "urls": "https://www.amazon.in/Hello-Sunblock-Lotion-Sunscreen-120ml/dp/B0854749FD/ref=sr_1_2?keywords=hello&qid=1666252790&qu=eyJxc2MiOiI1Ljc2IiwicXNhIjoiNC44MyIsInFzcCI6IjAuMDAifQ%3D%3D&sr=8-2",
  "imgs": "https://m.media-amazon.com/images/I/71R8ETeC-gL._AC_UL320_.jpg"
} ,
{
  "site": "amazon",
  "titles": "Price and other details may vary based on data size and colour.",
  "prices": "197",
  "urls": "https://www.amazon.in/Hello-Sunblock-Lotion-Sunscreen-120ml/dp/B0854749FD/ref=sr_1_2?keywords=hello&qid=1666252790&qu=eyJxc2MiOiI1Ljc2IiwicXNhIjoiNC44MyIsInFzcCI6IjAuMDAifQ%3D%3D&sr=8-2",
  "imgs": "https://m.media-amazon.com/images/I/71R8ETeC-gL._AC_UL320_.jpg"
} ,
{
  "site": "amazon",
  "titles": "Price and other details may vary based on data size and colour.",
  "prices": "197",
  "urls": "https://www.amazon.in/Hello-Sunblock-Lotion-Sunscreen-120ml/dp/B0854749FD/ref=sr_1_2?keywords=hello&qid=1666252790&qu=eyJxc2MiOiI1Ljc2IiwicXNhIjoiNC44MyIsInFzcCI6IjAuMDAifQ%3D%3D&sr=8-2",
  "imgs": "https://m.media-amazon.com/images/I/71R8ETeC-gL._AC_UL320_.jpg"
} ]

*/
