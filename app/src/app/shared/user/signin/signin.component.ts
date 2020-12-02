import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  hide:boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar:MatSnackBar,
    private authenticationService: AuthenticationService
  ) { 
     // redirect to home if already logged in
     if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/front/home']);
     }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/front/home';
  }

  onSubmit() {
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          this.snackBar.open("Logged in Successufully",'Close')
        },
        error => {
          this.snackBar.open("Failed to login",'Close')
        });
  }

  getErrorMessage(){
    return 'invalid email, try again'
  }

}


