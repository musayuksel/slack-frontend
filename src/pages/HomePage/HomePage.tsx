import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage: FC = () => {
  const navigate = useNavigate();

  return (
    <section>
      <h1>Home</h1>
      <button onClick={() => navigate('/sign-up')}>Sign up</button>
      <button onClick={() => navigate('/login')}>Login</button>
    </section>
  );
};
