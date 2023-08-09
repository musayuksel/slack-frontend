import React, { useState } from 'react';
import './App.css';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { config } from './aws_config';
function App() {
  console.log({ config });
  const [userInfos, setUserInfos] = useState({
    email: '',
    password: '',
    verificationCode: '',
  });
  const [isVerificationCode, setIsVerificationCode] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfos((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const userPool = new CognitoUserPool({
      UserPoolId: config.userPoolId,
      ClientId: config.userPoolWebClientId,
    });

    userPool.signUp(
      userInfos.email,
      userInfos.password,
      [],
      [],
      (err, data) => {
        if (err) {
          console.log(err);
        } else if (data) {
          console.log('data:', data);
          setIsVerificationCode(true);
        }
      }
    );
  };

  const handleConfirmation = (
    email: string,
    confirmationCode: string
  ): void => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: new CognitoUserPool({
        UserPoolId: config.userPoolId,
        ClientId: config.userPoolWebClientId,
      }),
    });

    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log('confirmed:', result);
      }
    });
  };

  const handleVerification = (event: React.FormEvent) => {
    event.preventDefault();
    handleConfirmation(userInfos.email, userInfos.verificationCode);
  };

  return (
    <div className="App">
      {!isVerificationCode ? (
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={userInfos.email}
            placeholder="email"
            name="email"
            type="email"
          />
          <input
            onChange={handleChange}
            value={userInfos.password}
            placeholder="password"
            name="password"
            type="password"
          />
          <input type="submit" />
        </form>
      ) : (
        <form onSubmit={handleVerification}>
          <input
            onChange={handleChange}
            value={userInfos.verificationCode}
            placeholder="verification code"
            name="verificationCode"
            type="text"
          />
          <input type="submit" />
        </form>
      )}
    </div>
  );
}

export default App;
