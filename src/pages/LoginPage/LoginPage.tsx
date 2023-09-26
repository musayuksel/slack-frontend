import { useState, type FC, useEffect } from 'react';
import { useSessionStorage } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { IAuthenticateUserWithCognitoArgs, authenticateUserWithCognito } from '../../utils';

export const LoginPage: FC = () => {
  const [userInfos, setUserInfos] = useState<IAuthenticateUserWithCognitoArgs>({
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    authenticateUserWithCognito(userInfos, setToken);
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
