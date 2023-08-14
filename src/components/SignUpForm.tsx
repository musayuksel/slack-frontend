import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';
import { HttpMethod, fetchData } from '../utils';
import { config } from '../aws_config';

type Props = {
  userInfos: {
    email: string;
    password: string;
    verificationCode: string;
    cognitoUserName: string;
    fistName: string;
    lastName: string;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SignUpForm = ({ userInfos, handleChange }: Props) => {
  const navigate = useNavigate();

  const userPool = new CognitoUserPool({
    UserPoolId: config.userPoolId,
    ClientId: config.userPoolWebClientId,
  });

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
      } else {
        console.info(result);
      }
    });
  };

  const handleVerification = (event: React.FormEvent) => {
    event.preventDefault();
    handleConfirmation(userInfos.email, userInfos.verificationCode);
  };

  return (
    <>
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
        <input onChange={handleChange} value={userInfos.lastName} placeholder="last name" name="lastName" type="text" />

        <input type="submit" />
        <input type="button" value="Resend code!" onClick={resendConfirmationCode} />
      </form>
    </>
  );
};
