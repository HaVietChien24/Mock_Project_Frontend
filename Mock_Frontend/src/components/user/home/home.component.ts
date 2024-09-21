import { WishlistService } from './../../../service/wishlist-service/wishlist.service';
import { UserService } from './../../../service/user-service/user.service';
import { GenreService } from './../../../service/genre-service/genre.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { ListGenreComponent } from '../list-genre/list-genre.component';
import { BookService } from '../../../service/book-service/book.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    ListGenreComponent,
    CommonModule,
    MatPaginatorModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  bookList: any = [];
  genreList: any = [];
  title: string = 'All Books';
  message: string = 'Temporarily unavailable!';
  genreId: number = 0;
  userInfo: any;
  action: string = 'all'; // all/filter-genre/search
  currentGenre: any;
  currentSearch: string = '';
  totalItems: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;

  constructor(
    private bookService: BookService,
    private genreService: GenreService,
    private router: Router,
    private wishlistService: WishlistService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.resetPageIndex();
    this.getAllBooksPaging();
    this.genreService.getAll().subscribe({
      next: (response) => {
        this.genreList = response;
      },
      error: (error) => {
        this.genreList = [];
      },
    });
    this.userInfo = this.userService.loadUserFromStorage();
  }

  getAllBooks() {
    this.action = 'all';
    this.resetPageIndex();
    this.title = 'All Books';
    this.genreId = 0;
    this.message = 'Temporarily unavailable!';
    this.getAllBooksPaging();
  }

  getAllBooksPaging() {
    this.bookService.getAll(this.pageIndex + 1, this.pageSize).subscribe({
      next: (response) => {
        console.log(response);
        this.totalItems = response.totalCount;
        this.bookList = response.items;
      },
      error: (error) => {
        this.bookList = [];
      },
    });
  }

  getBooksByGenre(genre: any) {
    this.action = 'filter-genre';
    this.resetPageIndex();
    this.title = genre.name;
    this.genreId = genre.id;
    this.message = 'There are no books of this genre!';
    this.getBookByGenrePaging();
  }

  getBookByGenrePaging() {
    this.bookService
      .getByGenreId(this.genreId, this.pageIndex + 1, this.pageSize)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.totalItems = response.totalCount;
          this.bookList = response.items;
        },
        error: (error) => {
          this.bookList = [];
        },
      });
  }

  onSearch(search: string) {
    this.action = 'search';
    this.resetPageIndex();
    this.currentSearch = search;
    this.title = `Search Results For: "${search}"`;
    this.genreId = 0;
    this.message = 'No result found!';
    this.getBookSearchPaging();
  }

  getBookSearchPaging() {
    this.bookService
      .searchByTitleOrAuthor(
        this.currentSearch,
        this.pageIndex + 1,
        this.pageSize
      )
      .subscribe({
        next: (response) => {
          this.totalItems = response.totalCount;
          this.bookList = response.items;
        },
        error: (error) => {
          this.bookList = [];
        },
      });
  }

  bookDetails(book: any) {
    this.router.navigate(['/book-details'], { queryParams: book });
  }

  addToWishlist(bookId: number) {
    this.wishlistService.addToWishlist(this.userInfo.id, bookId).subscribe({
      next: (response) => {
        this.toastr.success('Add Successfully');
      },
      error: (error) => {
        this.toastr.error('Add Fail: ', error.message);
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    switch (this.action) {
      case 'all':
        this.getAllBooksPaging();
        break;
      case 'filter-genre':
        this.getBookByGenrePaging();
        break;
      case 'search':
        this.getBookSearchPaging();
        break;
    }
  }

  resetPageIndex() {
    this.pageIndex = 0;
    // this.pageSize = 5;
  }
}
