import { RequestService } from './../../../service/request-service/request.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../../../service/user-service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../../service/book-service/book.service';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css',
})
export class RequestsComponent implements OnInit {
  requestList: any;
  userInfo: any;

  constructor(
    private userService: UserService,
    private requestService: RequestService,
    private router: Router,
    private toastr: ToastrService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.userService.loadUserFromStorage();
    this.getData();
  }

  getData(): void {
    if (this.userInfo) {
      this.requestService.getAllByUserId(this.userInfo.id).subscribe({
        next: (response) => {
          this.requestList = response;
          console.log(this.requestList);
        },
        error: (error) => {
          this.requestList = [];
        },
      });
    }
  }

  cancelRequest(requestId: number): any {
    this.requestService.cancelRequest(requestId).subscribe({
      next: (response) => {
        this.toastr.success('Cancel Request Successfully');
        this.getData();
      },
      error: (error) => {
        this.toastr.error('Cancel Request Fail: ', error.message);
      },
    });
  }

  viewBookDetails(bookId: number) {
    this.bookService.viewBookDetails(bookId);
  }
}
