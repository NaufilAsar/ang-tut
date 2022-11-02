import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  displayStyleSuccess = 'none';
  displayStyleError = 'none';
  firebaseErrorMessage: string = '';
  singUpSuccess: boolean = false;
  signupForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  signup() {
    if (this.signupForm.invalid) {
      // if there's an error in the form, don't submit it
      this.displayStyleError = 'block';
      return;
    }

    this.displayStyleSuccess = 'block';
    this.authService
      .signupUser(this.signupForm.value)
      .then((result) => {
        if (result == null) {
          // null is success, false means there was an error
          this.singUpSuccess = true;
          this.router.navigate(['/home']);
        } else if (result.isValid == false)
          this.firebaseErrorMessage = result.message;
      })
      .catch(() => {});
  }
}
