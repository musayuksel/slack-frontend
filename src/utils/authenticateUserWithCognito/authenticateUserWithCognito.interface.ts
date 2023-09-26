export interface IAuthenticateUserWithCognitoArgs {
  email: string;
  password: string;
}

export interface IAuthenticateUserWithCognitoSetToken {
  (accessToken: string): void;
}
