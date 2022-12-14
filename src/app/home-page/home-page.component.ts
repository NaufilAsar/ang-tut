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
  // apiUrl = 'https://tender-grass-55002.pktriot.net/results?product=';
  // apiUrl = 'https://thrifty-one.vercel.app/results?product=';
  apiUrl = 'https://temp-api-alpha.vercel.app/results?product=bottle';
  // apiUrl = 'https://thrifty-cru0kxegs-dark-kernel.vercel.app/results?product=bat';
  // apiUrl = 'https://thrifty-h2okttvns-dark-kernel.vercel.app/results?product=watch';
  displayLoadingAnimation = false;
  resultsLoaded = false; // change to true when results loaded from API
  hideSectionAnimations = this.resultsLoaded;
  gotError = false; // if error when loading results
  results: any; // store product info from API
  usingParams = false; // whether using parameters in link (for category)
  productName: string | null = '';

  constructor(
    private router: Router,
    private api: GetProductsApiService,
    private title: Title,
    private activatedRoute: ActivatedRoute
  ) {
    title.setTitle('Home - Trhifty');
  }
  shuffleArray(arr: any[]) {
    const res = [];
    while (arr.length) {
      res.push(arr.splice(~~(Math.random() * arr.length), 1)[0]);
    }
    return res;
  }
  ngOnInit(): void {
    // this.developmentAutoClick();
    this.resolveIfCategoryFound();
  }

  resolveIfCategoryFound(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (Object.keys(params).length === 0) {
        console.log('no default params found');
      } else {
        this.productName = 'Category ' + params['category'];
        // reslove params
        let search_bar = <HTMLInputElement>(
          document.getElementById('search_box')
        );
        if (search_bar) {
          search_bar.value = params['category'];
          this.usingParams = true;
          let categoryArray: any = [];
          if (params['category'] === 'Computer') {
            categoryArray = [
              'Computer',
              'Mobile',
              'Keyboard',
              'Powerbank',
              'Charger',
            ];
          } else if (params['category'] === 'Fashion') {
            categoryArray = ['Mens Clothes', 'Womens Clothes'];
          } else if (params['category'] === 'Sports') {
            categoryArray = [
              'Cricket Bat',
              'Cricket Ball',
              'Football',
              'Tennis Racket',
            ];
          } else if (params['category'] === 'Appliances') {
            categoryArray = ['Washing Machine', 'AC', 'Chimney', 'Television'];
          } else if (params['category'] === 'Health') {
            categoryArray = ['Protein Powder', 'Dumbells', 'Sportswear'];
          }
          this.displayLoadingAnimation = false;
          for (let i = 0; i < categoryArray.length; i++) {
            if (i == 0) this.fetchProducts(categoryArray[i], true, true);
            this.fetchProducts(categoryArray[i], true, false);
          }
          this.displayLoadingAnimation = true;
        }
      }
    });
  }

  developmentAutoClick() {
    this.onClickSearch();
    this.fetchProducts('iphone', false, false);
  }

  onClickSearch() {
    this.gotError = false;
    console.log('User entered: ' + this.search_product.value);
    this.displayLoadingAnimation = true; // display loading animation
    // Access API and display the products
    this.fetchProducts(this.search_product.value, false, false);
    this.productName != this.search_product.value;
  }

  // use server api link to search products
  fetchProducts(
    item: string | null,
    ifCategory: Boolean = false,
    refeshCategory: Boolean = false
  ) {
    let url = this.apiUrl + item?.replace(' ', '_');
    this.api.getProducts(url).subscribe({
      next: (products) => {
        console.log(products);
        if (!ifCategory) this.productName = item;
        if (!ifCategory || refeshCategory) {
          // console.log(
          //   'Here: ' +
          //     document.getElementById('productArray')?.firstElementChild
          // );
          let e = document.getElementById('productArray');

          //e.firstElementChild can be used.
          let child = e?.lastElementChild;
          while (child) {
            e?.removeChild(child);
            child = e?.lastElementChild;
          }

          this.results = []; // initialize array of products
          this.results = products;
        } else this.results.push(products); // if it is a category then refill it since it uses same function more than once
        this.results = this.results.filter((x: any) => {
          return (
            x.img != undefined &&
            x.title != undefined &&
            x.site != undefined &&
            x.price != undefined &&
            x.url != undefined
          );
        });
        this.results = this.shuffleArray(this.results);
        console.log('Fetched ' + this.results.length + ' results');
        this.resultsLoaded = true;
        this.hideSectionAnimations = true;
        this.displayLoadingAnimation = false; // turn off loading animation
      },
      error: (error) => {
        console.log('oops: ', error);
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
    localStorage.setItem('suggestions', JSON.stringify(suggestions));
    let indexes = this.results[Math.floor(Math.random() * this.results.length)];
    console.log(this.results);
    this.router.navigate(['/price-info']);
  }
  showSuggestions(): Object[] {
    return [this.results[1], this.results[3], this.results[4], this.results[7]];
  }
}
