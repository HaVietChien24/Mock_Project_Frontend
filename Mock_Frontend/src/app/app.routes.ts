import { Routes } from '@angular/router';
import { HomeComponent } from '../components/user/home/home.component';
import { DashboardComponent } from '../components/admin/dashboard/dashboard.component';
import { LoginComponent } from '../components/auth/login/login.component';
import { AdminManageUserComponent } from '../components/admin/admin-manage-user/admin-manage-user.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/ManageUser', component: AdminManageUserComponent }
];
