export interface ISignUpState {
  user: IUser | null;
  isAuthenticated: boolean;
  errorMessage: null | string;
  isLoading: boolean;
  isCheckingAuth: boolean;
}

export interface IUserDataSingUp {
  name: string;
  email: string;
  password: string;
  passwordRepeated: string;
}

export interface IUser {
  email: string;
  name: string;
  isVerified: boolean;
  verificationToken: string;
  verificationTokenExpiresAt: Date;
  _id: string;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IServerResponse {
  success: boolean;
  message: string;
  user: null | IUser;
}

export interface IEmailVerificationArguments {
  code: string;
  email: string;
}
