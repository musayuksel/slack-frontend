export interface ISignUpUserWithCognitoArgs {
  email: string;
  password: string;
  verificationCode: string;
  cognitoUserName: string;
  fistName: string;
  lastName: string;
}
export interface ISignUpUserWithCognitoSetUserInfos
  extends React.Dispatch<React.SetStateAction<ISignUpUserWithCognitoArgs>> {}

export interface ISignUpUserWithCognitoSetShowVerificationForm extends React.Dispatch<React.SetStateAction<boolean>> {}
