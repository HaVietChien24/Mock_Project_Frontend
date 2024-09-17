import { UserService } from './../../../service/user-service/user.service';
import { WishlistService } from './../../../service/wishlist-service/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
})
export class WishListComponent implements OnInit {
  wishlist: any;
  userInfo: any;
  currentDate: number = Date.now();

  constructor(
    private wishlistService: WishlistService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.userService.loadUserFromStorage();
    if (this.userInfo) {
      this.wishlistService.getByUserId(this.userInfo.id).subscribe({
        next: (response) => {
          this.wishlist = response;
        },
        error: (error) => {},
      });
    }
  }
}
