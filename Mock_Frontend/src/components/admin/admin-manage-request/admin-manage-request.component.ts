import { Component } from '@angular/core';
import { AdminSideBarComponent } from "../admin-side-bar/admin-side-bar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-manage-request',
  standalone: true,
  imports: [AdminSideBarComponent,CommonModule],
  templateUrl: './admin-manage-request.component.html',
  styleUrl: './admin-manage-request.component.css'
})
export class AdminManageRequestComponent {
requestList: any;

}
