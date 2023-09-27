import { useState, type FC } from 'react';
import { SignUpForm } from '../../components';
import { ISignUpUserWithCognitoArgs, signUpUserWithCognito } from '../../utils';

export const SignUpPage: FC = () => {
  const [userInfos, setUserInfos] = useState<ISignUpUserWithCognitoArgs>({
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    signUpUserWithCognito(userInfos, setUserInfos, setShowVerificationForm);
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
