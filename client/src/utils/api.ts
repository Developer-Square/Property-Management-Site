import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/`;

export const cancelTokenSource = axios.CancelToken.source();
class Api {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,
      timeout: 15000,
      cancelToken: cancelTokenSource.token,
    });

    this.instance.interceptors.request.use((request: AxiosRequestConfig) => {
      const token = localStorage.getItem('accessToken');
      if (request.headers) {
        request.headers['Authorization'] = `Bearer ${token}`;
      } else {
        request.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
      return request;
    });

    // Refresh the token when it expires so that users don't receive 401 errors
    // while they are using the dashboard.
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          console.log('error', err);
          const originalReq = err.config;
          if (err.response !== undefined) {
            // To stop the refresh token from being sent when logging in
            if (
              this.getRefreshToken() !== null &&
              err.response.status === 401 &&
              err.config
            ) {
              let res = fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/refresh-tokens`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.getToken()}`,
                  },
                  body: JSON.stringify({
                    refreshToken: `${this.getRefreshToken()}`,
                  }),
                }
              )
                .then((res) => res.json())
                .then((res) => {
                  this.storeTokens(res);
                  originalReq.headers[
                    'Authorization'
                  ] = `Bearer ${res.tokens.access.token}`;

                  return axios(originalReq);
                });
              resolve(res);
              // If the response is 404 or 400 then just return the error
              // It will be displayed in a pop up notification
            } else if (
              err.response.status === 404 ||
              err.response.status === 400
            ) {
              reject(err);
            }
          }
          return Promise.reject(err);
        });
      }
    );
  }

  // The following two methods(addAuthorizationHeader and refreshTokens) are for the axios instance in app.tsx.
  // We've two instances of axios in the app, one for refine to carry out it's under the hood requests in app.tsx and one for us to make requests to our backend.
  addAuthorizationHeader(axiosInstance: AxiosInstance) {
    axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
      const token = localStorage.getItem('accessToken');
      if (request.headers) {
        request.headers['Authorization'] = `Bearer ${token}`;
      } else {
        request.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
      return request;
    });
  }

  refreshTokens(axiosInstance: AxiosInstance) {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          console.log('error', err);
          const originalReq = err.config;
          if (err.response !== undefined) {
            // To stop the refresh token from being sent when logging in
            if (
              this.getRefreshToken() !== null &&
              err.response.status === 401 &&
              err.config
            ) {
              let res = fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/refresh-tokens`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.getToken()}`,
                  },
                  body: JSON.stringify({
                    refreshToken: `${this.getRefreshToken()}`,
                  }),
                }
              )
                .then((res) => res.json())
                .then((res) => {
                  this.storeTokens(res);
                  originalReq.headers[
                    'Authorization'
                  ] = `Bearer ${res.tokens.access.token}`;

                  return axios(originalReq);
                });
              resolve(res);
              // If the response is 404 or 400 then just return the error
              // It will be displayed in a pop up notification
            } else if (
              err.response.status === 404 ||
              err.response.status === 400
            ) {
              reject(err);
            }
          }
          return Promise.reject(err);
        });
      }
    );
  }

  storeTokens(userWithTokens: any) {
    const accessToken = userWithTokens.tokens.access.token;
    const refreshToken = userWithTokens.tokens.refresh.token;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem(
      'accessTokenExpires',
      userWithTokens.tokens.access.expires
    );
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...userWithTokens.user,
        userid: userWithTokens.user._id,
      })
    );
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  getParam() {
    return window.location.search.split('=')[1];
  }

  auth() {
    return {
      login: (data: any) => this.instance.post(`auth/login/`, data),
      logout: (data: any) => this.instance.post(`auth/logout/`, data),
      registerUser: (data: any) => this.instance.post(`auth/register/`, data),
      forgotPassword: (data: any) =>
        this.instance.post(`auth/forgot-password/`, data),
      resetPassword: (data: any) =>
        this.instance({
          method: 'POST',
          url: 'auth/reset-password/',
          params: {
            token: `${this.getParam()}`,
          },
          data,
        }),
      sendVerificationEmail: () =>
        this.instance.post(`auth/send-verification-email/`),
      verifyEmail: () =>
        this.instance({
          method: 'POST',
          url: 'auth/verify-email/',
          params: {
            token: `${this.getParam()}`,
          },
        }),
    };
  }

  User() {
    if (this.getToken()) {
      return {
        getUser: (id: string) => this.instance.get(`users/${id}`),
        getAllUsers: () =>
          this.instance({
            method: 'GET',
            url: 'users/',
          }),
        createUser: (data: any) => this.instance.post(`users/`, data),
        updateUser: (id: string, data: any) =>
          this.instance.patch(`users/${id}`, data),
        deleteUser: (id: string) => this.instance.delete(`users/${id}`),
      };
    }
  }
}

export default Api;
