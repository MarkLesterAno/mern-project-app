import { Request, Response, NextFunction } from "express";
import PermissionsService from './permission.service';
import { Container } from "typedi";

export default class PermissionsController {

    getPermissions = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const permissionsService = Container.get(PermissionsService);
            const { count, permissions } = await permissionsService.getPermissions();
            return res.json({ count, permissions });
        } catch (error) {
            next(error);
        }
    }
    getContentTypes = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const permissionsService = Container.get(PermissionsService);
            const { default_content_types } = await permissionsService.getContentTypes();
            return res.json({ default_content_types });
        } catch (error) {
            next(error);
        }
    }

    getPermission = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const _id = req.params.id;
            const permissionsService = Container.get(PermissionsService);
            const { permission, error } = await permissionsService.getPermission(_id);
            return res.json(permission ? permission : error);
        } catch (error) {
            next(error);
        }
    }

    filterPermissions = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.query;
            const permissionsService = Container.get(PermissionsService);
            const { count, permissions } = await permissionsService.filterPermissions(
                query.filter,
            );
            return res.json({ count, permissions });
        } catch (error) {
            next(error);
        }
    }

    createPermission = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const permissionsService = Container.get(PermissionsService);
            const params = req.body;
            const { new_permission, error } = await permissionsService.createPermission(
                params.name,
                params.description,
                params.content_type
            );
            return res.json(new_permission ? new_permission : error);
        } catch (error) {
            next(error);
        }
    }

    updatePermission = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const permissionsService = Container.get(PermissionsService);
            const params = req.body;
            const _id = req.params.id;
            const { permission, error } = await permissionsService.updatePermission(
                _id,
                params.name,
                params.description,
                params.content_type
            );
            return res.json(permission ? permission : error);
        } catch (error) {
            next(error);
        }
    }

    patchPermission = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const permissionsService = Container.get(PermissionsService);
            const params = req.body;
            const _id = req.params.id;
            const { permission, error } = await permissionsService.patchPermission(
                _id,
                params.updateData,
            );
            return res.json(permission ? permission : error);
        } catch (error) {
            next(error);
        }
    }

    deletePermission = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const permissionsService = Container.get(PermissionsService);
            const _id = req.params.id;
            const { permission, error } = await permissionsService.deletePermission(
                _id,
            );
            return res.json(permission ? permission : error);
        } catch (error) {
            next(error);
        }
    }
}