import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { getPoolData } from './poolService.js';

let userPool;

async function initializeUserPool() {
    if (!userPool) {
        const poolData = await getPoolData();
        userPool = new CognitoUserPool(poolData);
    }
    return userPool;
}

const getCurrentUser = () => {
    if (!userPool) throw new Error("UserPool is not initialized yet.");
    return userPool.getCurrentUser();
};

let cachedToken = null;
let tokenExpiry = null;

const getUserToken = async () => {
    const now = new Date();

    // If we have a cached token and it's not expired, return it.
    if (cachedToken && tokenExpiry && now < tokenExpiry) {
        return cachedToken;
    }

    await initializeUserPool();
    const cognitoUser = getCurrentUser();

    if (!cognitoUser) return null;

    return new Promise((resolve, reject) => {
        cognitoUser.getSession((err, session) => {
            if (err) {
                reject(err);
                return;
            }
            const idToken = session.getIdToken().getJwtToken();

            // Cache the token
            cachedToken = idToken;
            // Set the token expiry. This example assumes the token is valid for 1 hour.
            tokenExpiry = new Date(now.getTime() + 60 * 60 * 1000);

            resolve(idToken);
        });
    });
};

const decodeJWT = (jwtToken) => {
    const base64Url = jwtToken.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

const getUserGroups = async () => {
    const token = await getUserToken();
    if (!token) return [];

    const decodedToken = decodeJWT(token);
    return decodedToken['cognito:groups'] || [];
};

/* 
Token Lifetime: You need to be aware of the token's actual lifetime. The example above assumes the token lasts for 1 hour. If your JWT token contains the expiration (exp) claim, you can use it to set the actual expiry time instead of assuming a fixed period.
Concurrency: If you have multiple concurrent requests, there's a slight chance they could all end up fetching their own tokens. A more advanced token caching mechanism would handle this by ensuring only one request fetches the token at a time.
Storage: Instead of caching the token in memory (as shown above), you might consider using localStorage or sessionStorage for a more persistent cache across browser sessions. Just remember to clear the storage when the user logs out.
*/
export {
    getCurrentUser,
    getUserToken,
    getUserGroups,
    initializeUserPool,
    decodeJWT
};