import { GenreService } from './../../../service/genre-service/genre.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { ListGenreComponent } from '../list-genre/list-genre.component';
import { BookService } from '../../../service/book-service/book.service';
import { CommonModule } from '@angular/common';

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
  genreId: number = 0;

  constructor(
    private bookService: BookService,
    private genreService: GenreService,
    private router: Router
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
  }

  getBooksByGenre(genre: any) {
    this.title = genre.name;
    this.genreId = genre.id;
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
}
