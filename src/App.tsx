import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { config } from './aws_config';
function App() {
  const [userInfos, setUserInfos] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfos((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const userPool = new CognitoUserPool({
      UserPoolId: config.userPoolId,
      ClientId: config.userPoolWebClientId,
    });

    userPool.signUp(
      userInfos.email,
      userInfos.password,
      [],
      [],
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          if (data) {
            console.log('userName:', data.user.getUsername());
          }
        }
      }
    );
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={userInfos.email}
          placeholder="email"
          name="email"
          type="email"
        />
        <input
          onChange={handleChange}
          value={userInfos.password}
          placeholder="password"
          name="password"
          type="password"
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
