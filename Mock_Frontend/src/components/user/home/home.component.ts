import { GenreService } from './../../../service/genre-service/genre.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListGenreComponent } from '../list-genre/list-genre.component';
import { BookService } from '../../../service/book-service/book.service';
import { error, log } from 'console';
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

  constructor(
    private bookService: BookService,
    private genreService: GenreService
  ) {}

  ngOnInit(): void {
    this.bookService.getAll().subscribe({
      next: (response) => {
        this.bookList = response;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });

    this.genreService.getAll().subscribe({
      next: (response) => {
        this.genreList = response;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  }
}
