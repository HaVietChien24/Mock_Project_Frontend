import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  ChangePasswordDTO,
  LoginDTO,
  RegisterDTO,
  UserFullInfoDTO,
} from '../../models/UserModels';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const baseUrl: string = 'http://localhost:5110/api/User';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login successfully', () => {
    const loginInfo: LoginDTO = {
      username: 'haroldpower',
      password: 'Monstercat@2k11',
    };

    service.login(loginInfo).subscribe((response) => {
      console.log(response);
      expect(response.token).not.toBeNull();
    });

    const req = httpMock.expectOne(`${baseUrl}/login`);
    expect(req.request.method).toBe('POST');
  });

  it('should change user password', () => {
    const mockResponse = 'Change Password Successfully';
    const changePasswordInfo: ChangePasswordDTO = {
      id: '1',
      oldPassword: 'Ncs@14082011',
      newPassword: 'Monstercat@2k11',
      confirmNewPassword: 'Monstercat@2k11',
    };

    service.changePassword(changePasswordInfo).subscribe((response) => {
      expect(response.toString()).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/changePassword`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should register new account', () => {
    let mockResponse = 'Register User Successfully';
    let registerInfo: RegisterDTO = {
      firstName: 'Amanda',
      lastName: 'Blake',
      email: 'amanda@gmail.com',
      phone: '124543645',
      username: 'amanda_blake',
      password: 'Monstercat@2k11',
      confirmPassword: 'Monstercat@2k11',
    };

    service.register(registerInfo).subscribe((response) => {
      expect(response.toString()).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
