import { useState, type FC } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { config } from '../../aws_config';
import { SignUpForm } from '../../components/SignUpForm';

export const SignUpPage: FC = () => {
  const [userInfos, setUserInfos] = useState({
    email: '',
    password: '',
    verificationCode: '',
    cognitoUserName: '',
    fistName: '',
    lastName: '',
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
        <SignUpForm userInfos={userInfos} handleChange={handleChange} />
      )}
    </div>
  );
};
