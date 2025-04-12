import { Button, Group, Stack, TextInput, Text, Divider, Select } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';

interface PermissionFormProps {
    initialValues: {
        resource: string;
        action?: string;
        description?: string;
    };
    onSubmit: (values: {
        resource: string;
        action?: string;
        description?: string;
    }) => void;
    isEditMode?: boolean;
}

export const PermissionForm: React.FC<PermissionFormProps> = ({
    initialValues,
    onSubmit,
    isEditMode = false,
}) => {
    const form = useForm({
        initialValues: !isEditMode ? { resource: initialValues.resource, } : {
            resource: initialValues.resource,
            action: initialValues.action || '',
            description: initialValues.description || '',
        },
        validate: {
            resource: hasLength({ min: 5 }, 'Must be at least 5 characters'),
            ...(isEditMode && {
                action: (value: string) => (value ? null : 'Action is required'),
                description: hasLength({ min: 5 }, 'Description must be at least 5 characters'),
            }),
        },
    });

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <TextInput
                    required
                    label="Resource"
                    placeholder="Enter resource"
                    value={form.values.resource}
                    onChange={(event) => form.setFieldValue('resource', event.currentTarget.value)}
                    error={form.errors.resource}
                />
                {isEditMode && (
                    <>
                        <Select
                            required
                            label="Action"
                            placeholder="Select an action"
                            data={['view', 'add', 'update', 'delete']}
                            value={form.values.action}
                            onChange={(value) => form.setFieldValue('action', value || '')}
                            error={form.errors.action}
                        />
                        <TextInput
                            required
                            label="Description"
                            placeholder="Enter description"
                            value={form.values.description}
                            onChange={(event) => form.setFieldValue('description', event.currentTarget.value)}
                            error={form.errors.description}
                        />
                    </>
                )}
                {isEditMode && (
                    <Text size="xs">
                        Note: Provide a resource in the form above, and the permissions will be automatically generated based on the selected resource.
                    </Text>
                )}
            </Stack>
            <Group justify="flex-end" mt="md">
                <Button type="submit">{isEditMode ? 'Update Permission' : 'Save Permission'}</Button>
            </Group>
        </form>
    );
};