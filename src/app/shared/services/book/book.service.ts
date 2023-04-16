import { Injectable } from '@angular/core';
import { OLMBookModel } from '../../models/book.model';
import { DatabaseService } from '../database/database.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private database: DatabaseService) {}

  public addBook(book: OLMBookModel): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['books'], 'readwrite');
      const objectStore = transaction.objectStore('books');

      const request = objectStore.add({
        id: book.id,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        isbn: book.isbn,
        description: book.description,
        coverImage: book.coverImage,
        publishedDate: book.publishedDate,
        language: book.language,
        category: book.category,
        stock: book.stock,
        barcode: book.barcode
      });

      request.onsuccess = (event) => {
        console.log('Book added to database');
        resolve(() => {
          console.log('success');
        });
      };

      request.onerror = (event) => {
        console.error('Error adding book to database:', event);
        reject(() => {
          console.log('error');
        });
      };
    });
  }

  public updateBook(book: OLMBookModel): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['books'], 'readwrite');
      const objectStore = transaction.objectStore('books');
      const request = objectStore.put(book);

      request.onsuccess = (event) => {
        console.log('Book updated in database');
        resolve(() => {
          console.log('success');
        });
      };

      request.onerror = (event) => {
        console.error('Error updating book in database:', event);
        reject(() => {
          console.log('error');
        });
      };
    });
  }

  public deleteBook(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['books'], 'readwrite');
      const objectStore = transaction.objectStore('books');

      const request = objectStore.delete(id);

      request.onsuccess = (event) => {
        console.log('Book deleted from database');
        resolve(() => {
          console.log('success');
        });
      };

      request.onerror = (event) => {
        console.error('Error deleting book from database:', event);
        reject(() => {
          console.log('error');
        });
      };
    });
  }

  public getBookById(id: number): Promise<OLMBookModel> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['books'], 'readonly');
      const objectStore = transaction.objectStore('books');
      const request = objectStore.get(id);

      request.onsuccess = (event) => {
        const book = request.result;
        if (book) {
          resolve(book);
        } else {
          reject(new Error(`No book found with id ${id}`));
        }
      };

      request.onerror = (event) => {
        console.error(`Error retrieving book with id ${id}:`, event);
        reject(event);
      };
    });
  }

  public getAllBooks(): Promise<OLMBookModel[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['books'], 'readonly');
      const objectStore = transaction.objectStore('books');
      const request = objectStore.getAll();

      request.onsuccess = (event) => {
        //@ts-ignore
        const books = event.target.result;
        resolve(books);
      };

      request.onerror = (event) => {
        console.error('Error getting books from database:', event);
        reject(() => {
          console.log('error');
        });
      };
    });
  }

  public filterBooks(filterString: string): Promise<OLMBookModel[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['books'], 'readonly');
      const objectStore = transaction.objectStore('books');
      const request = objectStore.getAll();

      request.onsuccess = (event) => {
        //@ts-ignore
        const books = event.target.result.filter((book: OLMBookModel) =>
          book.title.toLowerCase().includes(filterString.toLowerCase()) ||
          book.author.toLowerCase().includes(filterString.toLowerCase()) ||
          book.publisher.toLowerCase().includes(filterString.toLowerCase()) ||
          book.category.toLowerCase().includes(filterString.toLowerCase())
        );
        console.log('Books filtered from database:', books);
        resolve(books);
      };

      request.onerror = (event) => {
        console.error('Error filtering books from database:', event);
        reject(() => {
          console.log('error');
        });
      };
    });
  }

  public randomBookBarcode(): string {
    let barcode = 'B-';
    const characters = '0123456789';
    for (let i = 0; i < 13; i++) {
      barcode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return barcode;
  }

}
