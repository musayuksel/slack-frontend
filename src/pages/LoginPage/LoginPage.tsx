import { useState, type FC, useEffect } from 'react';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { config } from '../../aws_config';
import { useSessionStorage } from '../../hooks';
import { useNavigate } from 'react-router-dom';

export const LoginPage: FC = () => {
  const [userInfos, setUserInfos] = useState({
    email: '',
    password: '',
  });

  const [token, setToken] = useSessionStorage({ key: 'token', initialValue: '' });

  const navigate = useNavigate();

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
        setToken(accessToken);
      },
      onFailure: (err) => {
        console.error('Authentication failed:', err);
        //TODO: Handle authentication failure
      },
    });
  };
  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

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
