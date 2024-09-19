// src/app/firebase.module.ts
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../../environments/firebase-config';

@NgModule({
    imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig), // Cấu hình Firebase App
        AngularFireStorageModule // Cấu hình Firebase Storage
    ],
    exports: [
        AngularFireModule,
        AngularFireStorageModule
    ]
})
export class FirebaseModule { }
