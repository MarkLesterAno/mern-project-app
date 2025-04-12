import { Router } from "express";
import userRoute from '../modules/users/user.routes';
import authRoute from '../modules/auth/auth.routes';
import groupRoute from '../modules/groups/group.routes';
import permissionRoute from '../modules/permissions/permission.routes';


export default () => {
    const app = Router();

    authRoute(app);
    userRoute(app);
    userRoute(app);
    groupRoute(app);
    permissionRoute(app);

    return app;
};
