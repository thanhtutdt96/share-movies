export interface User {
  email: string;
  id: number;
}

export interface AuthSubmitData {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
