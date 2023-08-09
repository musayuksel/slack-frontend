export const config = {
  region: process.env.REACT_APP_AWS_REGION || '',
  userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID || '',
  userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID || '',
};
