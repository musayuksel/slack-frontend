import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const NavMenu: FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <button onClick={() => navigate('/')}>LOGO</button>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};
