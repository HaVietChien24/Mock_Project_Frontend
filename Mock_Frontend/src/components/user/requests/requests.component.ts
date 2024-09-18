import { RequestService } from './../../../service/request-service/request.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../../../service/user-service/user.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userInfo = this.userService.loadUserFromStorage();
    this.getData();
  }

  getData(): void {
    this.requestService.getAllByUserId(this.userInfo.id).subscribe({
      next: (response) => {
        this.requestList = response;
        console.log(this.requestList);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  cancelRequest(requestId: number): any {
    this.requestService.cancelRequest(requestId).subscribe({
      next: (response) => {
        alert('Cancel Request Succesfully');
        // reload trang
      },
      error: (error) => {
        alert('Cancel Request Fail');
      },
    });
  }
}
