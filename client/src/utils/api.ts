import axios, { AxiosInstance } from 'axios';

export const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/`;

export const cancelTokenSource = axios.CancelToken.source()
class Api {
    private instance: AxiosInstance;
    constructor() {
        this.instance =  axios.create({
            baseURL: API_URL,
            timeout: 9000,
            cancelToken: cancelTokenSource.token
        })

        // Also Check whether there's a token before sending a request
        this.instance.interceptors.request.use(request => {
            if (request.url && request.url.includes('auth')) {
                return request 
            } else if (this.getToken() && request.headers) {
                request.headers['Authorization'] = `Bearer ${this.getToken()}`
                return request
            } else {
                cancelTokenSource.cancel()
            }
        }, error => {
            return Promise.reject(error)
        })

        //Intercepting the response, if its okay then do nothing but if there's a 401
        //then resend it.
        this.instance.interceptors.response.use(response => {
            return response
        }, err => {
            return new Promise((resolve, reject) => {
                const originalReq = err.config;
                if (err.response !== undefined) {
                    //To stop the refresh token from being sent when logging in
                    if (this.getRefreshToken() != null) {
                        if (err.response.status === 401 && err.config) {
                            let res = fetch(`${API_URL}auth/refresh-tokens`, {
                                method: 'POST',
                                mode: 'cors',
                                cache: 'no-cache',
                                credentials: 'same-origin',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Token': `${this.getToken()}`
                                },
                                redirect: 'follow',
                                referrer: 'no-referrer',
                                body: JSON.stringify({
                                    refreshToken: `${this.getRefreshToken()}`
                                }),
                            }).then(res => res.json())
                            .then(res => {
                                localStorage.setItem('accessToken', res.access.token);
                                localStorage.setItem('refreshToken', res.refresh.token);
                                localStorage.setItem('refreshTokenExpires', res.refresh.expires)

                                originalReq.headers['Authorization'] = `Bearer ${res.access.token}`

                                return axios(originalReq)
                            })
                            resolve(res)
                            //If the response is 404 or 400 then just return the error
                            //It will be displayed in a pop up notification
                        } else if(err.response.status === 404 || err.response.status === 400) {
                            reject(err)
                        }
                    } else {
                        reject(err)
                    }
            }
                return Promise.reject(err)
            })
        })
    }

    getToken() {
        return localStorage.getItem('accessToken')
    }

    getRefreshToken() {
        return localStorage.getItem('refreshToken')
    }

    getParam(query: string) {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get(query)
    }

    getUrl(lengthBeforeToken: number) {
        const urlHash = window.location.hash
        let params = urlHash.substr(lengthBeforeToken).split('&').reduce(function (res: any, item) {
            var parts = item.split('=');
            res[parts[0]] = parts[1];
            return res;
        }, {});
        return params.token
    }

    auth() {
        return {
            login: (data: any) => this.instance.post(`auth/login/`, data),
            logout: (data: any) => this.instance.post(`auth/logout/`, data),
            registerUser: (data: any) => this.instance.post(`auth/register/`, data),
            forgotPassword: (data: any) => this.instance.post(`auth/forgot-password/`, data),
            resetPassword: (data: any) => this.instance({
                method: 'POST',
                url: 'auth/reset-password/',
                params: {
                    token: `${this.getUrl(17)}`
                },
                data,
            }),
            verifyEmail: () => this.instance({
                method: 'POST',
                url: 'auth/verify-email/',
                params: {
                    token: `${this.getUrl(15)}`
                },
            }),
        }
    }

    VerificationEmail() {
        if (this.getToken()){
            return {
                send: () => this.instance.post(`/auth/send-verification-email`),
            }
        }
    }

    User() {
        if (this.getToken()) {
            return {
                getUser: (id: string) => this.instance.get(`users/${id}`),
                getAllUsers: () => this.instance({
                    method: 'GET',
                    url: 'users/',
                }),
                createUser: (data: any) => this.instance.post(`users/`, data),
                updateUser: (id: string, data: any) => this.instance.patch(`users/${id}`, data),
                deleteUser: (id: string) => this.instance.delete(`users/${id}`),
            }
        }
    }

    Message() {
        if (this.getToken()) {
            return {
                getMessage: (id: string) => this.instance.get(`messages/${id}`),
                getAllMessages: () => this.instance({
                    method: 'GET',
                    url: 'messages/',
                }),
                createMessage: (data: any) => this.instance.post(`messages/`, data),
                updateMessage: (id: string, data: any) => this.instance.patch(`messages/${id}`, data),
                deleteMessage: (id: string) => this.instance.delete(`messages/${id}`),
            }
        }
    }
}

export default Api;
