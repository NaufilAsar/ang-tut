import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  search_product = new FormControl('');
  search_icon = faMagnifyingGlass
  
  constructor(private router: Router) { }
  

  ngOnInit(): void {
  }
  onClickSearch(){
    console.log(this.search_product.value);
    // Access API and display the products
    this.router.navigate(['/results']);
  }
}