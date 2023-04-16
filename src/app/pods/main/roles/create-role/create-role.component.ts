import { Component, OnInit } from '@angular/core';
import { OLMUserRoleModel } from '../../../../shared/models/role.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {
  roleForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.roleForm = this.fb.group({
      roleTitle: ['', Validators.required],
      permissions: this.fb.group({
        //books
        addBooks: [false],
        removeBooks: [false],
        editBooks: [false],
        borrowBooks: [false],
        returnBooks: [false],
        approveBookRequests: [false],
        manageLibraryInventory: [false],

        //users
        addUsers: [false],
        removeUser: [false],
        editUser: [false],
        viewUserRecords: [false],
        manageUserRoles: [false],
        manageUserAccounts: [false],

        //general
        manageLibrarySettings: [false],
        generateReports: [false],
        owner: [false]
      })
    });
  }

  onSubmit() {
    const newRole: OLMUserRoleModel = {
      id: null, // assuming this will be assigned by the backend
      roleTitle: this.roleForm.value.roleTitle,
      permissions: this.roleForm.value.permissions
    };

    // now you can send the newRole object to your backend API to create a new user role
  }
}
