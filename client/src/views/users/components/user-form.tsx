import { useEffect, useState } from 'react';
import { Button, Checkbox, Group, Stack, TextInput, Text, Divider, Tabs, List } from '@mantine/core';
import { useForm } from '@mantine/form';
import { PermissionsTab } from '../../../components/permissions-tab';
import { IconShield, IconUser } from '@tabler/icons-react';
import { GroupsTab } from '../../../components/groups-tab';

interface UserFormProps {

    initialValues: {
        email: string;
        username: string;
        isActive: boolean;
        isStaff: boolean;
        isSuperuser: boolean;
        groups?: string[];
        permissions?: string[];
    };
    onSubmit: (values: {
        email: string;
        username: string;
        isActive: boolean;
        isStaff: boolean;
        isSuperuser: boolean;
        groups?: string[];
        permissions?: string[];
    }) => void;
    isEditMode?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
    initialValues,
    onSubmit,
    isEditMode = false }) => {

    const form = useForm({
        initialValues: {
            email: initialValues.email,
            username: initialValues.username,
            isActive: initialValues.isActive,
            isStaff: initialValues.isStaff,
            isSuperuser: initialValues.isSuperuser,
            groups: initialValues.groups || [],
            permissions: initialValues.permissions || [],
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            username: (value) => (value.trim().length > 0 ? null : 'Username is required'),
        },
    });

    const setSelectedPermissions = (permission: string[]) => {
        form.setFieldValue('permissions', permission); // Directly set the updated permissions array
    };
    const setSelectedGroups = (group: string[]) => {
        form.setFieldValue('groups', group); // Directly set the updated groups array
    };

    useEffect(() => {
        if (isEditMode && initialValues.permissions) {
            setSelectedPermissions(initialValues.permissions);
        }
    }, [isEditMode, initialValues.permissions]);

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Tabs variant="pills" radius="md" defaultValue="account-details">
                <Tabs.List>
                    <Tabs.Tab value="account-details" leftSection={<IconUser size={12} />}>
                        Account Details
                    </Tabs.Tab>
                    <Tabs.Tab value="groups" leftSection={<IconShield size={12} />}>
                        Groups
                    </Tabs.Tab>
                    <Tabs.Tab value="permissions" leftSection={<IconShield size={12} />}>
                        Permissions
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="account-details" mt={10}>
                    <Stack>
                        <TextInput
                            required
                            label="Email"
                            placeholder="Enter email"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email}
                        />
                        <TextInput
                            required
                            label="Username"
                            placeholder="Enter username"
                            value={form.values.username}
                            onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
                            error={form.errors.username}
                        />
                        <Divider label="Status" labelPosition='left' my={1} />
                        <Text size="xs">
                            Note: Use the checkboxes below to configure the user's account status:
                        </Text>
                        <List spacing="xs" size="xs" ml={25}>
                            <List.Item><b>Active</b>: Allows the user to log in to the system.</List.Item>
                        </List>
                        <Checkbox
                            label="Active"
                            ml={25}
                            required
                            checked={form.values.isActive}
                            onChange={(event) => form.setFieldValue('isActive', event.currentTarget.checked)}
                        />
                        <Divider label="Role" labelPosition='left' my={1} />
                        <List spacing="xs" size="xs" ml={25}>
                            <List.Item><b>Staff</b>: Grants the user staff-level permissions.</List.Item>
                            <List.Item><b>Superuser</b>: Grants the user full administrative access.</List.Item>
                        </List>
                        <Group ml={25}>
                            <Checkbox
                                label="Staff"
                                checked={form.values.isStaff}
                                onChange={(event) => form.setFieldValue('isStaff', event.currentTarget.checked)}
                            />
                            <Checkbox
                                label="Superuser"
                                checked={form.values.isSuperuser}
                                onChange={(event) => form.setFieldValue('isSuperuser', event.currentTarget.checked)}
                            />
                        </Group>
                    </Stack>
                </Tabs.Panel>
                <Tabs.Panel value="groups" mt={10}>
                    <Stack>
                        <Text size="md" fw={500}  ml={10}>
                            Select Groups
                        </Text>
                        <Text size="xs"  ml={10}>
                            Note: Use the tab below to assign groups to the user.
                            Groups help organize users and manage permissions collectively.
                        </Text>
                        <GroupsTab props={{ ml: 10, gap:'xs' }}
                            selectedRows={form.values.groups}
                            setSelectedRows={setSelectedGroups} />
                    </Stack>
                </Tabs.Panel>
                <Tabs.Panel value="permissions" mt={10}>
                    <Stack>
                        <Text size="md" fw={500}  ml={10}>
                            Select Permissions
                        </Text>
                        <Text size="xs"  ml={10}>
                            Note: Use the tab below to assign specific permissions to the user.
                            Permissions are grouped by resource, and you can select or deselect permissions for each resource as needed.
                        </Text>
                        <PermissionsTab props={{ ml: 10 }}
                            selectedRows={form.values.permissions}
                            setSelectedRows={setSelectedPermissions} />
                    </Stack>
                </Tabs.Panel>
            </Tabs>
            <Group justify='flex-end' mt="md">
                <Button type="submit">{isEditMode ? 'Update User' : 'Save User'}</Button>
            </Group>
        </form>
    );
};