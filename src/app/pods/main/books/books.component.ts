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
  public loadingData = true;

  public data = {
    headers: ['ID', 'TITLE', 'AUTHOR', 'ISBN', 'STOCK', 'BARCODE'],
    data: []
  };

  private allBooks: OLMBookModel[];

  constructor(private bookService: BookService) {
    this.loadingData = true;
    setTimeout(async () => {
      this.allBooks = await bookService.getAllBooks();
      await this.defineAllBooks();
      this.loadingData = false;
    }, 0);
  }

  public onCancelCreateBook(event: boolean) {
    this.newBookOpen = event;
    this.updateAllBooks();
  }

  public onSearchBook(input: string) {
    this.loadingData = true;
    setTimeout(async () => {
      this.allBooks = await this.bookService.filterBooks(input);
      await this.defineAllBooks();
      this.loadingData = false;
    }, 0);
  }

  private updateAllBooks() {
    this.loadingData = true;
    setTimeout(async () => {
      this.allBooks = await this.bookService.getAllBooks();
      this.loadingData = false;
    }, 1000);
  }

  private defineAllBooks() {
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
  }

}
