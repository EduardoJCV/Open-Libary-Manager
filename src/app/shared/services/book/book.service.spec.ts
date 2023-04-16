import { TestBed } from '@angular/core/testing';
import { DatabaseService } from '../database/database.service';
import { BookService } from './book.service';
import { OLMBookModel } from '../../models/book.model';

describe('BookService', () => {
  let service: BookService;
  let databaseServiceSpy: jasmine.SpyObj<DatabaseService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DatabaseService', ['open']);

    TestBed.configureTestingModule({
      providers: [
        BookService,
        { provide: DatabaseService, useValue: spy }
      ]
    });

    service = TestBed.inject(BookService);
    databaseServiceSpy = TestBed.inject(DatabaseService) as jasmine.SpyObj<DatabaseService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
