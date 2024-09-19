import { UserService } from './../../../service/user-service/user.service';
import { WishlistService } from './../../../service/wishlist-service/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addDays, addHours, isAfter, isBefore, parseISO } from 'date-fns';
import { Router } from '@angular/router';

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
  isValidData: boolean = true;
  formData = {
    pickUpDate: '',
    returnDate: '',
  };
  errorMessage: string = '';

  constructor(
    private wishlistService: WishlistService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userInfo = this.userService.loadUserFromStorage();
    this.getData();
  }

  getData() {
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
      next: (response) => {
        this.getData();
      },
      error: (error) => {
        alert('Some errors occured');
      },
    });
  }

  onSubmit() {
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);

    // +7hours vì thẻ input date ở frontend có timezone là GTM+7 còn bên backend có timezone là GTM
    const pickUpDate: Date = addHours(parseISO(this.formData.pickUpDate), 7);
    const returnDate: Date = addHours(parseISO(this.formData.returnDate), 7);

    const isValidPickupDate: boolean =
      isAfter(pickUpDate, addDays(today, 2)) &&
      isBefore(pickUpDate, addDays(today, 6));
    if (!isValidPickupDate) {
      this.errorMessage = 'Invalid pick-up date!';
      alert(this.errorMessage);
      return;
    }

    const isValidReturnDate: boolean =
      isAfter(returnDate, addDays(pickUpDate, -1)) &&
      isBefore(returnDate, addDays(pickUpDate, 31));
    if (!isValidReturnDate) {
      this.errorMessage = 'Invalid return date!';
      alert(this.errorMessage);
      return;
    }

    if (this.wishlist.totalQuantity > 30) {
      this.errorMessage = 'The total number of books exceeds 30';
      alert(this.errorMessage);
      return;
    }
    this.errorMessage = '';
    this.wishlistService
      .sendRequest(this.userInfo.id, pickUpDate, returnDate)
      .subscribe({
        next: (response) => {
          alert('Send Reuqest Successfully');
          this.router.navigate(['/requests']);
        },
        error: (error) => {
          alert('Some errors occured');
        },
      });
  }
}
