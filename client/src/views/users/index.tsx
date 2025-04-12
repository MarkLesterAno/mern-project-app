import {
    Grid, Container, Group, Title,
    Stack,
} from '@mantine/core';
import { useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';
import { debounce } from 'lodash';
import { SortableTable } from '../../components/sortable-table';
import CustomModal from '../../components/custom-modal';
import CustomPagination from '../../components/custom-pagination';
import useUsers from '../../hooks/useUser';
import { UserForm } from './components/user-form';
import _ from 'lodash';
import { useHasPermission } from '../../context/PermissionContext';


const Users = () => {

    const canViewUsers = useHasPermission('Can view users');
    
    
    const queryClient = useQueryClient();
    const [isEditMode, setIsEditMode] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);
    const [formValues, setformValues] = useState<any>({
        email: '',
        username: '',
        isActive: false,
        isStaff: false,
        isSuperuser: false,
        groups: [],
        permissions: []
    });

    const onOpen = () => setModalOpened(true);
    const onClose = () => {
        setModalOpened(false);
        setIsEditMode(false);
        setformValues({
            email: '',
            username: '',
            isActive: false,
            isStaff: false,
            isSuperuser: false,
            groups: [],
            permissions: []
        });
    };
    const onEdit = (rowData: any) => {
        setformValues(rowData);
        setIsEditMode(true);
        onOpen();
    }

    const { users, isLoading, deleteUser,
        changePage, pagination, setPageLimit } = useUsers(queryClient);

    const onSubmit = (values: {
        email: string;
        username: string;
        isActive: boolean;
        isStaff: boolean;
        isSuperuser: boolean;
        groups?: string[];
        permissions?: string[];
    }) => {
        if (isEditMode) {
            console.log('Update:', values);
            // Add API call or logic to update a user
        } else {
            console.log('Create:', values);
            // Add API call or logic to create a user
        }

    };

    const debouncedDeleteUser = useCallback(
        debounce((_id: any) => {
            deleteUser({ _id });
        }, 300),
        []
    );

    const columns = [
        { key: 'email', label: 'Email' },
        { key: 'username', label: 'Username' },
    ];

    return (
        <Stack>
            <Group justify="space-between">
                <Title order={2} ta="center" mt="sm">
                    Users
                </Title>
                <Group>
                    <CustomModal
                        opened={modalOpened}
                        onClose={onClose}
                        onOpen={onOpen}
                        size='md' title={isEditMode ? "Edit User" : "Add User"} buttonText={"Add User"}>
                        <UserForm
                            isEditMode={isEditMode}
                            initialValues={formValues}
                            onSubmit={onSubmit}
                        />
                    </CustomModal>
                </Group>
            </Group>
            <Grid>
                <Grid.Col span={12}>
                    <SortableTable
                        data={users}
                        columns={columns}
                        loading={isLoading}
                        onDelete={debouncedDeleteUser}
                        onEdit={(row) => onEdit(row)}
                    >
                        <CustomPagination changePage={changePage} pagination={pagination} setPageLimit={setPageLimit} />
                    </SortableTable>

                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 12 }}>
                </Grid.Col>
            </Grid>
        </Stack>

    );
}

export default Users;