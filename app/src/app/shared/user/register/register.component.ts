import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../user.service';
import { IApiResponse } from '../../models/api-response.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hide:boolean;
  
  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullusername: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['', Validators.required],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+[0-9]+[0-9]+[0-9]+[0-9]')
      ])],
      city: ['', Validators.required],
    })
  }

  submitUser() {
    this.userService.postUser(this.registerForm.value).subscribe({
      next: (response: IApiResponse) => {
        let msg;
        
        if(response.status==='failed'){
          msg = response.message+'\n'+response.payload.errors.email.message;
        }
        else{
          msg= response.message;
        }

        this.snackBar.open(msg, "Close");

        this.route.url.subscribe(value=>{
          let back_path=value[0].path;
          switch (back_path) {
            case 'register':
              this.router.navigate(['home']);
              break;
            case 'adduser':
                this.router.navigate(['back/users']);
              break
            default:
              this.snackBar.open('Wrong :( 404 Not Found', 'Close');
                this.router.navigate(['front/home']);
          }
        });
      },
      error: (error) => {
        this.snackBar.open(error, "Close");
      },
      complete: () => console.log('User Registrtation completed successfully')
    });
  }

}
