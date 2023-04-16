import { Component } from '@angular/core';
import { OLMBookModel } from '../../../shared/models/book.model';
import { BookService } from '../../../shared/services/book/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {

  public newBookOpen = false;

  public data = {
    headers: ['ID', 'TITLE', 'AUTHOR', 'ISBN', 'STOCK', 'BARCODE'],
    data: []
  };

  private allBooks: OLMBookModel[];

  constructor(private bookService: BookService) {
    setTimeout(async () => {
      this.allBooks = await bookService.getAllBooks();
      this.data.data = this.allBooks.map((book: OLMBookModel) => [
        {
          type: 'text',
          text: book.id,
        },
        {
          type: 'text',
          text: book.title,
        },
        {
          type: 'text',
          text: book.author,
        },
        {
          type: 'text',
          text: book.isbn,
        },
        {
          type: 'text',
          text: book.stock,
        },
        {
          type: 'text',
          text: book.barcode,
        },
      ]);
    }, 0);
  }

  onCancelCreateBook(event: boolean) {
    this.newBookOpen = event;
  }

}
