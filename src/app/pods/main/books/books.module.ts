import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import { BooksRoutingModule } from './books-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { CreateBookComponent } from './create-book/create-book.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BooksComponent,
    CreateBookComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    BooksRoutingModule
  ]
})
export class BooksModule { }
