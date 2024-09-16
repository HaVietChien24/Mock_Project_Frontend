import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-genre',
  standalone: true,
  imports: [],
  templateUrl: './list-genre.component.html',
  styleUrl: './list-genre.component.css',
})
export class ListGenreComponent {
  @Input() genreList: any;
}
