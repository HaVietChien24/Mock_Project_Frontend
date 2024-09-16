export interface LoginDTO {
    username: string,
    password: string
}

export interface AuthResponse {
    token: string
    message: string
}