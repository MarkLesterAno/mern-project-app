import { Request, Response, NextFunction } from "express";
import GroupService from './group.service';
import { Container } from "typedi";


export default class GroupController {

    getGroups = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.query;
            const groupService = Container.get(GroupService);
            const { count, groups } = await groupService.getGroups();
            return res.json({ count, groups });
        } catch (error) {
            next(error);
        }
    }

    getGroup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const _id = req.params.id;
            const groupService = Container.get(GroupService);
            const { group, error } = await groupService.getGroup(_id);
            return res.json(group ? group : error);
        } catch (error) {
            next(error);
        }
    }

    filterGroups = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.query;
            const groupService = Container.get(GroupService);
            const { count, groups } = await groupService.filterGroups(
                query.filter,
            );
            return res.json({ count, groups });
        } catch (error) {
            next(error);
        }
    }

    createGroup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const groupService = Container.get(GroupService);

            const params = req.body;
            const { new_group, error } = await groupService.createGroup(
                params.name,
                params.permissions
            );
            return res.json(new_group ? new_group : error);
        } catch (error) {
            next(error);
        }
    }

    updateGroup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const groupService = Container.get(GroupService);

            const params = req.body;
            const _id = req.params.id;
            const { group, error } = await groupService.updateGroup(
                _id,
                params.name,
                params.permissions
            );
            return res.json(group ? group : error);
        } catch (error) {
            next(error);
        }
    }

    patchGroup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const groupService = Container.get(GroupService);
            const params = req.body;
            const _id = req.params.id;
            const { group, error } = await groupService.patchGroup(
                _id,
                params.updateData,
            );
            return res.json(group ? group : error);
        } catch (error) {
            next(error);
        }
    }

    deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const groupService = Container.get(GroupService);

            const _id = req.params.id;
            const { group, error } = await groupService.deleteGroup(
                _id,
            );
            return res.json(group ? group : error);
        } catch (error) {
            next(error);
        }
    }
}