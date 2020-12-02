import { Component, OnInit } from '@angular/core';
import { IUser } from '../../models/user.model';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { IApiResponse } from '../../models/api-response.model';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.scss']
})
export class AdminUserEditComponent implements OnInit {
  userToEdit: IUser;
  subscription: Subscription;
  userForm;

  constructor(private fb: FormBuilder,
    private usersService: UserService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router) {
    this.userForm = this.fb.group(
      {
        fullusername: [""],
        phone: [""],
        city: [""],
        role: [""],
        isGranted: [""],
        customer:[""]
      });
  }

  ngOnInit() {
    this.subscription = this.usersService.getUserById(this.route.snapshot.paramMap.get('id')).subscribe(
      (data: IApiResponse) => {
        this.userToEdit = data.payload;
        this.intialiseCurrentUserInfo();
      });  
  }

  refresh(event) {
    console.log(event)
  }

  updateUserInfoAPI() {
    this.usersService.updateUser(this.userToEdit._id, this.userForm.value).subscribe({
      next: (response: IApiResponse) => {
        this.snackBar.open(response.message, 'Close');
      },
      error: (error) => this.snackBar.open(error.message, 'Close'),
      complete: () => null
    });
    this.userForm.reset();
    this.router.navigate(['back/users']);
  }

  intialiseCurrentUserInfo() {
    this.userForm.controls['fullusername'].setValue(this.userToEdit.fullusername),
    this.userForm.controls['phone'].setValue(this.userToEdit.phone),
    this.userForm.controls['city'].setValue( this.userToEdit.city),
    this.userForm.controls['role'].setValue(this.userToEdit.role),
    this.userForm.controls['isGranted'].setValue(this.userToEdit.isGranted),
    this.userForm.controls['customer'].setValue(this.userToEdit.customer)
  }

  
  isGrantedChange(event){
    this.userForm.controls['isGranted'].setValue(event.checked);
  }

  assignCustomerToUser(event){
    this.userForm.controls['customer'].setValue(event._id);
  }
}
