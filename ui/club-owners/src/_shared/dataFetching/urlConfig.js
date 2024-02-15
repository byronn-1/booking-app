const MSW = import.meta.env.VITE_APP_MSW
const appAuthApiUrl = import.meta.env.VITE_APP_AUTH_API_URL
const appApiUrl = import.meta.env.VITE_APP_API_URL
const mode = import.meta.env.MODE


export const getAuthApiUrl = () => {
  const localAuthApi = 'http://localhost:3000/auth/';

  if (mode === 'development' && MSW === 'on') return localAuthApi;

  if (mode === 'production' || mode === "staging") {
    return appAuthApiUrl;
  }

  return localAuthApi;
};

export const getApiUrl = () => {
  const locaApiUrl = 'http://localhost:3000/';

  if (mode === 'development' && MSW === 'on') return locaApiUrl;

  if (mode === 'production' || mode === "staging") {
    return appApiUrl;
  }

  return locaApiUrl;
};
