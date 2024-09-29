import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { ApiLink } from '../../api/link-api';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;
  let toastrService: ToastrService;
  let router: Router;

  beforeEach(() => {
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BookService,
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
    toastrService = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAll and return a list of books', () => {
    const dummyBooks = [{ id: 1, title: 'Test Book 1' }, { id: 2, title: 'Test Book 2' }];

    service.getAll().subscribe(books => {
      expect(books.length).toBe(2);
      expect(books).toEqual(dummyBooks);
    });

    const req = httpMock.expectOne(service.linkApi.getAllBooks);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBooks);
  });

  it('should call getByGenreId and return a list of books', () => {
    const dummyBooks = [{ id: 1, title: 'Test Book 1', genreId: 1 }];

    service.getByGenreId(1).subscribe(books => {
      expect(books.length).toBe(1);
      expect(books).toEqual(dummyBooks);
    });

    const req = httpMock.expectOne(`${service.linkApi.getBooksByGenreId}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBooks);
  });

  it('should call searchByTitleOrAuthor and return a filtered list of books', () => {
    const searchQuery = 'Test';
    const dummyBooks = [{ id: 1, title: 'Test Book 1' }];

    service.searchByTitleOrAuthor(searchQuery).subscribe(books => {
      expect(books.length).toBe(1);
      expect(books).toEqual(dummyBooks);
    });

    const req = httpMock.expectOne(req => req.url === service.linkApi.searchByTitleOrAuthor && req.params.get('search') === searchQuery);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBooks);
  });

  it('should call addBook and return the added book', () => {
    const newBook = { id: 1, title: 'New Book' };

    service.addBook(newBook).subscribe(book => {
      expect(book).toEqual(newBook);
    });

    const req = httpMock.expectOne(service.linkApi.addBook);
    expect(req.request.method).toBe('POST');
    req.flush(newBook);
  });

  it('should call updateBook and return the updated book', () => {
    const updatedBook = { id: 1, title: 'Updated Book' };

    service.updateBook(updatedBook).subscribe(book => {
      expect(book).toEqual(updatedBook);
    });

    const req = httpMock.expectOne(service.linkApi.updateBook);
    expect(req.request.method).toBe('POST');
    req.flush(updatedBook);
  });

  it('should call getById and return the book details', () => {
    const dummyBook = { id: 1, title: 'Test Book' };

    service.getById(1).subscribe(book => {
      expect(book).toEqual(dummyBook);
    });

    const req = httpMock.expectOne(`${service.linkApi.getBookById}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBook);
  });

  it('should navigate to book details page and pass book as queryParams', () => {
    const dummyBook = { id: 1, title: 'Test Book' };

    service.viewBookDetails(1);

    const req = httpMock.expectOne(`${service.linkApi.getBookById}/1`);
    req.flush(dummyBook);

    expect(router.navigate).toHaveBeenCalledWith(['/book-details'], { queryParams: dummyBook });
  });

  it('should show error toast if viewBookDetails fails', () => {
    service.viewBookDetails(1);

    const req = httpMock.expectOne(`${service.linkApi.getBookById}/1`);
    req.error(new ErrorEvent('network error'));

    expect(toastrService.error).toHaveBeenCalledWith('Some errors occured: ', 'network error');
  });
});
