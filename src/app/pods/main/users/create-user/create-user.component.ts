import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OLMUserModel } from '../../../../shared/models/user.model';
import { UserService } from '../../../../shared/services/user/user.service';
import { generateId } from '../../../../shared/helpers/generateId';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  @Output() hideComponent = new EventEmitter<boolean>();

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  handleCancel() {
    this.hideComponent.emit(false);
  }

  randomBarcode() {
    const newBarcode = this.userService.randomUserBarcode();
    this.userForm.get('barcode').setValue(newBarcode);
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profileImage: [''],
      phone: ['', Validators.required],
      address: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      username: [''],
      password: [''],
      barcode: [''],
      isActive: [false],
      role: this.fb.group({
        id: [null],
        name: [null]
      })
    });
  }

  onSubmit() {
    const user: OLMUserModel = {
      id: generateId(),
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      profileImage: this.userForm.value.profileImage,
      phone: this.userForm.value.phone,
      address: this.userForm.value.address,
      city: this.userForm.value.city,
      state: this.userForm.value.state,
      zipCode: this.userForm.value.zipCode,
      username: this.userForm.value.username,
      password: this.userForm.value.password,
      barcode: this.userForm.value.barcode,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: this.userForm.value.isActive,
      role: this.userForm.value.role
    };
    this.userService.addUser(user);
    this.handleCancel();
  }

}
