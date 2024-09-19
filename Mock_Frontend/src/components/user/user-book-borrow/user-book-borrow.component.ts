import { Component, OnInit } from '@angular/core';
import { AdminBookBorrowingDetailComponent } from "../../admin/admin-book-borrowing-detail/admin-book-borrowing-detail.component";
import { BorrowingService } from '../../../service/borrowing-service/borrowing.service';
import { UserService } from '../../../service/user-service/user.service';

@Component({
  selector: 'app-user-book-borrow',
  standalone: true,
  imports: [AdminBookBorrowingDetailComponent],
  templateUrl: './user-book-borrow.component.html',
  styleUrl: './user-book-borrow.component.css'
})
export class UserBookBorrowComponent implements OnInit {
  data: any = {}
  constructor(private service: BorrowingService, private userService: UserService) {

  }
  ngOnInit(): void {
    const userInfo = this.userService.loadUserFromStorage();
    console.log(userInfo.id);

    this.service.ViewListBookBorrowingUser(userInfo.id).subscribe((response) => {
      this.data = response.items;
    })

  }

}
