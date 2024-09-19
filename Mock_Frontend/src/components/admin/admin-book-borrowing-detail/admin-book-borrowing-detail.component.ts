import { Component, type OnInit } from '@angular/core';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { BorrowingService } from '../../../service/borrowing-service/borrowing.service';
import { CustomDatePipe } from '../../../pipes/customdate.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-book-borrowing-detail',
  standalone: true,
  imports: [AdminSideBarComponent, CustomDatePipe, CommonModule, FormsModule],
  templateUrl: './admin-book-borrowing-detail.component.html',
  styleUrl: './admin-book-borrowing-detail.component.css',
})
export class AdminBookBorrowingDetailComponent implements OnInit {
  selectedItem: any;
  borrowingId: number | null = null;
  data: any;
  numberReturnedBook: any;
  errorMessage: string = ''; // Biến để lưu trữ thông báo lỗi

  constructor(
    private router: ActivatedRoute,
    private service: BorrowingService
  ) {}

  openModal(item: any) {
    this.selectedItem = { ...item }; // Tạo bản sao để tránh thay đổi trực tiếp
  }

  ngOnInit() {
    this.router.paramMap.subscribe((param) => {
      const borrowingId = Number(param.get('borrowingId'));
      if (borrowingId) {
        this.service
          .GetBookBorrowingDetail(borrowingId)
          .subscribe((response) => {
            this.data = response.items;
            console.log(this.data);
          });
        console.log('Borrowing ID:', borrowingId);
      }
    });
  }

  updateReturnedBooks(id: number) {
    console.log('Number of books returned:', this.numberReturnedBook);

    this.service.UpdateBookReturned(id, this.numberReturnedBook).subscribe(
      (response) => {
        console.log('Update successful:', response);
        window.location.reload();
      },
      (error) => {
        console.error('Cập nhật lỗi:', error.error.message);
        this.errorMessage = error.error.message;
      }
    );
  }
}
