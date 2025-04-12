import { Service } from 'typedi';
import mongoose from 'mongoose';
import { groups_and_perms, default_users } from './fixtures'
import argon2 from 'argon2';


@Service()
export default class SeederService {
    constructor(
        
    ) { }

    public async seedPermission(connection: mongoose.Connection): Promise<any> {
        try {
            const permissionModel = connection.model("Permission")
            const allPermissions = await permissionModel.find({})

            if (allPermissions.length) return

            const permissions: any[] = groups_and_perms.permissions
            const data = permissions.map((permission: any) => {
                return {
                    resource: permission.resource,
                    description: permission.description,
                    action: permission.action,
                }
            })
            await permissionModel.create(data)
        } catch (error) {
            throw error;
        }
    }
    public async seedGroup(connection: mongoose.Connection): Promise<any> {
        try {
            const permissionModel = connection.model("Permission")
            const groupModel = connection.model("Group")

            const allGroups = await groupModel.find({})
            const allPermissions = await permissionModel.find({})

            if (allGroups.length) return

            const groups: any[] = groups_and_perms.groups
            const data = groups.map((group: any) => {
                return {
                    name: group.name,
                    permissions: group.permissions.map((item: any) => {
                        const permission = item.split('_');
                        return allPermissions.filter((p: any) => p.resource === permission[1] && p.action === permission[0])[0]?._id
                    })
                }
            })
            await groupModel.create(data)
        } catch (error) {
            throw error;
        }
    }
    public async seedUser(connection: mongoose.Connection): Promise<any> {
        try {
            const userModel = connection.model("User")
            const permissionModel = connection.model("Permission")
            const groupModel = connection.model("Group")

            const allUsers = await userModel.find({})
            const allGroups = await groupModel.find({})
            const allPermissions = await permissionModel.find({})

            if (allUsers.length) return

            const users: any = default_users.users
            const data = await Promise.all(users.map(async (user: any) => {
                const groups = user.groups.map((group: any) => allGroups.filter((g: any) => g.name === group)[0]?._id)
                const permissions = user.permissions.map((item: any) => {
                    const permission = item.split('_');
                    return allPermissions.filter((p: any) => p.resource === permission[1] && p.action === permission[0])[0]?._id
                })
                return {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    username: user.username,
                    password: await argon2.hash(user.password),
                    email: user.email,
                    isActive: user.isActive,
                    isStaff: user.isStaff,
                    isSuperuser: user.isSuperuser,
                    groups,
                    permissions: permissions
                };
            }));
            await userModel.create(data)
        } catch (error) {
            throw error;
        }
    }
}