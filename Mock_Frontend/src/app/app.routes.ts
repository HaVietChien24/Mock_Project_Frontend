import { Routes } from '@angular/router';
import { HomeComponent } from '../components/user/home/home.component';
import { DashboardComponent } from '../components/admin/dashboard/dashboard.component';
import { AdminBookBorrowComponent } from '../components/admin/admin-book-borrow/admin-book-borrow.component';
import { AdminBookBorrowingDetailComponent } from '../components/admin/admin-book-borrowing-detail/admin-book-borrowing-detail.component';
import { LoginComponent } from '../components/auth/login/login.component';
import { AdminManageUserComponent } from '../components/admin/admin-manage-user/admin-manage-user.component';
import { BookDetailsComponent } from '../components/user/book-details/book-details.component';
import { WishListComponent } from '../components/user/wish-list/wish-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/book-borrow', component: AdminBookBorrowComponent },
  {
    path: 'admin/book-borrow-detail/:borrowingId',
    component: AdminBookBorrowingDetailComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'admin/ManageUser', component: AdminManageUserComponent },
  { path: 'book-details', component: BookDetailsComponent },
  { path: 'wish-list', component: WishListComponent },
];
