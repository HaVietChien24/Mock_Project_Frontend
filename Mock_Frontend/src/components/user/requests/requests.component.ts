import { RequestService } from './../../../service/request-service/request.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../../../service/user-service/user.service';

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
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.userService.loadUserFromStorage();

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
}
