import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private _router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    console.log(this.isUserLoggedIn);
  }
  isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  onNavLinkClick(button: string) {
    this.collapsed = !this.collapsed;
    let currentUrl = this._router.url;
    console.log(currentUrl);
    if (currentUrl == button) {
      window.location.reload();
    }
  }
  onCategoryClick(category: string) {
    this._router.navigateByUrl('/home?category=' + category);
  }
}
