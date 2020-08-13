import axios from 'axios';
import tokenProvider from '../security/tokenProvider';
import {history} from './history.helper';

//  axios instance for making network request with Auth header

const apiClient = axios.create();

const responseErrorHandler = e => {
    const status = e.response.status;
    const originalRequest = e.config;

    if ((status !== 403) || (status === 403 && originalRequest._retry)) {
        if (status === 403) {
            // redirect to /auth only if user are not logged (forbidden response status)
            history.push('/auth');
        }
        return Promise.reject(e);
    }

    originalRequest._retry = true;

    return apiClient.post('/api/auth/renovate', tokenProvider.getRefreshToken())
        .then(res => {
            if (res.status !== 201) {
                history.push('/auth');
                return Promise.reject(e);
            }

            tokenProvider.setToken(res.data.data);
            return apiClient(originalRequest);
        });
};

apiClient.interceptors.request.use(request => {
    const token = tokenProvider.getToken();
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

apiClient.interceptors.response.use(undefined, responseErrorHandler);

export default apiClient;
