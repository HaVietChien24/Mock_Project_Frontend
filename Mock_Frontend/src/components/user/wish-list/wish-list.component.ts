import { UserService } from './../../../service/user-service/user.service';
import { WishlistService } from './../../../service/wishlist-service/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  isValidData: boolean = true;

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

  updateQuantiy(event: Event) {
    const input = event.target as HTMLInputElement;
    const detailsId: number = +input.id;
    const quantity: number = +input.value;
    if (quantity <= 0) {
      alert('Quantity must be > 0');
      this.isValidData = false;
      return;
    }
    this.isValidData = true;
    this.wishlistService.updateDetailsQuantity(detailsId, quantity).subscribe({
      next: (response) => {},
      error: (error) => {
        alert('Some errors occured');
      },
    });
  }
}
