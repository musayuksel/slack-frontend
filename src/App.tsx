import { type FC } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { DashboardPage, HomePage, LoginPage, SignUpPage } from './pages';
import { NavMenu } from './components';
import './App.css';

const App: FC = () => {
  return (
    <BrowserRouter>
      <NavMenu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
