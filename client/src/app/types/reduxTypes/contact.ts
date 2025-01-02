export interface ISendContactForm {
  userName: string;
  email: string;
  message: string;
}

export interface IInitialState {
  isLoading: boolean;
  errorMessage: string | null;
}
