import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../widget/spinner/spinner.component';
import { UserService } from '../../../service/user-service/user.service';
import { AuthResponse } from '../../../models/UserModels';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  showPassword: boolean = false;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  @Input()
  currentUserID!: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ),
      ]),
      confirmNewPassword: new FormControl('', [Validators.required]),
    });
  }

  handleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  resetErrorMessage() {
    this.errorMessage = null;
  }

  getInput(inputName: string) {
    return this.changePasswordForm.get(inputName);
  }

  onSubmit() {
    this.changePasswordForm.disable();
    this.errorMessage = null;

    this.userService
      .changePassword({
        ...this.changePasswordForm.value,
        id: this.currentUserID,
      })
      .subscribe({
        next: (res: AuthResponse) => {
          console.log(res.message);
        },
        error: (error) => {
          this.errorMessage = error.error.message;
          this.changePasswordForm.enable();
        },
      });
  }
}
