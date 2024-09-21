import { Component, OnInit } from '@angular/core';
import { AdminSideBarComponent } from "../admin-side-bar/admin-side-bar.component";
import { CommonModule } from '@angular/common';
import { UserService } from '../../../service/user-service/user.service';
import { RequestService } from '../../../service/request-service/request.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-manage-request',
  standalone: true,
  imports: [AdminSideBarComponent, CommonModule],
  templateUrl: './admin-manage-request.component.html',
  styleUrl: './admin-manage-request.component.css'
})
export class AdminManageRequestComponent implements OnInit {

  requestList: any;
  userInfo: any;

  constructor(
    private userService: UserService,
    private requestService: RequestService,
  ) { }
  ngOnInit(): void {
    this.userInfo = this.userService.loadUserFromStorage();
    this.getallData();
  }

  getallData(): void {
    if (this.userInfo) {
      this.requestService.getAllByAllUser().subscribe({
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

  updateRequestStatus(borrowingId: number, action: string): void {
    this.requestService.updateRequestStatus(borrowingId, action).subscribe({
      next: () => {
        this.getallData();  // Load lại dữ liệu sau khi cập nhật thành công
      },
      error: () => {
        alert('Failed to update the request status.');
      }
    });
  }


}
