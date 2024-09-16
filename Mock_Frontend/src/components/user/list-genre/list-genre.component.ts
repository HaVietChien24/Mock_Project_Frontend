import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-genre',
  standalone: true,
  imports: [],
  templateUrl: './list-genre.component.html',
  styleUrl: './list-genre.component.css',
})
export class ListGenreComponent {
  @Input() genreList: any;
  @Output() selectGenre: EventEmitter<any> = new EventEmitter<any>();

  genreId: number = 0;
  onSelectGenre(genre: any) {
    this.genreId = genre.id;
    this.selectGenre.emit(genre);
  }
}
