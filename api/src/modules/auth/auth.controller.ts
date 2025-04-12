import { Request, Response, NextFunction } from "express";
import AuthService from "./auth.service";
import { Container } from "typedi";


export default class AuthController {

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = req.body;
            const authService = Container.get(AuthService)
            const { access_token, refresh_token, error } = await authService.login(
                params.username,
                params.password
            );
            return !error ? res.json({ access_token, refresh_token })
                : res.status(401).json({ error });
        } catch (error) {
            res.status(504).json({ error })
        }
    }

    getCurrentUser = async (req: any, res: Response, next: NextFunction) => {
        try {
            const params = req.access_token;
            const authService = Container.get(AuthService)
            const { user, error } = await authService.getCurrentUser(
                params.id
            );
            return !error ? res.json({ user }) : next(error);
        } catch (error) {
            console.log(error)
        }
    }

    getUserPermissions = async (req: any, res: Response, next: NextFunction) => {
        try {
            const params = req.access_token;
            const authService = Container.get(AuthService)
            const { permissions, error } = await authService.getUserPermissions(
                params.id
            );
            return !error ? res.json({ permissions }) : next(error);
        } catch (error) {
            console.log(error)
        }
    }

    initialSignUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = req.body;
            const authService = Container.get(AuthService)
            await authService.initiateSignUp(params.email);
            return res.status(200).json({ message: 'Invitation sent to your email.' })
        } catch (error) {
            console.log(error)
        }
    }
    completeSignUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;
            const params = req.params;
            const authService = Container.get(AuthService)
            await authService.completeSignUp(
                body.username,
                body.email,
                body.password,
                params.token
            );
            return res.json({ message: 'Sign Up successful.' })
        } catch (error) {
            console.log(error)
        }
    }

    initiatePasswordReset = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = req.body;
            const authService = Container.get(AuthService)
            await authService.initiatePasswordReset(params.email);
            return res.json({ message: 'Reset password request sent to your email.' })
        } catch (error) {
            console.log(error)
        }
    }

    complete_password_reset = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { params, body } = req;
            const authService = Container.get(AuthService)
            await authService.completePasswordReset(params.reset_token, body.new_password);
            return res.json({ message: 'Password reset successful.' })
        } catch (error) {
            next(error);
        }
    }
}
