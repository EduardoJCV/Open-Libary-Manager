import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OLMBookModel } from '../../../../shared/models/book.model';
import { BookService } from '../../../../shared/services/book/book.service';
import { generateId } from '../../../../shared/helpers/generateId';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  @Output() hideComponent = new EventEmitter<boolean>();

  bookForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private bookService: BookService) { }

  handleCancel() {
    this.hideComponent.emit(false);
  }

  randomBarcode() {
    const newBarcode = this.bookService.randomBookBarcode();
    this.bookForm.get('barcode').setValue(newBarcode);
  }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publisher: [''],
      isbn: ['', Validators.required],
      description: [''],
      coverImage: [''],
      publishedDate: [''],
      language: ['', Validators.required],
      category: [''],
      stock: [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(10000)
      ]],
      barcode: ['']
    });
  }

  onSubmit() {
    console.log('submit');
    const book: OLMBookModel = {
      id: generateId(),
      title: this.bookForm.value.title,
      author: this.bookForm.value.author,
      publisher: this.bookForm.value.publisher,
      isbn: this.bookForm.value.isbn,
      description: this.bookForm.value.description,
      coverImage: this.bookForm.value.coverImage,
      publishedDate: this.bookForm.value.publishedDate,
      language: this.bookForm.value.language,
      category: this.bookForm.value.category,
      stock: this.bookForm.value.stock,
      barcode: this.bookForm.value.barcode,
    };
    this.bookService.addBook(book);
    this.handleCancel();
  }
}
