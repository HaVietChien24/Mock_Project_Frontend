export interface LoginDTO {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  message: string;
}

export interface RegisterDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface UserProfileDTO {
  email: string;
  firstName: string;
  lastName: string;
  imageURL: string;
  phone: string;
  username: string;
}

export interface UserFullInfoDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  imageURL: string;
  phone: string;
  username: string;
  isAdmin: string;
}

export interface ChangePasswordDTO {
  id: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
