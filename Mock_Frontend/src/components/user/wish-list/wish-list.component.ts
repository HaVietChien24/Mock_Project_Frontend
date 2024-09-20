import { UserService } from './../../../service/user-service/user.service';
import { WishlistService } from './../../../service/wishlist-service/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addDays, addHours, isAfter, isBefore, parseISO } from 'date-fns';
import { Router } from '@angular/router';
import { BookService } from '../../../service/book-service/book.service';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private bookService: BookService,
    private toastr: ToastrService
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
      this.toastr.warning('Quantity must be > 0');
      this.isValidData = false;
      return;
    }
    this.isValidData = true;
    this.wishlistService.updateDetailsQuantity(detailsId, quantity).subscribe({
      next: (response) => {
        this.getData();
      },
      error: (error) => {
        this.toastr.error('Update quantity fail: ', error.message);
      },
    });
  }

  onSubmit() {
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);

    const pickUpDate: Date = parseISO(this.formData.pickUpDate);
    const returnDate: Date = parseISO(this.formData.returnDate);

    const isValidPickupDate: boolean =
      isAfter(pickUpDate, addDays(today, 2)) &&
      isBefore(pickUpDate, addDays(today, 6));
    if (!isValidPickupDate) {
      this.errorMessage =
        'Pick-up date must be at least 3 days and at most 5 days from today';
      this.toastr.warning(this.errorMessage);
      return;
    }

    const isValidReturnDate: boolean =
      isAfter(returnDate, addDays(pickUpDate, -1)) &&
      isBefore(returnDate, addDays(pickUpDate, 31));
    if (!isValidReturnDate) {
      this.errorMessage =
        'Return date must be a maximum of 30 days after the pickup date';
      this.toastr.warning(this.errorMessage);
      return;
    }

    if (this.wishlist.totalQuantity > 30) {
      this.errorMessage = 'The total number of books exceeds 30';
      this.toastr.warning(this.errorMessage);
      return;
    }
    this.errorMessage = '';
    this.wishlistService
      .sendRequest(
        this.userInfo.id,
        // +7hours vì thẻ input date ở frontend có timezone là GTM+7 còn bên backend có timezone là GTM
        addHours(pickUpDate, 7),
        addHours(returnDate, 7)
      )
      .subscribe({
        next: (response) => {
          this.toastr.success('Send Request Successfully');
          this.router.navigate(['/requests']);
        },
        error: (error) => {
          this.toastr.error('Some errors occured: ', error.message);
        },
      });
  }

  deleteDetail(detailsId: number) {
    this.wishlistService.deleteDetail(detailsId).subscribe({
      next: (response) => {
        this.toastr.success('Delete Success');
        this.getData();
      },
      error: (error) => {
        this.toastr.error('Delete Fail: ', error.message);
      },
    });
  }

  viewBookDetails(bookId: number) {
    this.bookService.viewBookDetails(bookId);
  }
}
