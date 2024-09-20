import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../service/user-service/user.service';
import { UserFullInfoDTO } from '../../../models/UserModels';

@Component({
  selector: 'app-admin-side-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-side-bar.component.html',
  styleUrl: './admin-side-bar.component.css',
})
export class AdminSideBarComponent {
  currentUser: UserFullInfoDTO;
  constructor(private userService: UserService) {
    this.currentUser = userService.loadUserFromStorage();
  }

  logout() {
    this.userService.logout();
  }
}
