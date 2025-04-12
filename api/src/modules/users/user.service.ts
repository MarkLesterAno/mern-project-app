import { Service, Inject } from "typedi";
import PaginationUtils from "../../shared/utils/PaginationUtils";
import argon2 from 'argon2'
import mongoose from "mongoose";
import ErrorHelper from "../../shared/helpers/error.helper";

@Service()
export default class UserService {

    constructor(
        @Inject("userModel") protected userModel: Models.UserModel,

    ) { }

    /**
    * @service
    * GET       /users?limit=10&page=1 - getUsers
    * GET       /users/:id - getUser
    * GET       /users?filter=&limit=10&page=1 - filterUsers
    * POST      /users - createUsers
    * PUT|PATCH /users/:id - updateUsers
    * DELETE    /users/:id - deleteUser
    */

    /**
    * @param limit 
    * @param page 
    */
    public async getUsers(limit: any, page: any): Promise<any> {
        try {
            const { pageSize, skip } = PaginationUtils.setPagination(limit, page)
            const [count, users] = await Promise.all([
                await this.userModel.find({}).countDocuments({}),
                await this.userModel.find({})
                    .limit(pageSize)
                    .skip(skip)
            ])
            return { count, users };
        } catch (error) {
            throw error
        }
    }

    /**
    * @param filter 
    * @param limit 
    * @param page
    */
    public async filterUsers(filter: any, limit: any, page: any): Promise<any> {
        try {
            const { pageSize, skip } = PaginationUtils.setPagination(limit, page)
            const [count, users] = await Promise.all([
                await this.userModel.find({
                    $or: [
                        { email: { $regex: `.*${filter}.*`, $options: 'i' } },
                        { username: { $regex: `.*${filter}.*`, $options: 'i' } },
                    ]
                }).countDocuments({}),
                await this.userModel.find({
                    $or: [
                        { email: { $regex: `.*${filter}.*`, $options: 'i' } },
                        { username: { $regex: `.*${filter}.*`, $options: 'i' } },
                    ]
                })
                    .select('_id email username isActive isStaff isSuperuser groups permissions')
                    .limit(pageSize)
                    .skip(skip)
            ])
            return { count, users };
        } catch (error) {
            throw error
        }
    }

    /**
    * @param _id 
    */
    public async getUser(_id: any): Promise<any> {
        try {
            const user = await this.userModel.findOne({ _id: new mongoose.Types.ObjectId(_id) })
            if (!user) {
                const error = ErrorHelper.formatError('User not found.', 409);
                return { error };
            }
            return { user };
        } catch (error) {
            throw error
        }
    }

    public async createUser(
        email: string,
        username: string,
        password: string,
        isActive: any,
        isStaff: any,
        isSuperuser: any,
        groups: any,
        permissions: any
    ): Promise<any> {
        try {

            const users: any = await this.userModel.findOne({
                $or: [
                    { email: { $regex: `.*${email}.*`, $options: 'i' } },
                    { username: { $regex: `.*${username}.*`, $options: 'i' } },
                ]
            })

            if (users && users.length > 0) {
                const error = ErrorHelper.formatError('Username or Email has already taken.', 409);
                return { error };
            }

            const new_user = await this.userModel.create({
                email: email,
                username: username,
                password: await argon2.hash(password),
                isActive: isActive,
                isStaff: isStaff,
                isSuperuser: isSuperuser,
                groups: groups,
                permissions: permissions
            })
            return { new_user };
        } catch (error) {
            throw error
        }
    }

    public async updateUser(
        _id: string,
        email: string,
        username: string,
        password: string,
        isActive: any,
        isStaff: any,
        isSuperuser: any,
        groups: any,
        permissions: any
    ): Promise<any> {
        try {
            const user: any = await this.userModel.updateOne(
                { _id },
                {
                    email: email,
                    username: username,
                    password: await argon2.hash(password),
                    isActive: isActive,
                    isStaff: isStaff,
                    isSuperuser: isSuperuser,
                    groups: groups,
                    permissions: permissions
                },
                {
                    new: true
                }
            )
            return { user };
        } catch (error) {
            throw error
        }
    }
    public async patchUser(
        _id: string,
        updateData: any,
    ): Promise<any> {
        try {
            const user: any = await this.userModel.findOneAndUpdate(
                { _id },
                { $set: updateData },
                { new: true }
            );
            if (!user) {
                return { error: 'Record not found.' };
            }
            return { user };
        } catch (error) {
            throw error;
        }
    }

    public async deleteUser(
        _id: string,
    ): Promise<any> {
        try {
            const users: any = await this.userModel.deleteOne(
                { _id },
            )
            return { users };
        } catch (error) {
            throw error
        }
    }
}