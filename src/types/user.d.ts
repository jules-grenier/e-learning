export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  token: string;
}

export interface UserWithoutPassword {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

export interface UserRegistration {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
