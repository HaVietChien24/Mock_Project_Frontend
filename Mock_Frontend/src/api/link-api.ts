export class ApiLink {

  public GetAllBookBorrow: string = "http://localhost:5110/api/Borrowing/GetAllBorrowing";
  public GetBookBorrowingDetail: string = "http://localhost:5110/api/Borrowing/GetBorrowingDetail"
  public UpdateBookReturned: string = "http://localhost:5110/api/Borrowing/UpdateReturnedBook"
  public ConfirmPickedUp: string = "http://localhost:5110/api/Borrowing/ConfirmPickedUp"

  base: string = 'http://localhost:5110/api';
  getAllBooks: string = `${this.base}/Book/get-all-books`;
  getAllGenres: string = `${this.base}/Genre/get-all-genres`;
  getBooksByGenreId: string = `${this.base}/Book/get-by-genre-id`;
  searchByTitleOrAuthor: string = `${this.base}/Book/search-by-title-or-author`;
  getWishlistByUserId: string = `${this.base}/WishList/get-wish-list-by-user-id`;
  addBookToWishlist: string = `${this.base}/WishList/add-book-to-wish-list`;
  getAllRequestsByUserId: string = `${this.base}/Request/get-all-by-user-id`;
  addBook: string = `${this.base}/Book/add-book`;
  updateBook: string = `${this.base}/Book/update-book`;
  cancelRequest: string = `${this.base}/Request/cancel-request`;
  updateWishlistDetailQuantity: string = `${this.base}/WishList/update-wishlist-detail-quantity`;
  sendRequest: string = `${this.base}/Request/send-request`;
}
