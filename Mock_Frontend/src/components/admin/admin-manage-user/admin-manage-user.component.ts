import { Component, OnInit } from '@angular/core';
import { AdminSideBarComponent } from "../admin-side-bar/admin-side-bar.component";
import { UserService } from '../../../service/user-service/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-manage-user',
  standalone: true,
  imports: [AdminSideBarComponent, FormsModule, CommonModule],
  templateUrl: './admin-manage-user.component.html',
  styleUrl: './admin-manage-user.component.css'
})
export class AdminManageUserComponent implements OnInit {
  toggleBanAccount(userId: number, event: any): void {


    // Gửi yêu cầu tới API để cập nhật trạng thái của người dùng
    this.userService.banAccount(userId).subscribe({
      next: (response) => {
        // Xử lý phản hồi từ server nếu cần
        console.log('Update successful:', response);
        // Cập nhật trạng thái của người dùng trong danh sách nếu cần
        // (ví dụ: cập nhật danh sách người dùng trong component)
      },
      error: (error) => {
        // Xử lý lỗi nếu cần
        console.error('Update failed:', error);
      }
    });
  }



  listUser: any[] = [];



  // Thêm thuộc tính router
  constructor(
    private userService: UserService,
    private router: Router // Thêm Router vào constructor
  ) { }

  ngOnInit(): void {
    this.userService.getAllUser().subscribe((response) => {
      this.listUser = response;
    });
  }

}
