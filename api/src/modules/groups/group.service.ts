import { Service, Inject } from "typedi";
import PaginationUtils from "../../shared/utils/PaginationUtils";
import mongoose from "mongoose";
import ErrorHelper from "../../shared/helpers/error.helper";

@Service()
export default class GroupService {

    constructor(
        @Inject("groupModel") protected groupModel: Models.GroupModel,
        @Inject("permissionModel") protected permissionModel: Models.GroupModel,
    ) { }

    /**
    * @service
    * GET       /groups?limit=10&page=1 - getGroups
    * GET       /groups/:id - getGroup
    * GET       /groups?filter=&limit=10&page=1 - filterGroups
    * POST      /groups - createGroup
    * PUT|PATCH /groups/:id - updateGroup
    * DELETE    /groups/:id - deleteGroup
    */

    /**
    * @param limit 
    * @param page 
    */
    public async getGroups(): Promise<any> {
        try {
            const [count, groups] = await Promise.all([
                await this.groupModel.find({}).countDocuments({}),
                await this.groupModel.find({})
                    .populate('permissions', '_id description')
            ]);
            return { count, groups };
        } catch (error) {
            throw error;
        }
    }

    /**
    * @param filter 
    * @param limit 
    * @param page
    */
    public async filterGroups(filter: any): Promise<any> {
        try {
            const [count, groups] = await Promise.all([
                await this.groupModel.find({
                    name: { $regex: `.*${filter}.*`, $options: 'i' }
                }).countDocuments({}),
                await this.groupModel.find({
                    name: { $regex: `.*${filter}.*`, $options: 'i' }
                })
                    .select('_id name permissions')
            ]);
            return { count, groups };
        } catch (error) {
            throw error;
        }
    }

    /**
    * @param _id 
    */
    public async getGroup(_id: any): Promise<any> {
        try {
            const group = await this.groupModel.findOne({ _id: new mongoose.Types.ObjectId(_id) });
            if (!group) {
                const error = ErrorHelper.formatError('Group not found.', 409);
                return { error };
            }
            return { group };
        } catch (error) {
            throw error;
        }
    }

    public async createGroup(
        name: string,
        permissions: any
    ): Promise<any> {
        try {
            const existingGroup: any = await this.groupModel.findOne({
                name: { $regex: `.*${name}.*`, $options: 'i' }
            });

            if (existingGroup) {
                const error = ErrorHelper.formatError('Group name has already been taken.', 409);
                return { error };
            }  

            const new_group = await this.groupModel.create({
                name: name,
                permissions: permissions.map(
                    (permission: any) => new mongoose.Types.ObjectId(permission)
                )
            });
            return { new_group };
        } catch (error) {
            throw error;
        }
    }

    public async updateGroup(
        _id: string,
        name: string,
        permissions: any
    ): Promise<any> {
        try {
            const allPermissions = await this.permissionModel.find({});
            const group: any = await this.groupModel.updateOne(
                { _id },
                {
                    name: name,
                    permissions: permissions.map(
                        (permission: any) => allPermissions.filter((p: any) => p.name === permission)[0]._id
                    )
                },
                {
                    new: true
                }
            );
            return { group };
        } catch (error) {
            throw error;
        }
    }

    public async patchGroup(
        _id: string,
        updateData: any,
    ): Promise<any> {
        try {
            const allPermissions = await this.permissionModel.find({});
            if (updateData.permissions) {
                updateData.permissions = updateData.permissions.map(
                    (permission: any) => allPermissions.filter((p: any) => p.name === permission)[0]._id
                )
            }
            const group: any = await this.groupModel.findOneAndUpdate(
                { _id },
                { $set: updateData },
                { new: true }
            );
            if (!group) {
                return { error: 'Record not found.' };
            }
            return { group };
        } catch (error) {
            throw error;
        }
    }

    public async deleteGroup(
        _id: string,
    ): Promise<any> {
        try {
            const group: any = await this.groupModel.deleteOne(
                { _id },
            );
            return { group };
        } catch (error) {
            throw error;
        }
    }
}