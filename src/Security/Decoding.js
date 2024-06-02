import jwt from 'jsonwebtoken';

export function decodeJwt(token) {
    try {
        const decodedToken = jwt.decode(token.accessToken, { complete: true });
        if (!decodedToken) {
            throw new Error('Invalid token');
        }
        return decodedToken.payload;
    } catch (error) {
        console.error('Error decoding JWT token:', error.message);
        return null;
    }
}
