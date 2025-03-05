import { Service, Inject } from "typedi";
import mongoose from "mongoose";
import ErrorHelper from "../../shared/helpers/error.helper";
import { default_content_types } from "../../shared/seeders/fixtures";

@Service()
export default class PermissionsService {

    constructor(
        @Inject("permissionModel") protected permissionModel: Models.PermissionModel,
    ) { }

    /**
    * @service
    * GET       /permissions?limit=10&page=1 - getPermissions
    * GET       /permissions/:id - getPermission
    * GET       /permissions?filter=&limit=10&page=1 - filterPermissions
    * POST      /permissions - createPermission
    * PUT|PATCH /permissions/:id - updatePermission
    * DELETE    /permissions/:id - deletePermission
    */

    /**
    * @param limit 
    * @param page 
    */
    public async getPermissions(): Promise<any> {
        try {
            const [count, permissions] = await Promise.all([
                await this.permissionModel.find({}).countDocuments({}),
                await this.permissionModel.find({})
                .select('_id name description content_type')
            ]);
            return { count, permissions };
        } catch (error) {
            throw error;
        }
    }
    public async getContentTypes(): Promise<any> {
        try {
            return { default_content_types };
        } catch (error) {
            throw error;
        }
    }

    /**
    * @param filter 
    * @param limit 
    * @param page
    */
    public async filterPermissions(filter: any,): Promise<any> {
        try {
            const [count, permissions] = await Promise.all([
                await this.permissionModel.find({
                    name: { $regex: `.*${filter}.*`, $options: 'i' }
                }).countDocuments({}),
                await this.permissionModel.find({
                    name: { $regex: `.*${filter}.*`, $options: 'i' }
                })
                    .select('_id name description content_type')
            ]);
            return { count, permissions };
        } catch (error) {
            throw error;
        }
    }

    /**
    * @param _id 
    */
    public async getPermission(_id: any): Promise<any> {
        try {
            const permission = await this.permissionModel.findOne({ _id: new mongoose.Types.ObjectId(_id) });
            if (!permission) {
                const error = ErrorHelper.formatError('Permission not found.', 409);
                return { error };
            }
            return { permission };
        } catch (error) {
            throw error;
        }
    }

    public async createPermission(
        name: string,
        description: string,
        content_type: string
    ): Promise<any> {
        try {
            const existingPermission: any = await this.permissionModel.findOne({
                name: { $regex: `.*${name}.*`, $options: 'i' }
            });

            if (existingPermission) {
                const error = ErrorHelper.formatError('Permission name has already been taken.', 409);
                return { error };
            }

            const new_permission = await this.permissionModel.create({
                name: name,
                description: description,
                content_type: content_type
            });
            return { new_permission };
        } catch (error) {
            throw error;
        }
    }

    public async updatePermission(
        _id: string,
        name: string,
        description: string,
        content_type: string
    ): Promise<any> {
        try {
            const permission: any = await this.permissionModel.updateOne(
                { _id },
                {
                    name: name,
                    description: description,
                    content_type: content_type
                },
                {
                    new: true
                }
            );
            return { permission };
        } catch (error) {
            throw error;
        }
    }

    public async patchPermission(
        _id: string,
        updateData: any,
    ): Promise<any> {
        try {
            const permission: any = await this.permissionModel.findOneAndUpdate(
                { _id },
                { $set: updateData },
                { new: true }
            );
            if (!permission) {
                return { error: 'Record not found.' };
            }
            return { permission };
        } catch (error) {
            throw error;
        }
    }

    public async deletePermission(
        _id: string,
    ): Promise<any> {
        try {
            const permission: any = await this.permissionModel.deleteOne(
                { _id },
            );
            return { permission };
        } catch (error) {
            throw error;
        }
    }
}