import { Router } from 'express';
import { Segments, celebrate, Joi } from "celebrate";
import GroupController from './group.controller';
import middleware from '../../shared/middleware';
const route = Router();

export default (app: Router) => {
    const groupController = new GroupController();

    app.use(
        "/groups",
        middleware.isAuth,
        middleware.attachAuth,
        middleware.errorAuth,
        route
    );

    route.get(
        '/',
        groupController.getGroups
    );

    route.get(
        '/group/:id',
        groupController.getGroup
    );

    route.get(
        '/search',
        celebrate(
            {
                [Segments.QUERY]: Joi.object({
                    filter: Joi.string(),
                }),
            },
            { abortEarly: false }
        ),
        groupController.filterGroups
    );

    route.post(
        '/',
        celebrate(
            {
                [Segments.BODY]: Joi.object({
                    name: Joi.string().required(),
                    permissions: Joi.array().items(Joi.string()).required(),
                }),
            },
            { abortEarly: false }
        ),
        groupController.createGroup
    );

    route.put(
        '/:id',
        celebrate(
            {
                [Segments.BODY]: Joi.object({
                    name: Joi.string().required(),
                    permissions: Joi.array().items(Joi.string()).required(),
                }),
            },
            { abortEarly: false }
        ),
        groupController.updateGroup
    );

    route.patch(
        '/:id',
        celebrate(
            {
                [Segments.BODY]: Joi.object({
                    updateData: Joi.object().required(),
                }),
            },
            { abortEarly: false }
        ),
        groupController.patchGroup
    );

    route.delete(
        '/:id',
        celebrate(
            {
                [Segments.PARAMS]: Joi.object({
                    id: Joi.string().required(),
                }),
            },
            { abortEarly: false }
        ),
        groupController.deleteGroup
    );
}

