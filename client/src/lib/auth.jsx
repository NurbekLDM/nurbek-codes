import jwt from 'jsonwebtoken';
import { parse } from 'cookie';


const JWT_SECRET = 'your-secret-key-for-access-token-1234567890!@#$%^&*';



if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
}

export function getToken(req) {
    if (req && req.headers && req.headers.cookie) {
        const cookies = parse(req.headers.cookie);
        return cookies.accessToken
    } else {
        return null;
    }
}

export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
}
