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
  @Input() genreId!: number;

  onSelectGenre(genre: any) {
    this.selectGenre.emit(genre);
  }
}
