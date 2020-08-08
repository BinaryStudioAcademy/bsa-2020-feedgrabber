import axios from 'axios';
import {createTokenProvider} from '../security/tokenProvider';
import {history} from './history.helper';

//  axios instance for making network request with Auth header

const apiClient = axios.create();

const tokenService = createTokenProvider();

const responseErrorHandler = e => {
    const status = e.response.status;
    const originalRequest = e.config;

    if ((status !== 403) || (status === 403 && originalRequest._retry)) {
        history.push('/auth');
        return Promise.reject(e);
    }

    originalRequest._retry = true;

    console.log(tokenService.getRefreshToken());

    return apiClient.post('/api/auth/renovate', tokenService.getRefreshToken())
        .then(res => {
            if (res.status !== 201) {
                history.push('/auth');
                return Promise.reject(e);
            }

            tokenService.setToken(res.data.data);
            return apiClient.post('/api/user', tokenService.getToken());
        });
};

apiClient.interceptors.request.use(request => {
    request.headers.Authorization = `Bearer ${tokenService.getToken()}`;
    return request;
});

apiClient.interceptors.response.use(undefined, responseErrorHandler);

export default apiClient;
