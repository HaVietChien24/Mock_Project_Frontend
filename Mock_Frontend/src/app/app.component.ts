import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from '../components/user/home/home.component';
import { CommonModule } from '@angular/common';
import { FirebaseModule } from './firebase/firebase.module';
import { UserService } from '../service/user-service/user.service';
import { UserFullInfoDTO } from '../models/UserModels';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, CommonModule, FirebaseModule],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
