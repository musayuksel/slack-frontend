import { useState, type FC } from 'react';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { config } from '../../aws_config';

export const SignUpPage: FC = () => {
  const [userInfos, setUserInfos] = useState({
    email: '',
    password: '',
    verificationCode: '',
  });
  const [showVerificationForm, setShowVerificationForm] = useState(false);

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
          localStorage.setItem('userData', JSON.stringify(data));
          setShowVerificationForm(true);
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
      Pool: userPool,
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
      {!showVerificationForm ? (
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={userInfos.email}
            placeholder="email"
            name="email"
            type="email"
            autoComplete="email"
          />
          <input
            onChange={handleChange}
            value={userInfos.password}
            placeholder="password"
            name="password"
            type="password"
            autoComplete="current-password"
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
};
