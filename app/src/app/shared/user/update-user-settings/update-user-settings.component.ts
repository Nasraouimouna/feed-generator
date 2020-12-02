import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { IUser } from '../../models/user.model';
import { IApiResponse } from '../../models/api-response.model';

@Component({
  selector: 'app-update-user-settings',
  templateUrl: './update-user-settings.component.html',
  styleUrls: ['./update-user-settings.component.scss']
})
export class UpdateUserSettingsComponent implements OnInit {
  currentUser: IUser
  userForm;

  constructor(private fb: FormBuilder,
    private usersService: UserService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router, ) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.userForm = this.fb.group(
      {
        fullusername: this.currentUser.fullusername,
        email: this.currentUser.email,
        phone: this.currentUser.phone,
        city: this.currentUser.city,
      });

  }

  ngOnInit() {

  }

  refresh(event) {
    console.log(event)
  }

  updateUserInfoAPI() {
    let _tmpUser={...this.userForm.value};
    delete _tmpUser['email'];
    _tmpUser.new_email=this.userForm.value.email;
    this.usersService.updateUser(this.currentUser._id,_tmpUser).subscribe({
      next: (response: IApiResponse) => {
        this.snackBar.open(response.message, 'Close');
      },
      error: (error) => this.snackBar.open(error.message, 'Close'),
      complete: () => {
        this.usersService.getUserById(this.currentUser._id).subscribe(
          {
            next: (response: IApiResponse) => {
              localStorage.setItem('currentUser', JSON.stringify(response.payload));
            },
            error: (error) => this.snackBar.open(error.message, 'Close'),
            complete: () => console.log
          }
        );    
      }
    });
    this.userForm.reset();
    this.router.navigate(['front/home']);
  }

}
