import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Pages
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';

// Miscellaneous
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LottieModule } from 'ngx-lottie';
import { AdsenseModule } from 'ng2-adsense';
import { HttpClientModule } from '@angular/common/http';

// Firebase
import { AngularFireModule } from '@angular/fire/compat/';
import { environment } from '../environments/environment';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FooterComponent } from './footer/footer.component';

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NotFoundPageComponent,
    HomePageComponent,
    ContactPageComponent,
    LoginPageComponent,
    SignUpComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    LottieModule.forRoot({ player: playerFactory }),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-8102599121469216',
      adSlot: 1410568522,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
