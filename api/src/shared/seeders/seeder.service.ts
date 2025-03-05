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
                    name: permission.name,
                    description: permission.description,
                    content_type: permission.content_type,
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
                    permissions: group.permissions.map((permission: any) => allPermissions.filter((p: any) => p.name === permission)[0]._id)
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
                return {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    username: user.username,
                    password: await argon2.hash(user.password),
                    email: user.email,
                    isActive: user.isActive,
                    isStaff: user.isStaff,
                    isSuperuser: user.isSuperuser,
                    groups: Array.isArray(user.groups) ? user.groups.map((group: any) => allGroups.filter((g: any) => g.name === group)[0]?._id) : [],
                    permissions: Array.isArray(user.permissions) ? user.permissions.map((permission: any) => allPermissions.filter((p: any) => p.name === permission)[0]?._id) : []
                };
            }));
            await userModel.create(data)
        } catch (error) {
            throw error;
        }
    }
}