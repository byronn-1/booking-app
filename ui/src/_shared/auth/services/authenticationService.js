import axios from 'axios';
import { getAuthApiUrl } from '../../dataFetching/urlConfig';
import { getPoolData } from './poolService';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

/* const clearLocalSession = () => {
  // Clear any other session data if needed
  localStorage.removeItem('someKey');  // Adjust if you're storing additional data
};
 */
export const authenticationService = {
  async validatedCredentialsToken({ credentials }) {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'authorisation');
    formData.append('user_name', credentials.userName);
    formData.append('password', credentials.password);
    const url = `${getAuthApiUrl()}token`;
    const { data } = await axios({
      method: 'post',
      url,
      data: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return data;
  },
  async logout() {
    const poolData = await getPoolData();
    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.signOut();
    }
/* 
    // Optionally clear any additional local session data if needed
    clearLocalSession();
   */
  }
};

