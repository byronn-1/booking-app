import {
  getLocalStorageAuthTokens,
  setLocalStorageAuthTokens,
  removeLocalStorageAuthTokens
} from '../utils/localStorage';
import { getAuthApiUrl } from './urlConfig';

let refreshInProgress = false;

//TAKEN FROM TENNIS PORTAL -- MOIN
export async function refreshUserTokens() {
  // this is needed because the refresh cycle takes a little time to complete, so if another call was made during this time and failed,
  // it would be refreshing twice simultaneously
  if (refreshInProgress) return 'refreshInProgress';
  refreshInProgress = true;
  const tokenData = getLocalStorageAuthTokens();
  const formData = new URLSearchParams();
  formData.append('grant_type', 'refresh');
  formData.append('user_name', tokenData.userName);
  formData.append('refresh_token', tokenData.refreshToken);
  const url = `${getAuthApiUrl()}token`;
  const res = await fetch(url, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  if (res.status === 200) {
    const data = await res.json();
    setLocalStorageAuthTokens(data?.access_token, data?.refresh_token);
  }
  refreshInProgress = false;
  return res;
}

export async function logout() {
  const tokenData = getLocalStorageAuthTokens();
  removeLocalStorageAuthTokens();
  const formData = new URLSearchParams();
  formData.append('access_token', tokenData.accessToken);
  const url = `${getAuthApiUrl()}logout`;
  const res = await fetch(url, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${tokenData.accessToken}`
    }
  });
  const data = res.data;
  window.location.href = '/login';
  return data;
}
