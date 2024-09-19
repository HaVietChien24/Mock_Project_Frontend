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
import { UserBookBorrowComponent } from '../components/user/user-book-borrow/user-book-borrow.component';
import { authGuard } from '../Guard/auth-guard/auth.guard';
import { AdminManageRequestComponent } from '../components/admin/admin-manage-request/admin-manage-request.component';
import { UnauthorizedComponent } from '../components/shared/unauthorized/unauthorized.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/book-borrow',
    component: AdminBookBorrowComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/book-borrow-detail/:borrowingId',
    component: AdminBookBorrowingDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/book-borrow-detail/:borrowingId',
    component: AdminBookBorrowingDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user/user-book-borrow',
    component: UserBookBorrowComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/ManageUser',
    component: AdminManageUserComponent,
    canActivate: [authGuard],
  },
  {
    path: 'book-details',
    component: BookDetailsComponent,
    canActivate: [authGuard],
  },
  { path: 'wish-list', component: WishListComponent, canActivate: [authGuard] },
  { path: 'requests', component: RequestsComponent, canActivate: [authGuard] },
  {
    path: 'admin/ManageUser',
    component: AdminManageUserComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/ManageBook',
    component: AdminManageBooksComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/ManageBook',
    component: AdminManageBooksComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/ManageRequest',
    component: AdminManageRequestComponent,
    canActivate: [authGuard],
  },
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/' },
];
