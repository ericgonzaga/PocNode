import * as jwt from 'jsonwebtoken';

export const JWT_SECRET_NOT_FOUND_ERROR = 'JWT_SECRET_NOT_FOUND'
export const INVALID_TOKEN_ERROR = 'INVALID_TOKEN';

interface IJwtData {
    uid: number;
}

export const sign = (data: IJwtData) => {
    if (!process.env.JWT_SECRET) return JWT_SECRET_NOT_FOUND_ERROR;

    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });
};

export const verify = (token: string) => {
    if (!process.env.JWT_SECRET) return JWT_SECRET_NOT_FOUND_ERROR;

    try {
        return (jwt.verify(token, process.env.JWT_SECRET)) as IJwtData;
    } catch(error) {
        return INVALID_TOKEN_ERROR;
    }
};