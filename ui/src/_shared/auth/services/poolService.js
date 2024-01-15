
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const mode = import.meta.env.MODE;
const userPoolId = import.meta.env.VITE_USER_POOL_ID
const clientId = import.meta.env.VITE_CLIENT_ID

let userPool;

export async function initializeUserPool() {
    if (!userPool) {
        const poolData = await getPoolData();
        userPool = new CognitoUserPool(poolData);
    }
    return userPool; // return the initialized userPool
}

// Export userPool for direct access after initialization
export { userPool };
export async function getPoolData() {
    if (mode === 'development') {
        return {
            UserPoolId: userPoolId,
            ClientId: clientId,
        };
    } else if (mode === 'production') {
        const response = await fetch('https://7r37k29v44.execute-api.eu-west-1.amazonaws.com/dev/fetchSecrets');
        const data = await response.json();
        const secret = JSON.parse(data.secret);
        return {
            UserPoolId: secret.UserPoolId,
            ClientId: secret.UserPoolClientId,
        };
    } else {
        throw new Error('Unknown environment');
    }
}