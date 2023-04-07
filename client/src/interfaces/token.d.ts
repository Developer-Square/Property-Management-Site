export interface ITokenPayload {
    token: string;
    expires: string;
}

export interface AccessAndRefreshTokens {
    access: ITokenPayload;
    refresh: ITokenPayload;
}