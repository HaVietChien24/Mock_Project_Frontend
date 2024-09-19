import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../components/user/home/home.component';
import { CommonModule } from '@angular/common';
import { FirebaseModule } from './firebase/firebase.module';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        HomeComponent,
        CommonModule, FirebaseModule
    ],

    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {}
