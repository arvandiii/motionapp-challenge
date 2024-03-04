import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const config = {
  accessToken: process.env.ACCESS_TOKEN || '',
};