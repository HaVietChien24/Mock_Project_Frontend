import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../widget/spinner/spinner.component';
import { UserService } from '../../../service/user-service/user.service';
import { AuthResponse } from '../../../models/UserModels';
import { ToastrService } from 'ngx-toastr';

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
  isLoading: boolean = false;

  @Input()
  currentUserID!: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
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

  getInput(inputName: string) {
    return this.changePasswordForm.get(inputName);
  }

  onSubmit() {
    this.changePasswordForm.disable();
    this.userService
      .changePassword({
        ...this.changePasswordForm.value,
        id: this.currentUserID,
      })
      .subscribe({
        next: (res: AuthResponse) => {
          this.toastr.success(res.message);
        },
        error: (error) => {
          this.changePasswordForm.enable();
          this.toastr.error(error.error.message);
        },
      });
  }
}
