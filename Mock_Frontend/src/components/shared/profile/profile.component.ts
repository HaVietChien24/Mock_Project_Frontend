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
import { AuthResponse, UserFullInfoDTO } from '../../../models/UserModels';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ToastrService } from 'ngx-toastr';
import { FirebaseModule } from '../../../app/firebase/firebase.module';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    SpinnerComponent,
    ChangePasswordComponent,
    FirebaseModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profileForm: FormGroup;
  updateMode: boolean = false;
  isLoading: boolean = false;
  currentUser: UserFullInfoDTO;
  selectedImageURL: string | null = null;
  componentName = 'Profile';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private fireStorage: AngularFireStorage
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
        value: null,
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

    let updateInfo = {
      ...this.profileForm.value,
      imageURL: this.currentUser.imageURL,
    };

    if (this.selectedImageURL !== null) {
      updateInfo = {
        ...this.profileForm.value,
        imageURL: this.selectedImageURL,
      };
    }

    this.userService.updateProfile(updateInfo).subscribe({
      next: (res: AuthResponse) => {
        this.isLoading = false;
        this.updateMode = false;

        this.selectedImageURL = null;

        localStorage.setItem('userToken', res.token);
        window.location.href = '/profile';
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;

        this.profileForm.enable();
        this.getInput('username')?.disable();

        this.toastr.error(error.error.message);
      },
    });
  }

  async onImageChange(event: any) {
    this.profileForm.disable();
    this.isLoading = true;
    const file = event.target.files[0];

    if (file) {
      const path = `yt/${file.name}`;
      try {
        const uploadTask = await this.fireStorage.upload(path, file);

        const url = await uploadTask.ref.getDownloadURL();

        if (url) {
          this.selectedImageURL = url;
        } else {
          this.toastr.error('Error updating avatar');
        }
      } catch (error) {
        this.toastr.error('Error uploading image');
      } finally {
        this.profileForm.enable();
        this.isLoading = false;
      }
    } else {
      this.toastr.error('No file selected');
      this.profileForm.enable();
      this.isLoading = false;
    }
  }
}
