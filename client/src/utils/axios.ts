import axios from "axios";

export const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/`;
export const cancelTokenSource = axios.CancelToken.source();
export const getToken = () => localStorage.getItem('accessToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');

const Axios = axios.create({
    baseURL: API_URL,
    timeout: 9000,
    cancelToken: cancelTokenSource.token
});

Axios.interceptors.request.use(request => {
    if (request.url && request.url.includes('auth')) {
        return request 
    } else if (getToken() && request.headers) {
        request.headers['Authorization'] = `Bearer ${getToken()}`
        return request
    } else {
        cancelTokenSource.cancel()
    }
}, error => {
    return Promise.reject(error)
})

Axios.interceptors.response.use(response => {
    return response
}, err => {
    return new Promise((resolve, reject) => {
        const originalReq = err.config;
        if (err.response !== undefined) {
            //To stop the refresh token from being sent when logging in
            if (getRefreshToken() != null) {
                if (err.response.status === 401 && err.config) {
                    let res = fetch(`${API_URL}auth/refresh-tokens`, {
                        method: 'POST',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json',
                            'Token': `${getToken()}`
                        },
                        redirect: 'follow',
                        referrer: 'no-referrer',
                        body: JSON.stringify({
                            refreshToken: `${getRefreshToken()}`
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
});

export const fetcher = (url: string) => Axios.get(url).then(res => res.data);

export default Axios;