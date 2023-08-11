import { type FC } from 'react';

import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HomePage, LoginPage, SignUpPage } from './pages';
import { NavMenu } from './components/NavMenu';

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

// import React, { useState } from 'react';
// import './App.css';
// import {
//   AuthenticationDetails,
//   CognitoUser,
//   CognitoUserPool,
// } from 'amazon-cognito-identity-js';
// import { config } from './aws_config';
// function App() {
//   const [userInfos, setUserInfos] = useState({
//     email: '',
//     password: '',
//     verificationCode: '',
//   });
//   const [isVerificationCode, setIsVerificationCode] = useState(false);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setUserInfos((prev) => ({
//       ...prev,
//       [event.target.name]: event.target.value,
//     }));
//   };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     const userPool = new CognitoUserPool({
//       UserPoolId: config.userPoolId,
//       ClientId: config.userPoolWebClientId,
//     });

//     userPool.signUp(
//       userInfos.email,
//       userInfos.password,
//       [],
//       [],
//       (err, data) => {
//         if (err) {
//           console.log(err);
//         } else if (data) {
//           console.log('data:', data);
//           localStorage.setItem('userData', JSON.stringify(data));
//           setIsVerificationCode(true);
//         }
//       }
//     );
//   };

//   const handleConfirmation = (
//     email: string,
//     confirmationCode: string
//   ): void => {
//     const cognitoUser = new CognitoUser({
//       Username: email,
//       Pool: new CognitoUserPool({
//         UserPoolId: config.userPoolId,
//         ClientId: config.userPoolWebClientId,
//       }),
//     });

//     cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log('confirmed:', result);
//       }
//     });
//   };

//   const handleVerification = (event: React.FormEvent) => {
//     event.preventDefault();
//     handleConfirmation(userInfos.email, userInfos.verificationCode);
//   };

//   const handleLogin = (event: React.MouseEvent<HTMLElement>) => {
//     const authenticationData = {
//       Username: 'musayuxel@gmail.com',
//       Password: '123123123',
//     };

//     const authenticationDetails = new AuthenticationDetails(authenticationData);

//     const cognitoUser = new CognitoUser({
//       Username: 'musayuxel@gmail.com',
//       Pool: new CognitoUserPool({
//         UserPoolId: config.userPoolId,
//         ClientId: config.userPoolWebClientId,
//       }),
//     });
//     cognitoUser.authenticateUser(authenticationDetails, {
//       onSuccess: function (result) {
//         var accessToken = result.getAccessToken().getJwtToken();
//         console.log({ accessToken });
//       },

//       onFailure: function (err) {
//         alert(err);
//       },
//     });
//   };

//   return (
//     <div className="App">
//       <button onClick={handleLogin}>LOGIN</button>
//       {!isVerificationCode ? (
//         <form onSubmit={handleSubmit}>
//           <input
//             onChange={handleChange}
//             value={userInfos.email}
//             placeholder="email"
//             name="email"
//             type="email"
//           />
//           <input
//             onChange={handleChange}
//             value={userInfos.password}
//             placeholder="password"
//             name="password"
//             type="password"
//           />
//           <input type="submit" />
//         </form>
//       ) : (
//         <form onSubmit={handleVerification}>
//           <input
//             onChange={handleChange}
//             value={userInfos.verificationCode}
//             placeholder="verification code"
//             name="verificationCode"
//             type="text"
//           />
//           <input type="submit" />
//         </form>
//       )}
//     </div>
//   );
// }

// export default App;
