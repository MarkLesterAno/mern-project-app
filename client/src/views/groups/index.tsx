import {
    Grid, Container, Group, Title,
    Stack,
} from '@mantine/core';
import { useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';
import { debounce } from 'lodash';
import { SortableTable } from '../../components/sortable-table';
import { Content } from '../../layout/content';
import CustomModal from '../../components/custom-modal';
import CustomPagination from '../../components/custom-pagination';
import _ from 'lodash';
import { GroupForm } from './components/group-form';
import useGroup from '../../hooks/useGroup';

const Groups = () => {

    const queryClient = useQueryClient();
    const [isEditMode, setIsEditMode] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);
    const [formValues, setformValues] = useState<any>({
        name: '',
        permissions: []
    });

    const onOpen = () => setModalOpened(true);
    const onClose = () => {
        setModalOpened(false);
        setIsEditMode(false);
        setformValues({
            name: '',
            permissions: []
        });
    };
    const onEdit = (rowData: any) => {
        setformValues(rowData);
        setIsEditMode(true);
        onOpen();
    }

    const { groups, isLoading, deleteGroup,
        changePage, pagination, setPageLimit } = useGroup(queryClient);

    const onSubmit = (values: {
        name: string;
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
            deleteGroup({ _id });
        }, 300),
        []
    );

    const columns = [
        { key: 'name', label: 'Name' },
    ];

    return (
        <Stack>
            <Group justify="space-between">
                <Title order={2} ta="center" mt="sm">
                    Groups
                </Title>
                <Group>
                    <CustomModal
                        opened={modalOpened}
                        onClose={onClose}
                        onOpen={onOpen}
                        size='md' title={isEditMode ? "Edit Group" : "Add Group"} buttonText={"Add Group"}>
                        <GroupForm
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
                        data={groups}
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

export default Groups;