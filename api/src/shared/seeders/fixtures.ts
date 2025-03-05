
export const groups_and_perms: any =
{
    permissions: [
        { name: 'view_users', description: 'Can view users', content_type: 'user' },
        { name: 'add_users', description: 'Can add users', content_type: 'user' },
        { name: 'update_users', description: 'Can update users', content_type: 'user' },
        { name: 'delete_users', description: 'Can delete users', content_type: 'user' },
        { name: 'view_groups', description: 'Can view groups', content_type: 'group' },
        { name: 'add_groups', description: 'Can add groups', content_type: 'group' },
        { name: 'update_groups', description: 'Can update groups', content_type: 'group' },
        { name: 'delete_groups', description: 'Can delete groups', content_type: 'group' },
        { name: 'view_permissions', description: 'Can view permissions', content_type: 'permission' },
        { name: 'add_permissions', description: 'Can add permissions', content_type: 'permission' },
        { name: 'update_permissions', description: 'Can update permissions', content_type: 'permission' },
        { name: 'delete_permissions', description: 'Can delete permissions', content_type: 'permission' },
        { name: 'view_roles', description: 'Can view roles', content_type: 'role' },
        { name: 'add_roles', description: 'Can add roles', content_type: 'role' },
        { name: 'update_roles', description: 'Can update roles', content_type: 'role' },
        { name: 'delete_roles', description: 'Can delete roles', content_type: 'role' },
        { name: 'view_logs', description: 'Can view logs', content_type: 'log' },
        { name: 'add_logs', description: 'Can add logs', content_type: 'log' },
        { name: 'update_logs', description: 'Can update logs', content_type: 'log' },
        { name: 'delete_logs', description: 'Can delete logs', content_type: 'log' },
        { name: 'view_notifications', description: 'Can view notifications', content_type: 'notification' },
        { name: 'add_notifications', description: 'Can add notifications', content_type: 'notification' },
        { name: 'update_notifications', description: 'Can update notifications', content_type: 'notification' },
        { name: 'delete_notifications', description: 'Can delete notifications', content_type: 'notification' },
        { name: 'view_settings', description: 'Can view settings', content_type: 'setting' },
        { name: 'add_settings', description: 'Can add settings', content_type: 'setting' },
        { name: 'update_settings', description: 'Can update settings', content_type: 'setting' },
        { name: 'delete_settings', description: 'Can delete settings', content_type: 'setting' },
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

