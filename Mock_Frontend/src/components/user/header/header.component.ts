import { RouterLink } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../service/user-service/user.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  searchInput: string = '';
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Input() isShow!: boolean;
  userInfo: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userInfo = this.userService.loadUserFromStorage();
    console.log(this.userInfo);
  }

  logout() {
    this.userService.logout();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.search.emit(this.searchInput);
    }
  }
}
