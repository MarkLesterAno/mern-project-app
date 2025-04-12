import { Service, Inject } from "typedi";
import mongoose from "mongoose";
import ErrorHelper from "../../shared/helpers/error.helper";
import { default_content_types } from "../../shared/seeders/fixtures";
import PaginationUtils from "../../shared/utils/PaginationUtils";

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
    public async getPermissions(limit?: any, page?: any): Promise<any> {
        try {
            if (!limit && !page) {
                // If no limit and page are provided, return all permissions
                const permissions = await this.permissionModel.find({});
                const count = permissions.length;
                return { count, permissions };
            }
    
            // If limit and page are provided, return paginated permissions
            const { pageSize, skip } = PaginationUtils.setPagination(limit, page);
            const [count, permissions] = await Promise.all([
                this.permissionModel.find({}).countDocuments({}),
                this.permissionModel.find({})
                    .limit(pageSize)
                    .skip(skip),
            ]);
    
            return { count, permissions };
        } catch (error) {
            throw error;
        }
    }

    /**
    * @param filter 
    * @param limit 
    * @param page
    */
    public async filterPermissions(filter: any, limit?: any, page?: any): Promise<any> {
        try {

            if (!limit && !page) {
                // If no limit and page are provided, return all permissions
                const permissions = await this.permissionModel.find({
                    resource: { $regex: `.*${filter}.*`, $options: 'i' }
                });
                const count = permissions.length;
                return { count, permissions };
            }
            // If limit and page are provided, return paginated permissions
            const { pageSize, skip } = PaginationUtils.setPagination(limit, page)
            const [count, permissions] = await Promise.all([
                await this.permissionModel.find({
                    resource: { $regex: `.*${filter}.*`, $options: 'i' }
                }).countDocuments({}),
                await this.permissionModel.find({
                    resource: { $regex: `.*${filter}.*`, $options: 'i' }
                })
                    .select('_id resource action description')
                    .limit(pageSize)
                    .skip(skip)
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
        resource: string,
    ): Promise<any> {
        try {
            const existingPermission: any = await this.permissionModel.findOne({
                resource: { $regex: `.*${resource}.*`, $options: 'i' }
            });

            if (existingPermission) {
                const error = ErrorHelper.formatError('Permission name has already been taken.', 409);
                return { error };
            }
            const actions = ['view', 'add', 'update', 'delete'];
            const permissions = actions.map((action) => {
                return { resource: resource, action: action, description: ` Can ${action} ${resource}` };
            });

            const new_permission = await this.permissionModel.create(permissions);
            return { new_permission };
        } catch (error) {
            throw error;
        }
    }

    public async updatePermission(
        _id: string,
        resource: string,
        action: string,
        description: string
    ): Promise<any> {
        try {
            const permission: any = await this.permissionModel.updateOne(
                { _id },
                {
                    resource: resource,
                    action: action,
                    description: description
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