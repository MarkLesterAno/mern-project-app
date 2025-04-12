import { Checkbox, Stack, Tabs } from '@mantine/core';
import TextUtils from '../utils/text-utils';
import usePermission from '../hooks/usePermission';
import { useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';
import _ from 'lodash';

interface PermissionsTabProps {
    props: any;
    selectedRows: string[];
    setSelectedRows: (updatedPermissions: string[]) => void;
}

export function PermissionsTab({ selectedRows, setSelectedRows, props }: PermissionsTabProps) {
    const queryClient = useQueryClient();
    const { allPermissions } = usePermission(queryClient);
    const [resources, setResources] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<string | null>(null);

    // Map resources when permissions change
    useEffect(() => {
        if (allPermissions) {
            const resourceList = _.uniq(allPermissions.map((permission: any) => permission.resource));
            setResources(resourceList);
            if (resourceList.length > 0 && !activeTab) {
                setActiveTab(resourceList[0]);
            }
        }
    }, [allPermissions, activeTab]);

    // Handle row selection for checkboxes
    const handlePermissionChange = (permissionId: string, isChecked: boolean) => {
        const updatedPermissions = isChecked
            ? [...selectedRows, permissionId] // Add the permission if checked
            : selectedRows.filter((id) => id !== permissionId); // Remove the permission if unchecked
        setSelectedRows(updatedPermissions); // Update the selected permissions
    };

    // Render a single resource tab
    const renderResourceTab = (resource: string) => (
        <Tabs.Tab key={resource} value={resource}>
            {TextUtils.capitalizeWords(resource)}
        </Tabs.Tab>
    );

    // Render permissions for a specific resource
    const renderPermissionsForResource = (resource: string) => {
        const resourcePermissions = allPermissions.filter(
            (permission: any) => permission.resource === resource
        );
        return (
            <Tabs.Panel key={resource} value={resource}>
                <Stack mx={30} gap="xs" justify="flex-start">
                    {resourcePermissions.map((item: any) => (
                        <Checkbox
                            key={item._id}
                            aria-label="Select row"
                            checked={selectedRows.includes(item._id)}
                            onChange={(event) =>
                                handlePermissionChange(item._id, event.currentTarget.checked)
                            }
                            label={item.description}
                        />
                    ))}
                </Stack>
            </Tabs.Panel>
        );
    };
    return (
        <Tabs
            variant='pills'
            orientation="vertical"
            value={activeTab}
            onChange={setActiveTab}
            {...props}
        >
            <Tabs.List>
                {resources.map((resource) => renderResourceTab(resource))}
            </Tabs.List>
            {resources.map((resource) => renderPermissionsForResource(resource))}
        </Tabs>
    );
}