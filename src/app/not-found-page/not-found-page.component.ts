import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css'],
})
export class NotFoundPageComponent implements OnInit {
  optionsError: AnimationOptions = {
    path: 'assets/anim/error-404.json',
  };
  constructor(private title: Title) {
    title.setTitle('Not Found - Thrifty');
  }

  ngOnInit(): void {}
}
