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
import { UserFullInfoDTO } from '../../../models/UserModels';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, ListGenreComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  bookList: any = [];
  genreList: any = [];
  title: string = 'All Books';
  message: string = 'Temporarily unavailable!';
  genreId: number = 0;
  userInfo!: UserFullInfoDTO;

  constructor(
    private bookService: BookService,
    private genreService: GenreService,
    private router: Router,
    private wishlistService: WishlistService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.bookService.getAll().subscribe({
      next: (response) => {
        this.bookList = response;
      },
      error: (error) => {
        this.bookList = [];
      },
    });
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

  getBooksByGenre(genre: any) {
    this.title = genre.name;
    this.genreId = genre.id;
    this.message = 'There are no books of this genre!';
    this.bookService.getByGenreId(genre.id).subscribe({
      next: (response) => {
        this.bookList = response;
      },
      error: (error) => {
        this.bookList = [];
      },
    });
  }

  onSearch(search: string) {
    this.title = 'Search Result';
    this.genreId = 0;
    this.message = 'No result found!';
    this.bookService.searchByTitleOrAuthor(search).subscribe({
      next: (response) => {
        this.bookList = response;
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
    this.wishlistService
      .addToWishlist(Number(this.userInfo.id), bookId)
      .subscribe({
        next: (response) => {
          this.toastr.success('Add Successfully');
        },
        error: (error) => {
          this.toastr.error('Add Fail: ', error.message);
        },
      });
  }
}
