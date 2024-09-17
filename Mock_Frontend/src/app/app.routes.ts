import { Routes } from '@angular/router';
import { HomeComponent } from '../components/user/home/home.component';
import { DashboardComponent } from '../components/admin/dashboard/dashboard.component';
import { AdminBookBorrowComponent } from '../components/admin/admin-book-borrow/admin-book-borrow.component';
import { AdminBookBorrowingDetailComponent } from '../components/admin/admin-book-borrowing-detail/admin-book-borrowing-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/book-borrow', component: AdminBookBorrowComponent },
  { path: 'admin/book-borrow-detail/:borrowingId', component: AdminBookBorrowingDetailComponent }
];
