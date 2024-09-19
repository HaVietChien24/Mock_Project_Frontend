import { Routes } from '@angular/router';
import { HomeComponent } from '../components/user/home/home.component';
import { DashboardComponent } from '../components/admin/dashboard/dashboard.component';
import { AdminBookBorrowComponent } from '../components/admin/admin-book-borrow/admin-book-borrow.component';
import { AdminBookBorrowingDetailComponent } from '../components/admin/admin-book-borrowing-detail/admin-book-borrowing-detail.component';
import { LoginComponent } from '../components/auth/login/login.component';
import { RegisterComponent } from '../components/auth/register/register.component';
import { AdminManageUserComponent } from '../components/admin/admin-manage-user/admin-manage-user.component';
import { BookDetailsComponent } from '../components/user/book-details/book-details.component';
import { WishListComponent } from '../components/user/wish-list/wish-list.component';
import { ProfileComponent } from '../components/shared/profile/profile.component';
import { RequestsComponent } from '../components/user/requests/requests.component';
import { AdminManageBooksComponent } from '../components/admin/admin-manage-books/admin-manage-books.component';

export const routes: Routes = [
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/book-borrow', component: AdminBookBorrowComponent },
  {
    path: 'admin/book-borrow-detail/:borrowingId',
    component: AdminBookBorrowingDetailComponent,
  },
  {
    path: 'admin/book-borrow-detail/:borrowingId',
    component: AdminBookBorrowingDetailComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin/ManageUser', component: AdminManageUserComponent },
  { path: 'book-details', component: BookDetailsComponent },
  { path: 'wish-list', component: WishListComponent },
  { path: 'requests', component: RequestsComponent },
  { path: 'admin/ManageUser', component: AdminManageUserComponent },
  { path: 'admin/ManageBook', component: AdminManageBooksComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/' },
];
