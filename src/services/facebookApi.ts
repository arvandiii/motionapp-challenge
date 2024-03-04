import axios, { AxiosError } from 'axios';
import { FacebookUser } from '../types/facebook';
import { RateLimitError } from '../errors/RateLimitError';
import { ApiError } from '../errors/ApiError';

const BASE_URL = 'https://graph.facebook.com/v19.0';

export const fetchUserData = async (accessToken: string): Promise<FacebookUser | null> => {
  try {
    const response = await axios.get<FacebookUser>(`${BASE_URL}/me`, {
      params: {
        fields: 'id,name,last_name',
        access_token: accessToken,
      },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 429) {
        throw new RateLimitError();
    } else {
      throw new ApiError(axiosError.message);
    }
  }
};
