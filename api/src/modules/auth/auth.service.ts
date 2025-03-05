import { Service, Inject } from "typedi";
import jwt from 'jsonwebtoken';
import config from "../../config";
import argon2 from 'argon2'
import ErrorHelper from "../../shared/helpers/error.helper";
import JWTHelper from "../../shared/helpers/jwt.helper";
import EmailHelper from "../../shared/helpers/mail.helper";
import EmailUtils from "../../shared/utils/EmailUtils";


@Service()
export default class AuthService {
    constructor(
        @Inject("userModel") protected userModel: Models.UserModel,
        @Inject("groupModel") protected groupModel: Models.GroupModel,
        @Inject("permissionModel") protected permissionModel: Models.PermissionModel,
    ) { }

    public async initiateSignUp(email: string): Promise<any> {
        try {
            const mail = new EmailHelper()
            const token = JWTHelper.generateInviteToken(email)
            const payload = {
                email,
                token: token
            }
            const { mail_options } = EmailUtils.__render({
                type: 'sign-up',
                payload
            })
            await mail.sendEmail(mail_options)
        } catch (error) {
            return { error }
        }
    }

    public async completeSignUp(
        username: string,
        email: string,
        password: string,
        token: string
    ): Promise<any> {
        try {
            JWTHelper.verify(token)

            const users: any = await this.userModel.find({
                $or: [
                    { email: { $regex: `.*${email}.*`, $options: 'i' } },
                    { username: { $regex: `.*${username}.*`, $options: 'i' } },
                ]
            })

            if (users && users.length > 0) {
                const error = ErrorHelper.formatError('Username or Email has already exist.', 409);
                return { error };
            }

            await this.userModel.create({
                email: email,
                username: username,
                password: await argon2.hash(password),
                isActive: true,
                isStaff: false,
                isSuperuser: false
            })
        } catch (error) {
            return { error }
        }
    }

    /**
 * Initiate the password reset process.
 * @param email - The email address of the user requesting the password reset.
 */
    public async initiatePasswordReset(email: string): Promise<any> {
        try {
            const user: any = await this.userModel.findOne({ email });

            if (!user) {
                const error = ErrorHelper.formatError('User not found.', 409);
                return { error };
            }

            const token = JWTHelper.generateResetToken(email)
            const payload = {
                email,
                token: token
            }
            const mail = new EmailHelper()

            const { mail_options } = EmailUtils.__render({
                type: 'reset-password',
                payload,
            })

            await mail.sendEmail(mail_options)

        } catch (error) {
            return { error }
        }
    }
    public async completePasswordReset(resetToken: string, newPassword: string): Promise<any> {
        try {
            JWTHelper.verify(resetToken)
            const decodedToken: any = JWTHelper.decode(resetToken);
            const user: any = await this.userModel.findOne({ email: decodedToken.email });
            console.log(user, decodedToken.email)

            if (!user) {
                const error = ErrorHelper.formatError('Invalid reset token.', 409);
                return { error };
            }

            user.password = await argon2.hash(newPassword);
            await user.save();
        } catch (error) {
            return { error }
        }
    }

    public async login(username: any, password: any): Promise<any> {
        try {
            const user: any = await this.userModel.findOne({
                $or: [
                    { email: { $regex: `.*${username}.*`, $options: 'i' } },
                    { username: { $regex: `.*${username}.*`, $options: 'i' } },
                ]
            })
            if (!user) {
                const error = ErrorHelper.formatError('Invalid Username or Email', 401);
                return { error };
            }
            const isPasswordValid = await argon2.verify(user.password, password);
            if (!isPasswordValid) {
                const error = ErrorHelper.formatError('Invalid Password', 401);
                return { error };
            }
            const access_token = JWTHelper.generateAccessToken(user.id);
            const refresh_token = JWTHelper.generateRefreshToken(user.id);

            jwt.sign(user.id as string, config.SECRET)
            return { access_token, refresh_token }
        } catch (error) {
            console.log(error)
        }
    }

    public async getCurrentUser(id: any): Promise<any> {
        try {
            const user: any = await this.userModel.findOne({ _id: id })
            if (!user) {
                const error = ErrorHelper.formatError('Invalid Username or Email', 401);
                return { error };
            }
            const _user = user.toObject();
            Reflect.deleteProperty(_user, 'password');
            Reflect.deleteProperty(_user, 'groups');
            Reflect.deleteProperty(_user, 'permissions');
            return { user: _user };
        } catch (error) {
            console.log(error);
        }
    }

    public async getUserPermissions(id: any): Promise<any> {
        try {
            const user: any = await this.userModel.findOne({ _id: id })
            switch (user) {
                case !user:
                    const error = ErrorHelper.formatError('User not found', 404);
                    return { error };
                default:
                    if (user.isActive && user.isSuperuser) {
                        const permissions: any = await this.permissionModel.find({})
                        const permissionsData = permissions.map((permission: any) => {
                            return {
                                name: permission.name,
                                description: permission.description
                            }
                        })
                        return { permissions: permissionsData }
                    } else {
                        let permissions: any = []
                        user.groups.map((group: any) => {
                            const permissionsData = group.permissions.map((permission: any) => {
                                return {
                                    name: permission.name,
                                    description: permission.description
                                }
                            })
                            permissions.push(permissionsData)
                        })
                        return { permissions }
                    }
            }
        } catch (error) {
            console.log(error);
        }
    }

    public async logout(access_token: string): Promise<void> {
        try {
            const decodedToken: any = JWTHelper.decode(access_token);
            console.log(access_token)
            // Extract user information from the decoded token
            const user = {
                id: decodedToken.id,
                email: decodedToken.email,
                name: decodedToken.name
            };
            const result: any = await this.userModel.findById(user.id);

            result.refresh_token = null;
            await result.save();
        } catch (error) {
            throw error
        }
    }
}