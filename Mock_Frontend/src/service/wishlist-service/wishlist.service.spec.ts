import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WishlistService } from './wishlist.service';
import { provideHttpClient } from '@angular/common/http';

describe('WishlistService', () => {
  const baseUrl: string = 'http://localhost:5110/api/WishList';
  let service: WishlistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WishlistService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(WishlistService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // test getByUserId()
  it('should fetch wishlist items', () => {
    const mockResponse: any = {
      id: 37,
      totalQuantity: 3,
      userId: 2,
      wishListDetails: [
        {
          bookId: 11,
          bookTitle: 'The Great Gatsby',
          id: 61,
          imageUrl:
            'https://simg.zalopay.com.vn/zlp-website/assets/sach_hay_nen_doc_nha_gia_kim_ea63da0d8f.jpeg',
          quantity: 1,
          wishListId: 37,
        },
        {
          bookId: 12,
          bookTitle: 'To Kill a Mockingbird',
          id: 62,
          imageUrl:
            'https://www.elle.vn/wp-content/uploads/2018/03/01/elle-viet-nma-sach-hay-1.jpg',
          quantity: 2,
          wishListId: 37,
        },
      ],
    };
    service.getByUserId(1).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/get-wish-list-by-user-id?id=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  // test addToWishlist()
  it('should add item to wishlist', () => {
    const mockResponse = 1;
    service.addToWishlist(1, 1).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/add-book-to-wish-list`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  // test updateDetailsQuantity()
  it('should update detail quantity', () => {
    const mockResponse = 1;
    service.updateDetailsQuantity(1, 5).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${baseUrl}/update-wishlist-detail-quantity`
    );
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  // test deleteDetail()
  it('should delete wishlist detail', () => {
    const mockResponse = 1;
    service.deleteDetail(1).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/delete-wishlist-detail/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});
