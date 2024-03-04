import { config } from './config/index';
import { fetchUserData } from './services/facebookApi';
import { rateLimitedRequest } from './utils/rateLimitedRequest';

const startFetching = async () => {
  if (!config.accessToken) {
    console.error('Access token is not defined. Please set it in your .env file.');
    return;
  }

  try {
    await rateLimitedRequest(fetchUserData, config.accessToken, 2000);
  } catch (error: any) {
    console.error('Failed to fetch user data:', error.message);
  }
};

startFetching();
