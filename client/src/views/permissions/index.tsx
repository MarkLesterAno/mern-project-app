import {
    Group, Title,
    Stack,
} from '@mantine/core';
import { useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';
import { debounce } from 'lodash';
import { SortableTable } from '../../components/sortable-table';
import { Content } from '../../layout/content';
import CustomModal from '../../components/custom-modal';
import CustomPagination from '../../components/custom-pagination';
import { PermissionForm } from './components/permission-form';
import _ from 'lodash';
import usePermission from '../../hooks/usePermission';

const Permissions = () => {

    const queryClient = useQueryClient();
    const [isEditMode, setIsEditMode] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);
    const { permissions, isLoading, deletePermission,
        changePage, pagination, setPageLimit } = usePermission(queryClient);

    const [formValues, setformValues] = useState<any>({
        resource: '',
    });

    const onOpen = () => setModalOpened(true);
    const onClose = () => {
        setModalOpened(false);
        setIsEditMode(false);
        setformValues({
            resource: '',
        });
    };

    const onEdit = (rowData: any) => {
        setformValues(rowData);
        setIsEditMode(true);
        onOpen();
    }

    const onSubmit = (values: {
        resource: string;
        description?: string;
        action?: string;
    }) => {
        if (isEditMode) {
            console.log('Update:', values);
            // Add API call or logic to update a user
        } else {
            console.log('Create:', values);
            // Add API call or logic to create a user
        }

    };

    const debouncedDeletePermission = useCallback(
        debounce((_id: any) => {
            deletePermission({ _id });
        }, 300),
        []
    );

    const columns = [
        { key: 'description', label: 'Description' },
        { key: 'resource', label: 'Resource' },
        { key: 'action', label: 'Access' },
    ];

    return (
        <Stack>
            <Group justify="space-between">
                <Title order={2} ta="center" mt="sm">
                    Permissions
                </Title>
                <Group>
                    <CustomModal
                        opened={modalOpened}
                        onClose={onClose}
                        onOpen={onOpen}
                        size='md'
                        title={isEditMode ? "Edit Permission" : "Add Permission"}
                        buttonText={"Add Permission"}>
                        <PermissionForm
                            initialValues={formValues}
                            onSubmit={onSubmit}
                            isEditMode={isEditMode} />
                    </CustomModal>
                </Group>
            </Group>
            <SortableTable
                data={permissions}
                columns={columns}
                loading={isLoading}
                onDelete={debouncedDeletePermission}
                onEdit={(row) => onEdit(row)}
            >
                <CustomPagination changePage={changePage} pagination={pagination} setPageLimit={setPageLimit} />
            </SortableTable>
        </Stack>
    );
}

export default Permissions;