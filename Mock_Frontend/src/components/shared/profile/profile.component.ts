import { Component } from '@angular/core';
import { HeaderComponent } from '../../user/header/header.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../service/user-service/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../widget/spinner/spinner.component';
import { AuthResponse, UserProfileDTO } from '../../../models/UserModels';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    SpinnerComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profileForm: FormGroup;
  updateMode: boolean = false;
  isLoading: boolean = false;
  currentUser: UserProfileDTO | null = null;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.currentUser = this.userService.loadUserFromStorage();

    this.profileForm = this.formBuilder.group({
      firstName: new FormControl(
        { value: this.currentUser?.firstName, disabled: true },
        [Validators.required]
      ),
      lastName: new FormControl(
        { value: this.currentUser?.lastName, disabled: true },
        [Validators.required]
      ),
      username: new FormControl(
        { value: this.currentUser?.username, disabled: true },
        [Validators.required]
      ),
      email: new FormControl(
        { value: this.currentUser?.email, disabled: true },
        [Validators.email]
      ),
      phone: new FormControl(
        { value: this.currentUser?.phone, disabled: true },
        [Validators.pattern('^[0-9]*$')]
      ),
      imageURL: new FormControl({
        value: this.currentUser?.imageURL,
        disabled: true,
      }),
    });
  }

  getInput(inputName: string) {
    return this.profileForm.get(inputName);
  }

  toggleUpdateMode() {
    this.updateMode = !this.updateMode;
    if (!this.updateMode) {
      this.profileForm.disable();
      this.profileForm.setValue({
        email: this.currentUser?.email,
        firstName: this.currentUser?.firstName,
        lastName: this.currentUser?.lastName,
        imageURL: this.currentUser?.imageURL,
        phone: this.currentUser?.phone,
        username: this.currentUser?.username,
      });
    } else {
      this.profileForm.enable();
      this.getInput('username')?.disable();
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.profileForm.disable();

    this.userService.updateProfile(this.profileForm.value).subscribe({
      next: (res: AuthResponse) => {
        this.isLoading = false;
        this.updateMode = false;

        localStorage.setItem('userToken', res.token);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
        this.isLoading = false;
        this.profileForm.enable();
        this.getInput('username')?.disable();
      },
    });
  }
}
