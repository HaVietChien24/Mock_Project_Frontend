import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from './../header/header.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../../service/wishlist-service/wishlist.service';
import { UserService } from '../../../service/user-service/user.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent {
  data: any = null;
  userInfo: any;

  constructor(
    private route: ActivatedRoute,
    private wishlistService: WishlistService,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.data = params;
    });

    this.userInfo = this.userService.loadUserFromStorage();
  }

  addToWishlist(bookId: number) {
    this.wishlistService.addToWishlist(this.userInfo.id, bookId).subscribe({
      next: (response) => {
        alert('Add Succesfully');
        this.router.navigate(['/wish-list']);
      },
      error: (error) => {
        alert('Add Fail');
      },
    });
  }
}
