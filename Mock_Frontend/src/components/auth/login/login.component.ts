import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../service/user-service/user.service';
import { AuthResponse } from '../../../models/UserModels';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../widget/spinner/spinner.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  handleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.isLoading = true;
    this.loginForm.disable();

    this.userService.login(this.loginForm.value).subscribe({
      next: (res: AuthResponse) => {
        localStorage.setItem('userToken', res.token);
        const roleIsAdmin = this.userService.loadUserFromStorage().isAdmin;

        if (roleIsAdmin === 'False') {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/admin/dashboard']);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.loginForm.enable();

        this.toastr.error(error.error.message);
      },
    });
  }
}
