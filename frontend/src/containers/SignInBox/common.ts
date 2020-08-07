export interface IAuthResponse {
    data: {
        data: {
            accessToken: string;
            refreshToken: string;
            user: {
                id: string;
                email: string;
                username: string;
            };
        };
        error: string;
    }
}
