import { Router } from 'express';
import { Segments, celebrate, Joi } from "celebrate";
import AuthController from './auth.controller';
import middleware from '../../shared/middleware';
const route = Router();

export default (app: Router) => {
    const controller = new AuthController()

    app.use(
        "/auth",
        route
    );

    /**
    * @param username: number, 
    * @param password: number, 
    */

    route.post(
        '/login',
        celebrate(
            {
                [Segments.BODY]: Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                }),
            },
            { abortEarly: false }
        ),
        controller.login
    )
    route.post(
        '/invite',
        celebrate(
            {
                [Segments.BODY]: Joi.object({
                    email: Joi.string().required(),
                }),
            },
            { abortEarly: false }
        ),
        controller.initialSignUp
    )
    route.post(
        '/invite/:token',
        celebrate(
            {
                [Segments.BODY]: Joi.object({
                    email: Joi.string().required(),
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                }),
            },
            { abortEarly: false }
        ),
        controller.completeSignUp
    )

    route.post(
        '/reset',
        celebrate(
            {
                [Segments.BODY]: Joi.object({
                    email: Joi.string().required(),
                }),
            },
            { abortEarly: false }
        ),
        controller.initiatePasswordReset
    )
    route.post(
        '/reset/:reset_token',
        celebrate(
            {
                [Segments.BODY]: Joi.object({
                    new_password: Joi.string().required(),
                }),
            },
            { abortEarly: false }
        ),
        controller.complete_password_reset
    )
    app.use("/auth/me", middleware.isAuth, middleware.attachAuth, middleware.errorAuth, route);
    route.get('/', controller.getCurrentUser);
    route.get('/permissions', controller.getUserPermissions);

}