// tests/facebookApi.test.ts
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchUserData } from '../services/facebookApi'; // Update the import path according to your project structure
import { RateLimitError } from '../errors/RateLimitError';
import { ApiError } from '../errors/ApiError';

const mock = new MockAdapter(axios);

describe('fetchUserData', () => {
  const accessToken = 'test_access_token';
  const BASE_URL = 'https://graph.facebook.com/v19.0';

  afterEach(() => {
    mock.reset();
  });

  it('successfully fetches user data', async () => {
    const mockData = { id: '1', name: 'John Doe', last_name: 'Doe' };
    mock.onGet(`${BASE_URL}/me`, { params: { fields: 'id,name,last_name', access_token: accessToken } }).reply(200, mockData);

    const data = await fetchUserData(accessToken);
    expect(data).toEqual(mockData);
  });

  it('throws RateLimitError on 429 response', async () => {
    mock.onGet(`${BASE_URL}/me`, { params: { fields: 'id,name,last_name', access_token: accessToken } }).reply(429);

    await expect(fetchUserData(accessToken)).rejects.toThrow(RateLimitError);
  });

  it('throws ApiError on other errors', async () => {
    mock.onGet(`${BASE_URL}/me`, { params: { fields: 'id,name,last_name', access_token: accessToken } }).reply(500, 'Internal Server Error');

    await expect(fetchUserData(accessToken)).rejects.toThrow(ApiError);
  });
});
