export class ApiLink {
  base: string = 'http://localhost:5110/api';
  getAllBooks: string = `${this.base}/Book/get-all-books`;
  getAllGenres: string = `${this.base}/Genre/get-all-genres`;
  getBooksByGenreId: string = `${this.base}/Book/get-by-genre-id`;
  searchByTitleOrAuthor: string = `${this.base}/Book/search-by-title-or-author`;
  addBook: string = `${this.base}/Book/add-book`;
  updateBook: string = `${this.base}/Book/update-book`;
}
