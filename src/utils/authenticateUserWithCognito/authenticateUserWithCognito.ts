import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { config } from '../../aws_config';
import {
  IAuthenticateUserWithCognitoArgs,
  IAuthenticateUserWithCognitoSetToken,
} from './authenticateUserWithCognito.interface';

export const authenticateUserWithCognito = (
  userInfos: IAuthenticateUserWithCognitoArgs,
  setToken: IAuthenticateUserWithCognitoSetToken,
) => {
  const userPool = new CognitoUserPool({
    UserPoolId: config.userPoolId,
    ClientId: config.userPoolWebClientId,
  });

  const authenticationData = {
    Username: userInfos.email,
    Password: userInfos.password,
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const cognitoUser = new CognitoUser({
    Username: userInfos.email,
    Pool: userPool,
  });

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      const accessToken = result.getAccessToken().getJwtToken();
      setToken(accessToken);
    },
    onFailure: (err: Error) => {
      console.error('Authentication failed:', err);
      //TODO: Handle authentication failure
    },
  });
};
