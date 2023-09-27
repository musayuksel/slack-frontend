import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { HttpMethod, fetchData } from '../fetchData';
import { config } from '../../aws_config';
import { ISignUpUserWithCognitoArgs } from './signUpUserWithCognito.interface';
import { NavigateFunction } from 'react-router-dom';

export const confirmUserWithCognito = (userInfos: ISignUpUserWithCognitoArgs, navigate: NavigateFunction) => {
  const userPool = new CognitoUserPool({
    UserPoolId: config.userPoolId,
    ClientId: config.userPoolWebClientId,
  });

  const cognitoUser = new CognitoUser({
    Username: userInfos.email,
    Pool: userPool,
  });

  cognitoUser.confirmRegistration(userInfos.verificationCode, true, async (err, result) => {
    if (err) {
      console.error(err);
    } else if (result === 'SUCCESS') {
      try {
        const response = await fetchData({
          url: '/users',
          method: HttpMethod.POST,
          body: JSON.stringify({
            userEmail: userInfos.email,
            userName: userInfos.cognitoUserName,
            firstName: userInfos.fistName,
            lastName: userInfos.lastName,
          }),
        });
        console.log(response);

        if (response.status === 200) {
          navigate('/login');
        }
      } catch (err) {
        console.error(err);
      }
    }
  });
};
