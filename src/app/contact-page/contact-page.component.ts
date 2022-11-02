import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import '../../assets/email-library/smtp.js';
declare let Email: any;

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
})
export class ContactPageComponent implements OnInit {
  valid = false;
  displayStyle = 'none';
  emailForm: FormGroup = new FormGroup('');
  subject = new FormControl('');
  name = new FormControl('');
  body = new FormControl('');
  email = new FormControl('');
  constructor(private title: Title) {
    title.setTitle('Contact - Thrifty');
  }

  ngOnInit(): void {}
  sendEmail() {
    if (
      this.email.value != '' &&
      this.subject.value != '' &&
      this.name.value != '' &&
      this.body.value != ''
    ) {
      this.valid = true;
    }
    this.displayStyle = 'block';
    Email.send({
      Host: 'smtp.elasticemail.com',
      Username: 'bruhcoders@gmail.com',
      Password: 'B719E83E35FFF8076447F2CDDDC5A610A2B7', //Enter your password here
      To: 'naufilasar9028@gmail.com',
      From: `bruhcoders@gmail.com`,
      Subject: this.subject.value,
      Body: `
                      <i>This is sent as a feedback from my resume page.</i> <br/>
                      <b>Name:
                      </b>${this.name.value} <br />
                      <b>Email: </b>${this.email.value}<br />
                      <b>Subject:
                      </b>${this.subject.value}<br />
                      <b>Message:</b> <br />
                      ${this.body.value} <br>
                      <br> <b>~End of Message.~</b> `,
    });
  }
}
