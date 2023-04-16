import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateRoleComponent } from './create-role/create-role.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RolesComponent,
    CreateRoleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
