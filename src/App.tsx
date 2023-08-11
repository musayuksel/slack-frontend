import { type FC } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HomePage, LoginPage, SignUpPage } from './pages';
import { NavMenu } from './components/NavMenu';
import './App.css';

const App: FC = () => {
  return (
    <BrowserRouter>
      <NavMenu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
