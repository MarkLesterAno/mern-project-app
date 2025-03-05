import { Router } from 'express';
import { Segments, celebrate, Joi } from "celebrate";
import UserController from './user.controller';
import middleware from '../../shared/middleware';
const route = Router();

export default (app: Router) => {
    const controller = new UserController();

    app.use(
        "/users",
        middleware.isAuth,
        middleware.attachAuth,
        middleware.errorAuth,
        route
    );

    route.get(
        '/',
        controller.getUsers
    )

    route.get(
        '/user/:id',
        controller.getUser
    )

    route.get(
        '/search',
        celebrate(
            {
                [Segments.QUERY]: Joi.object({
                    filter: Joi.string(),
                    limit: Joi.number().integer().min(1).default(10),
                    page: Joi.number().integer().min(1).default(1)
                }),
            },
            { abortEarly: false }
        ),
        controller.filterUsers
    );

    route.post(
        '/',
        celebrate(
            {
                [Segments.BODY]: Joi.object({
                    email: Joi.string().required(),
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                    isActive: Joi.boolean().required(),
                    isStaff: Joi.boolean().required(),
                    isSuperuser: Joi.boolean().required(),
                    groups: Joi.string().required(),
                    permissions: Joi.object(),
                }),
            },
            { abortEarly: false }
        ),
        controller.createUser
    )
    route.put(
        '/:id',
        celebrate(
            {
                [Segments.BODY]: Joi.object({
                    email: Joi.string().required(),
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                    isActive: Joi.boolean().required(),
                    isStaff: Joi.boolean().required(),
                    isSuperuser: Joi.boolean().required(),
                    groups: Joi.string().required(),
                    permissions: Joi.object(),
                }),
            },
            { abortEarly: false }
        ),
        controller.updateUser
    )
    route.put(
        '/:id',
        celebrate(
            {
                [Segments.BODY]: Joi.object({
                    updateData: Joi.object(),
                }),
            },
            { abortEarly: false }
        ),
        controller.patchUser
    )
    /**
     * @param id: string, 
     */
    route.delete(
        '/:id',
        celebrate(
            {
                [Segments.BODY]: Joi.object({
                    id: Joi.string(),
                }),
            },
            { abortEarly: false }
        ),
        controller.deleteUser
    )
}

