import { Container } from 'typedi';
import UserService from '../../modules/users/user.service';
const attachAuth = async (req: any, res: any, next: any) => {
    try {
        const UserModel = Container.get(UserService)
        const { user } = await UserModel.getUser(req.access_token.id);
        req.userSession = { ...user };
        return next();
    } catch (e) {
        return next(e);
    }
};

export default attachAuth;