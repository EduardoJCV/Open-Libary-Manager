import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private dbName = APP_CONFIG.database.name;
  private dbVersion = APP_CONFIG.database.version;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public db: IDBDatabase;

  constructor() {
    this.init();
  }

  public init(): void {
    const request = window.indexedDB.open(this.dbName, this.dbVersion);
    request.onerror = (event) => {
      console.error('Error opening database:', event);
    };
    request.onsuccess = (event) => {
      this.db = request.result;
      console.log('Database connection established');
    };
    request.onupgradeneeded = (event) => {
      //@ts-ignore
      const db = event.target.result;

      const objectStoreBooks = db.createObjectStore('books', { keyPath: 'id' });
      // Create an index on each property of the book model
      objectStoreBooks.createIndex('id', 'id', { unique: true });
      objectStoreBooks.createIndex('title', 'title', { unique: false });
      objectStoreBooks.createIndex('author', 'author', { unique: false });
      objectStoreBooks.createIndex('publisher', 'publisher', { unique: false });
      objectStoreBooks.createIndex('isbn', 'isbn', { unique: true });
      objectStoreBooks.createIndex('description', 'description', { unique: false });
      objectStoreBooks.createIndex('coverImage', 'coverImage', { unique: false });
      objectStoreBooks.createIndex('publishedDate', 'publishedDate', { unique: false });
      objectStoreBooks.createIndex('language', 'language', { unique: false });
      objectStoreBooks.createIndex('category', 'category', { unique: false });
      objectStoreBooks.createIndex('stock', 'stock', { unique: false });
      objectStoreBooks.createIndex('barcode', 'barcode', { unique: true });

      const objectStorageUsers = db.createObjectStore('users', { keyPath: 'id' });
      // Create an index on each property of the user model
      objectStorageUsers.createIndex('id', 'id', { unique: true });
      objectStorageUsers.createIndex('username', 'username', { unique: false });
      objectStorageUsers.createIndex('firstName', 'firstName', { unique: false });
      objectStorageUsers.createIndex('lastName', 'lastName', { unique: false });
      objectStorageUsers.createIndex('email', 'email', { unique: true });
      objectStorageUsers.createIndex('profileImage', 'profileImage', { unique: true });
      objectStorageUsers.createIndex('phone', 'phone', { unique: false });
      objectStorageUsers.createIndex('address', 'address', { unique: false });
      objectStorageUsers.createIndex('city', 'city', { unique: false });
      objectStorageUsers.createIndex('state', 'state', { unique: false });
      objectStorageUsers.createIndex('zipCode', 'zipCode', { unique: false });
      objectStorageUsers.createIndex('barcode', 'barcode', { unique: true });
      objectStorageUsers.createIndex('createdAt', 'createdAt', { unique: false });
      objectStorageUsers.createIndex('updatedAt', 'updatedAt', { unique: false });
      objectStorageUsers.createIndex('isActive', 'isActive', { unique: false });
      objectStorageUsers.createIndex('role', 'role', { unique: false });


      const objectStoreLoans = db.createObjectStore('loans', { keyPath: 'id' });
      // Create an index on each property of the loan model
      objectStoreLoans.createIndex('id', 'id', { unique: true });
      objectStoreLoans.createIndex('bookId', 'bookId', { unique: false });
      objectStoreLoans.createIndex('userId', 'userId', { unique: false });
      objectStoreLoans.createIndex('returnDate', 'returnDate', { unique: false });

      const objectStoreRoles = db.createObjectStore('roles', { keyPath: 'id' });
      // Create an index on each property of the loan model
      objectStoreRoles.createIndex('id', 'id', { unique: true });
      objectStoreRoles.createIndex('roleTitle', 'roleTitle', { unique: false });
      objectStoreRoles.createIndex('permissions', 'permissions', { unique: false });

      console.log('Database initialized');
    };
  }

}
