import { Router } from 'express';
import { Segments, celebrate, Joi } from "celebrate";
import PermissionsController from './permission.controller';
import middleware from '../../shared/middleware';
const route = Router();

export default (app: Router) => {
    const permissionsController = new PermissionsController();

    app.use(
        "/permissions",
        middleware.isAuth,
        middleware.attachAuth,
        middleware.errorAuth,
        route
    );

    route.get(
        '/',
        permissionsController.getPermissions
    );
    route.get(
        '/content_types',
        permissionsController.getPermissions
    );

    route.get(
        '/:id',
        permissionsController.getPermission
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
        permissionsController.filterPermissions
    );

    route.post(
        '/',
        celebrate(
            {
                [Segments.BODY]: Joi.object({
                    resource: Joi.string().required(),
                }),
            },
            { abortEarly: false }
        ),
        permissionsController.createPermission
    );

    route.put(
        '/:id',
        celebrate(
            {
                [Segments.BODY]: Joi.object({
                    resource: Joi.string().required(),
                    action: Joi.string().required(),
                    description: Joi.string().required(),
                }),
            },
            { abortEarly: false }
        ),
        permissionsController.updatePermission
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
        permissionsController.patchPermission
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
        permissionsController.deletePermission
    );
}

