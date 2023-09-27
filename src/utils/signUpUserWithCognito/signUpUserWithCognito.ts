import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { config } from '../../aws_config';
import {
  ISignUpUserWithCognitoArgs,
  ISignUpUserWithCognitoSetShowVerificationForm,
  ISignUpUserWithCognitoSetUserInfos,
} from './signUpUserWithCognito.interface';

export const signUpUserWithCognito = (
  userInfos: ISignUpUserWithCognitoArgs,
  setUserInfos: ISignUpUserWithCognitoSetUserInfos,
  setShowVerificationForm: ISignUpUserWithCognitoSetShowVerificationForm,
) => {
  const userPool = new CognitoUserPool({
    UserPoolId: config.userPoolId,
    ClientId: config.userPoolWebClientId,
  });

  userPool.signUp(userInfos.email, userInfos.password, [], [], (err, data) => {
    if (err) {
      console.error(err);
    } else if (data) {
      setUserInfos((prev) => ({
        ...prev,
        cognitoUserName: data.userSub,
      }));
      setShowVerificationForm(true);
    }
  });
};
