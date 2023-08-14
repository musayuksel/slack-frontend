import { useState, type FC } from 'react';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { config } from '../../aws_config';
import { useNavigate } from 'react-router-dom';
import { HttpMethod, fetchData } from '../../utils';

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

    userPool.signUp(userInfos.email, userInfos.password, [], [], (err, data) => {
      if (err) {
        console.error(err);
      } else if (data) {
        setUserInfos((prev) => ({
          ...prev,
          cognitoUserName: data.user.getUsername(),
        }));
        setShowVerificationForm(true);
      }
    });
  };

  const handleConfirmation = (email: string, confirmationCode: string): void => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(confirmationCode, true, async (err, result) => {
      if (err) {
        console.error(err);
      } else if (result === 'SUCCESS') {
        try {
          const response = await fetchData(
            '/users',
            HttpMethod.POST,
            JSON.stringify({
              userEmail: userInfos.email,
              userName: userInfos.cognitoUserName,
              firstName: userInfos.fistName,
              lastName: userInfos.lastName,
            }),
          );
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

  const resendConfirmationCode = (): void => {
    const cognitoUser = new CognitoUser({
      Username: userInfos.email,
      Pool: userPool,
    });

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        console.error(err);
      } else if (result === 'SUCCESS') {
        console.log('code resent');
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
          <input
            onChange={handleChange}
            value={userInfos.fistName}
            placeholder="first name"
            name="fistName"
            type="text"
          />
          <input
            onChange={handleChange}
            value={userInfos.lastName}
            placeholder="last name"
            name="lastName"
            type="text"
          />

          <input type="submit" />
          <input type="button" value="Resend code!" onClick={resendConfirmationCode} />
        </form>
      )}
    </div>
  );
};
