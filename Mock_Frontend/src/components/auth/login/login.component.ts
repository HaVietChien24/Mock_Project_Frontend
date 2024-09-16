import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../service/user-service/user.service';
import { AuthResponse } from '../../../models/UserModels';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    showPassword: boolean = false;
    errorMessage: string | null = null;

    constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
        this.form = this.formBuilder.group({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    ngOnInit(): void {

    }

    handleShowPassword() {
        this.showPassword = !this.showPassword
    }

    resetErrorMessage() {
        this.errorMessage = null;
    }

    onSubmit() {
        this.userService
            .login(this.form.value)
            .subscribe({
                next: (res: AuthResponse) => {
                    this.resetErrorMessage()
                    localStorage.setItem("userToken", res.token);
                    this.router.navigate(['/']);
                },
                error: (error: HttpErrorResponse) => {
                    this.errorMessage = error.error.message;
                }
            })
    }
}
