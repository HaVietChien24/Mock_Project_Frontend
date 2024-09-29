import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { UserService } from '../../../service/user-service/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService, ToastrModule } from 'ngx-toastr';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfileComponent,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [UserService, ToastrService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    userService = TestBed.inject(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('testing title', () => {
    expect(component.componentName).toBe('profile');
  });
});
