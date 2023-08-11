import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const NavMenu: FC = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <button onClick={() => navigate('/')}>LOGO</button>
    </nav>
  );
};
