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
