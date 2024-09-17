import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../service/user-service/user.service';
import { SpinnerComponent } from "../../widget/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthResponse } from '../../../models/UserModels';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterLink, SpinnerComponent],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {

    registerForm: FormGroup;
    showPassword: boolean = false;
    errorMessage: string | null = null;
    isLoading: boolean = false;

    constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
        this.registerForm = this.formBuilder.group({
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            username: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            phone: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            confirmPassword: new FormControl('', [Validators.required]),
        });
    }

    resetErrorMessage() {
        this.errorMessage = null;
    }

    handleShowPassword() {
        this.showPassword = !this.showPassword
    }

    onSubmit() {
        this.isLoading = true;
        this.registerForm.disable();
        this.resetErrorMessage();


        this.userService.register(this.registerForm.value).subscribe({
            next: () => {
                this.router.navigate(['/login']);
            },
            error: (error: HttpErrorResponse) => {
                this.errorMessage = error.error.message;
                this.isLoading = false;
                this.registerForm.enable();
            }
        })
    }

}
