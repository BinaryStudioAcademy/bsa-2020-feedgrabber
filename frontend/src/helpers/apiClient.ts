import axios from 'axios';
import {TokenRefreshRequest, useAuthTokenInterceptor} from 'axios-jwt';

const apiClient = axios.create()

const requestRefresh: TokenRefreshRequest = async (
    refreshToken: string
): Promise<string> => {
    const response = await axios.post('/api/auth/renovate', { token: refreshToken })
    return response.data.access_token
}

useAuthTokenInterceptor(apiClient, {requestRefresh})

export default apiClient
