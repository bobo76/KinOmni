import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DataService } from 'src/app/_services/data-service.service';
import { AlertService } from 'src/app/_services/alert.service.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   loading = false;
//   submitted = false;
    username: string;
    password: string;
    returnUrl: string;
    error = '';
    loading = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: DataService,
      private alertService: AlertService
  ) { 
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
          //this.router.navigate(['/']);
      }
  }

  ngOnInit() {
    //   this.loginForm = this.formBuilder.group({
    //       username: ['', Validators.required],
    //       password: ['', Validators.required]
    //   });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
//   get f() { return this.loginForm.controls; }

  onSubmit() {
    //   this.submitted = true;

    //   // stop here if form is invalid
    //   if (this.loginForm.invalid) {
    //       return;
    //   }

    //   this.loading = true;
    this.loading = true;
    this.alertService.clear();
    this.authenticationService.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loading = false;
          const erMsg = error as HttpErrorResponse;
          this.alertService.error(erMsg.error.message);
        });
  }
}
