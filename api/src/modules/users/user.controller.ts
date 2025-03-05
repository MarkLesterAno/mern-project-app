import { Request, Response, NextFunction } from "express";
import UserService from './user.service';
import { Container } from "typedi";


export default class UserController {

    getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.query;
            const userService = Container.get(UserService)
            const { count, users } = await userService.getUsers(
                query.limit,
                query.page
            );
            return res.json({ count, users });
        } catch (error) {
            next(error);
        }
    }

    getUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const _id = req.params.id;
            const userService = Container.get(UserService)
            const { user, error } = await userService.getUser(_id);
            return res.json(user ? user : error);
        } catch (error) {
            next(error);
        }
    }

    filterUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.query;
            const userService = Container.get(UserService)
            const { count, users } = await userService.filterUsers(
                query.filter,
                query.limit,
                query.page,
            );
            return res.json({ count, users });
        } catch (error) {
            next(error);
        }
    }

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userService = Container.get(UserService)

            const params = req.body;
            const { new_user, error } = await userService.createUser(
                params.email,
                params.username,
                params.password,
                params.isActive,
                params.isStaff,
                params.isSuperuser,
                params.groups,
                params.permissions
            );
            return res.json(new_user ? new_user : error);
        } catch (error) {
            next(error);
        }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userService = Container.get(UserService)

            const params = req.body;
            const _id = req.params.id;
            const { user, error } = await userService.updateUser(
                _id,
                params.email,
                params.username,
                params.password,
                params.isActive,
                params.isStaff,
                params.isSuperuser,
                params.groups,
                params.permissions
            );
            return res.json(user ? user : error);
        } catch (error) {
            next(error);
        }
    }
    patchUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userService = Container.get(UserService)
            const params = req.body;
            const _id = req.params.id;
            const { user, error } = await userService.patchUser(
                _id,
                params.updateData,
            );
            return res.json(user ? user : error);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @param _id: string, 
     */
    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userService = Container.get(UserService)

            const _id = req.params.id;
            const { user, error } = await userService.deleteUser(
                _id,
            );
            return res.json(user ? user : error);
        } catch (error) {
            next(error);
        }
    }

}