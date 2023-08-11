import { useState, type FC } from 'react';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { config } from '../../aws_config';

export const LoginPage: FC = () => {
  const [userInfos, setUserInfos] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfos((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const userPool = new CognitoUserPool({
    UserPoolId: config.userPoolId,
    ClientId: config.userPoolWebClientId,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

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
        console.log({ accessToken });
      },
      onFailure: (err) => {
        console.error('Authentication failed:', err);
        //TODO: Handle authentication failure
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={userInfos.email}
          placeholder="Email"
          name="email"
          type="email"
          autoComplete="email"
        />
        <input
          onChange={handleChange}
          value={userInfos.password}
          placeholder="Password"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};
