import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../service/user-service/user.service';
import { SpinnerComponent } from '../../widget/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthResponse } from '../../../models/UserModels';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      phone: new FormControl('', [Validators.pattern('^[0-9]*$')]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  handleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  getInput(inputName: string) {
    return this.registerForm.get(inputName);
  }

  onSubmit() {
    this.isLoading = true;
    this.registerForm.disable();

    this.userService.register(this.registerForm.value).subscribe({
      next: (res: AuthResponse) => {
        this.toastr.error(res.message);
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.message);
        this.isLoading = false;
        this.registerForm.enable();
      },
    });
  }
}
