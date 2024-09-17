export class ApiLink {

  public GetAllBookBorrow: string = "http://localhost:5110/api/Borrowing/GetAllBorrowing";
  public GetBookBorrowingDetail: string = "http://localhost:5110/api/Borrowing/GetBorrowingDetail"
  public UpdateBookReturned: string = "http://localhost:5110/api/Borrowing/UpdateReturnedBook"
  
  base: string = 'http://localhost:5110/api';
  getAllBooks: string = `${this.base}/Book/get-all-books`;
  getAllGenres: string = `${this.base}/Genre/get-all-genres`;
  getBooksByGenreId: string = `${this.base}/Book/get-by-genre-id`;
  searchByTitleOrAuthor: string = `${this.base}/Book/search-by-title-or-author`;
}

