import { RouterLink, RouterOutlet } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchInput: string = '';
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Input() isShow!: boolean;
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.search.emit(this.searchInput);
    }
  }
}
