import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../service/user-service/user.service';
import { AuthResponse } from '../../../models/UserModels';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../widget/spinner/spinner.component';

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
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  handleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  resetErrorMessage() {
    this.errorMessage = null;
  }

  onSubmit() {
    this.isLoading = true;
    this.loginForm.disable();
    this.resetErrorMessage();

    this.userService.login(this.loginForm.value).subscribe({
      next: (res: AuthResponse) => {
        localStorage.setItem('userToken', res.token);
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
        this.isLoading = false;
        this.loginForm.enable();
      },
    });
  }
}
