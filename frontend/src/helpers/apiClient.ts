import axios from 'axios';
import { createTokenProvider } from '../security/tokenProvider';
import { history } from './history.helper';

const apiClient = axios.create();

const tokenService = createTokenProvider();

const responseErrorHandler = e => {
    const originalRequest = e.config

    if (e.response.status === 401 && !originalRequest._retry) {

        originalRequest._retry = true

        return axios.post('/api/auth/renovate', {token: tokenService.getToken()})
            .then(res => {
                if (res.status === 201) {
                    tokenService.setToken(res.data)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data}`
                    return axios(originalRequest)
                }
                history.push('/login')
                return Promise.reject(e)
            })
    }
    return Promise.reject(e)
}

apiClient.interceptors.request.use(request => {
  request.headers.Authorization = `Bearer ${tokenService.getToken()}`;
  return request;
});

axios.interceptors.response.use(undefined, responseErrorHandler);

export default apiClient;
