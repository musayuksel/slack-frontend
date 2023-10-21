import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmUserWithCognito, resendConfirmationCode } from '../../utils';
import { TSignUpFormProps } from './SignUpForm.types';

export const SignUpForm: FC<TSignUpFormProps> = ({ userInfos, handleChange }) => {
  const navigate = useNavigate();

  const handleVerification = (event: React.FormEvent) => {
    event.preventDefault();

    confirmUserWithCognito(userInfos, navigate);
  };

  const handleResendConfirmationCode = () => {
    resendConfirmationCode(userInfos);
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
        <input type="button" value="Resend code!" onClick={handleResendConfirmationCode} />
      </form>
    </>
  );
};
