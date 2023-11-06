import { useState, type FC, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../../hooks';
import { UserContext } from '../../contexts';
import { IAuthenticateUserWithCognitoArgs, authenticateUserWithCognito, fetchData } from '../../utils';

export const LoginPage: FC = () => {
  const [userInfos, setUserInfos] = useState<IAuthenticateUserWithCognitoArgs>({
    email: '',
    password: '',
  });

  const [token, setToken] = useSessionStorage({ key: 'token', initialValue: '' });

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
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
    const fetchDataAndSetUser = async () => {
      try {
        const response = await fetchData({ url: '/users/me' });
        const data = await response.json();
        setUser(data.data);
        if (token) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.log({ error });
      }
    };

    fetchDataAndSetUser();
  }, [token, navigate, setUser]);

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
