import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DataService } from 'src/app/_services/data-service.service';
import { AlertService } from 'src/app/_services/alert.service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  returnUrl: string;
  error = '';
  loading = false;

  constructor(
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
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.loading = true;
    this.alertService.clear();
    this.authenticationService.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        _ => {
          this.loading = false;
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loading = false;
          const erMsg = error as HttpErrorResponse;
          this.alertService.httpError(erMsg);
        });
  }
  logout() {
    this.alertService.clear();
    this.authenticationService.logout();
  }

  isLoged(): boolean {
    return !this.authenticationService.currentUserValue;
  }
}
