import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { BorrowingService } from './borrowing.service';
import { ApiLink } from '../../api/link-api';

describe('BorrowingService', () => {
  let service: BorrowingService;
  let httpMock: HttpTestingController;
  let apiLink: ApiLink;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BorrowingService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(BorrowingService);
    httpMock = TestBed.inject(HttpTestingController);
    apiLink = new ApiLink();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all book borrowings for admin with pagination', () => {
    const mockResponse = { items: [], totalCount: 0 };
    const userName = 'testUser';
    const page = 1;
    const pageSize = 10;
    const url = `${apiLink.GetAllBookBorrow}?page=${page}&pageSize=${pageSize}&userName=${encodeURIComponent(userName)}`;

    service.GetAllBookBorrowAdmin(userName, page, pageSize).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should retrieve borrowing details by borrowingId', () => {
    const mockResponse = { id: 1, details: [] };
    const borrowingId = 1;
    const url = `${apiLink.GetBookBorrowingDetail}?borrowingId=${borrowingId}`;

    service.GetBookBorrowingDetail(borrowingId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should update the number of books returned', () => {
    const mockResponse = { success: true };
    const borrowingDetailId = 1;
    const returnedBooks = 2;
    const url = apiLink.UpdateBookReturned;
    const body = { borrowingDetailId, numberBookReturned: returnedBooks };

    service.UpdateBookReturned(borrowingDetailId, returnedBooks).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(body);
    req.flush(mockResponse);
  });

  it('should confirm book picked up by borrowingId', () => {
    const mockResponse = { success: true };
    const borrowingId = 1;
    const url = `${apiLink.ConfirmPickedUp}?borrowingId=${borrowingId}`;

    service.ConfirmPickedUp(borrowingId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should retrieve the list of books borrowed by a user', () => {
    const mockResponse = { books: [] };
    const userId = 1;
    const url = `${apiLink.ViewListBookBorrowingUser}?userId=${userId}`;

    service.ViewListBookBorrowingUser(userId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
