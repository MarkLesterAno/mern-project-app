
export const groups_and_perms: any =
{
    permissions: [
        { resource: 'users', action: 'view', description: 'Can view users' },
        { resource: 'users', action: 'add', description: 'Can add users' },
        { resource: 'users', action: 'update', description: 'Can update users' },
        { resource: 'users', action: 'delete', description: 'Can delete users' },
        { resource: 'groups', action: 'view', description: 'Can view groups' },
        { resource: 'groups', action: 'add', description: 'Can add groups' },
        { resource: 'groups', action: 'update', description: 'Can update groups' },
        { resource: 'groups', action: 'delete', description: 'Can delete groups' },
        { resource: 'permissions', action: 'view', description: 'Can view permissions' },
        { resource: 'permissions', action: 'add', description: 'Can add permissions' },
        { resource: 'permissions', action: 'update', description: 'Can update permissions' },
        { resource: 'permissions', action: 'delete', description: 'Can delete permissions' },
        { resource: 'roles', action: 'view', description: 'Can view roles' },
        { resource: 'roles', action: 'add', description: 'Can add roles' },
        { resource: 'roles', action: 'update', description: 'Can update roles' },
        { resource: 'roles', action: 'delete', description: 'Can delete roles' },
        { resource: 'logs', action: 'view', description: 'Can view logs' },
        { resource: 'logs', action: 'add', description: 'Can add logs' },
        { resource: 'logs', action: 'update', description: 'Can update logs' },
        { resource: 'logs', action: 'delete', description: 'Can delete logs' },
        { resource: 'notifications', action: 'view', description: 'Can view notifications' },
        { resource: 'notifications', action: 'add', description: 'Can add notifications' },
        { resource: 'notifications', action: 'update', description: 'Can update notifications' },
        { resource: 'notifications', action: 'delete', description: 'Can delete notifications' },
        { resource: 'settings', action: 'view', description: 'Can view settings' },
        { resource: 'settings', action: 'add', description: 'Can add settings' },
        { resource: 'settings', action: 'update', description: 'Can update settings' },
        { resource: 'settings', action: 'delete', description: 'Can delete settings' },
    ],
    groups: [
        {
            name: 'Default',
            permissions: [
                'view_logs',
                'view_notifications',
                'update_notifications',
                'delete_notifications',
            ]
        },
        {
            name: 'Staff',
            permissions: [
                'view_logs',
                'add_logs',
                'update_logs',
                'delete_logs',
                'view_notifications',
                'add_notifications',
                'update_notifications',
                'delete_notifications',
            ]
        },
        {
            name: 'Administrator',
            permissions: [
                'view_users',
                'add_users',
                'update_users',
                'delete_users',
                'view_groups',
                'add_groups',
                'update_groups',
                'delete_groups',
                'view_permissions',
                'add_permissions',
                'update_permissions',
                'delete_permissions',
                'view_roles',
                'add_roles',
                'view_settings',
                'add_settings',
                'update_settings',
                'delete_settings',
            ]
        }
    ],
}
export const default_content_types = [
    'user', 'group', 'permission', 'role', 'log', 'notification', 'setting'
]
export const default_users = {
    users: [
        {
            username: 'admin',
            password: '1234567890',
            email: 'systemadmin@gmail.com',
            isActive: true,
            isStaff: false,
            isSuperuser: true,
            groups: [],
            permissions: []
        },
        {
            username: 'john_doe',
            password: 'password123',
            email: 'john.doe@example.com',
            isActive: true,
            isStaff: true,
            isSuperuser: false,
            groups: ['Staff'],
            permissions: ['view_logs', 'add_logs']
        },
        {
            username: 'jane_smith',
            password: 'password123',
            email: 'jane.smith@example.com',
            isActive: true,
            isStaff: true,
            isSuperuser: false,
            groups: ['Staff'],
            permissions: ['view_logs', 'add_logs', 'update_logs']
        },
        {
            username: 'alice_jones',
            password: 'password123',
            email: 'alice.jones@example.com',
            isActive: true,
            isStaff: false,
            isSuperuser: false,
            groups: ['Default'],
            permissions: ['view_notifications']
        },
        {
            username: 'bob_brown',
            password: 'password123',
            email: 'bob.brown@example.com',
            isActive: true,
            isStaff: false,
            isSuperuser: false,
            groups: ['Default'],
            permissions: ['view_notifications', 'update_notifications']
        },
        {
            username: 'charlie_black',
            password: 'password123',
            email: 'charlie.black@example.com',
            isActive: true,
            isStaff: true,
            isSuperuser: false,
            groups: ['Administrator'],
            permissions: [
                'view_users', 'add_users', 'update_users', 'delete_users',
                'view_groups', 'add_groups', 'update_groups', 'delete_groups',
                'view_permissions', 'add_permissions', 'update_permissions', 'delete_permissions',
                'view_roles', 'add_roles', 'view_settings', 'add_settings', 'update_settings', 'delete_settings'
            ]
        },
        {
            username: 'david_white',
            password: 'password123',
            email: 'david.white@example.com',
            isActive: true,
            isStaff: true,
            isSuperuser: false,
            groups: ['Staff'],
            permissions: ['view_logs', 'add_logs', 'update_logs', 'delete_logs']
        },
        {
            username: 'eve_green',
            password: 'password123',
            email: 'eve.green@example.com',
            isActive: true,
            isStaff: false,
            isSuperuser: false,
            groups: ['Default'],
            permissions: ['view_notifications', 'update_notifications', 'delete_notifications']
        },
        {
            username: 'frank_blue',
            password: 'password123',
            email: 'frank.blue@example.com',
            isActive: true,
            isStaff: false,
            isSuperuser: false,
            groups: ['Default'],
            permissions: ['view_notifications']
        },
        {
            username: 'grace_red',
            password: 'password123',
            email: 'grace.red@example.com',
            isActive: true,
            isStaff: true,
            isSuperuser: false,
            groups: ['Staff'],
            permissions: ['view_logs', 'add_logs', 'update_logs', 'delete_logs', 'view_notifications']
        },
        // Additional mock users
        {
            username: 'henry_yellow',
            password: 'password123',
            email: 'henry.yellow@example.com',
            isActive: true,
            isStaff: false,
            isSuperuser: false,
            groups: ['Default'],
            permissions: ['view_notifications']
        },
        {
            username: 'isabella_purple',
            password: 'password123',
            email: 'isabella.purple@example.com',
            isActive: true,
            isStaff: true,
            isSuperuser: false,
            groups: ['Staff'],
            permissions: ['view_logs', 'add_logs', 'update_logs']
        },
        {
            username: 'jack_orange',
            password: 'password123',
            email: 'jack.orange@example.com',
            isActive: true,
            isStaff: false,
            isSuperuser: false,
            groups: ['Default'],
            permissions: ['view_notifications', 'update_notifications']
        },
        {
            username: 'karen_pink',
            password: 'password123',
            email: 'karen.pink@example.com',
            isActive: true,
            isStaff: true,
            isSuperuser: false,
            groups: ['Staff'],
            permissions: ['view_logs', 'add_logs', 'update_logs', 'delete_logs']
        },
        {
            username: 'leo_brown',
            password: 'password123',
            email: 'leo.brown@example.com',
            isActive: true,
            isStaff: false,
            isSuperuser: false,
            groups: ['Default'],
            permissions: ['view_notifications']
        },
        {
            username: 'mia_white',
            password: 'password123',
            email: 'mia.white@example.com',
            isActive: true,
            isStaff: true,
            isSuperuser: false,
            groups: ['Staff'],
            permissions: ['view_logs', 'add_logs', 'update_logs']
        },
        {
            username: 'noah_black',
            password: 'password123',
            email: 'noah.black@example.com',
            isActive: true,
            isStaff: false,
            isSuperuser: false,
            groups: ['Default'],
            permissions: ['view_notifications', 'update_notifications']
        },
        {
            username: 'olivia_gray',
            password: 'password123',
            email: 'olivia.gray@example.com',
            isActive: true,
            isStaff: true,
            isSuperuser: false,
            groups: ['Staff'],
            permissions: ['view_logs', 'add_logs', 'update_logs', 'delete_logs']
        },
        {
            username: 'peter_blue',
            password: 'password123',
            email: 'peter.blue@example.com',
            isActive: true,
            isStaff: false,
            isSuperuser: false,
            groups: ['Default'],
            permissions: ['view_notifications']
        },
        {
            username: 'quinn_green',
            password: 'password123',
            email: 'quinn.green@example.com',
            isActive: true,
            isStaff: true,
            isSuperuser: false,
            groups: ['Staff'],
            permissions: ['view_logs', 'add_logs', 'update_logs', 'delete_logs']
        }
    ]
}

