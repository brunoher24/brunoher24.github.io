import { sign, verify } from 'jsonwebtoken';

const PRIVATE_KEY = 'zRnAEsn09J9tQRlcXucF0V1R5D34K0YB16QZouCSwuo';

/**
 * @param {Object} data 
 */
export function encode(data) {
    return sign(data, PRIVATE_KEY);
}

/**
 * @param {string} token 
 */
export function decode(token) {
    return verify(token, PRIVATE_KEY);
}