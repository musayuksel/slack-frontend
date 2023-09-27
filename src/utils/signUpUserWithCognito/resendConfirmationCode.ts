import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { config } from '../../aws_config';
import { ISignUpUserWithCognitoArgs } from './signUpUserWithCognito.interface';

export const resendConfirmationCode = (userInfos: ISignUpUserWithCognitoArgs) => {
  const userPool = new CognitoUserPool({
    UserPoolId: config.userPoolId,
    ClientId: config.userPoolWebClientId,
  });

  const cognitoUser = new CognitoUser({
    Username: userInfos.email,
    Pool: userPool,
  });

  cognitoUser.resendConfirmationCode((err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.info(result);
    }
  });
};
