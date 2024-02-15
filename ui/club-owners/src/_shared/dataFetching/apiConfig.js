import axios from 'axios';
import { getApiUrl } from './urlConfig';
import { refreshUserTokens, logout } from './auth';
import { getLocalStorageAuthTokens } from '../utils/localStorage';

//COPIED OVER FROM TENNISVIZ PORTAL -- AIMS TO ENSURE THAT REFRESHED TOKENS ARE ACCOUNTED FOR IN API CALLS -- CREATED BY MOIN
export const apiClient = axios.create({
  baseURL: getApiUrl(),
  withCredentials: true,
  params: {}
});

apiClient.interceptors.request.use((config) => {
  const token = getLocalStorageAuthTokens();
  if (token.accessToken) {
    config.headers['Authorization'] = `Bearer ${token.accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async function (error) {
    // this gets called if the API request has returned any kind of error
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      // access token is invalid, lets try and refresh the token
      originalRequest._retry = true;
      const res = await refreshUserTokens();
      if (res.status !== 200) {
        if (res !== 'refreshInProgress') {
          // the refresh process has failed, so log the user out
          await logout();
          // we don't depend on the result of the log out here, as if it failed, we would keep going round in circles
          // resolve this promise, otherwise it will log it as an error, when it's actually been handled
          return Promise.resolve('User logged out');
        } else {
          // another refresh is currently in progress, so just resolve and don't do anything with the request
          return Promise.resolve('Refresh currently in progress');
        }
      }
      // refresh has returned 200, so succeeded. New tokens are in local storage, so try the request again
      return apiClient(originalRequest);
    }
    // we either: errored, successfully refreshed token, tried again with the new tokens, but the request has failed again. So lets error out.
    // or the error isn't a 401, in which case error out
    return Promise.reject(error);
  }
);
