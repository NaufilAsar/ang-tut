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
    this.developmentAutoClick();
    this.resolveIfCategoryFound();
  }

  resolveIfCategoryFound(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (Object.keys(params).length === 0) {
        console.log('no params found');
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
          for (let category of categoryArray) {
            this.fetchProducts(category, true);
          }
        }
      }
    });
  }

  developmentAutoClick() {
    this.onClickSearch();
    this.fetchProducts('iphone');
  }

  onClickSearch() {
    this.gotError = false;
    console.log('User entered: ' + this.search_product.value);
    this.displayLoadingAnimation = true; // display loading animation
    // Access API and display the products
    this.fetchProducts(this.search_product.value);
    this.productName != this.search_product.value;
  }

  fetchProducts(item: string | null, ifCategory: Boolean = false) {
    let url = this.apiUrl + item?.replace(' ', '_');
    this.api.getProducts(url).subscribe({
      next: (products) => {
        if (ifCategory) this.results = products;
        else this.results.push(products);
        this.results = this.results.filter((x: any) => {
          return (
            x.imgs != undefined &&
            x.titles != undefined &&
            x.site != undefined &&
            x.prices != undefined &&
            x.urls != undefined
          );
        });
        this.results = this.shuffleArray(this.results);
        console.log(this.results);
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
