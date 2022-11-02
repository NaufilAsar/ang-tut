import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  display = 'none';

  openModal() {
    this.display = 'block';
  }
  onCloseHandled() {
    this.display = 'none';
  }

  loginForm: FormGroup;
  firebaseErrorMessage: string = '';

  constructor(
    private title: Title,
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    title.setTitle('Login - Thrifty');
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  wait(ms: number) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  ngOnInit(): void {}

  displayStyle = 'none';

  openPopup() {
    if (!this.loginForm.invalid) this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }
  loginUser() {
    if (this.loginForm.invalid) {
      this.firebaseErrorMessage = 'Invalid Input';
      return;
    }

    this.authService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then((result) => {
        console.log('Log status' + this.authService.userLoggedIn);
        if (result == null) {
          // null is success, false means there was an error
          console.log('logging in...');
          // show a pop up
          // wait
          this.wait(400); // 4 miliseconds
          this.router.navigate(['/home']); // when the user is logged in, navigate them to dashboard
        } else if (result.isValid == false) {
          console.log('login error', result);
          this.firebaseErrorMessage = result.message;
        }
      });
  }
}
