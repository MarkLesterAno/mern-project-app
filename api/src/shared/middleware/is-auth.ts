import { expressjwt } from 'express-jwt';
import config from '../../config';

const getRequestToken = (req: any) => {
    const authorization = req.headers.authorization;
    return authorization && (authorization.startsWith('Bearer ') || authorization.startsWith('Token ')) ?
        authorization.split(' ')[1]: null
};

const isAuth = expressjwt({
    secret: config.SECRET,
    algorithms: ['HS256'],
    requestProperty: 'access_token',
    getToken: getRequestToken,
});

export default isAuth;

