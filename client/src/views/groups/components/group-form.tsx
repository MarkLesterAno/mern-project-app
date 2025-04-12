import { useEffect } from 'react';
import { Button, Group, Stack, TextInput, Text, Divider, } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { PermissionsTab } from '../../../components/permissions-tab';

interface GroupFormProps {

    initialValues: {
        name: string;
        permissions?: string[];
    };
    onSubmit: (values: {
        name: string;
        permissions?: string[];
    }) => void;
    isEditMode?: boolean;
}

export const GroupForm: React.FC<GroupFormProps> = ({
    initialValues,
    onSubmit,
    isEditMode = false }) => {

    const form = useForm({
        initialValues: {
            name: initialValues.name,
            permissions: initialValues.permissions || [],
        },
        validate: {
            name: hasLength({ min: 5 }, 'Must be at least 5 characters'),
            permissions: hasLength({ min: 2 }, 'Must be at least 2 permissions'),
        },
    });

    const setSelectedPermissions = (permission: string[]) => {
        form.setFieldValue('permissions', permission); // Directly set the updated permissions array
    };

    useEffect(() => {
        if (isEditMode && initialValues.permissions) {
            setSelectedPermissions(initialValues.permissions);
        }
    }, [isEditMode, initialValues.permissions]);

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <TextInput
                    required
                    label="Name"
                    placeholder="Enter name"
                    value={form.values.name}
                    onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                    error={form.errors.name}
                />
                <Divider label="Permissions" labelPosition='left' my={1} />
                <Text size="xs">
                    Note: Use the tab below to assign specific permissions to the user.
                    Permissions are grouped by resource, and you can select or deselect permissions for each resource as needed.
                </Text>
                <PermissionsTab props={{}}
                    selectedRows={form.values.permissions}
                    setSelectedRows={setSelectedPermissions} />
            </Stack>
            <Group justify='flex-end' mt="md">
                <Button type="submit">{isEditMode ? 'Update Group' : 'Save Group'}</Button>
            </Group>
        </form>
    );
};