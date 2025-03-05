import {
    Grid, Container, Group, Title, Center, Table, UnstyledButton,
    ScrollArea, TextInput, Text, Checkbox, ActionIcon, rem, Select,
    LoadingOverlay
} from '@mantine/core';
import {
    IconChevronDown, IconChevronUp, IconEdit, IconSearch,
    IconSelector, IconTrash
} from '@tabler/icons-react';
import { useEffect, useState, useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { debounce } from 'lodash';

import classes from '../../assets/styles/table-sort.module.css';
import CustomModal from '../../components/custom-modal';
import CustomPagination from '../../components/custom-pagination';
import Invite from '../auth/forms/invite';
import useUsers from '../../hooks/useUser';

interface RowData {
    _id: string;
    email: string;
    username: string;
    isActive: string;
    isStaff: string;
    isSuperuser: string;
}

interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort: () => void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
        <Table.Th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group justify="space-between">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon size={16} stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </Table.Th>
    );
}

function sortData(
    data: RowData[],
    payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
    const { sortBy } = payload;

    if (!sortBy) {
        return data;
    }

    return [...data].sort((a, b) => {
        if (payload.reversed) {
            return b[sortBy].localeCompare(a[sortBy]);
        }
        return a[sortBy].localeCompare(b[sortBy]);
    });
}

const Users = () => {
    const [, setScrolled] = useState(false);
    const [search, setSearch] = useState('');
    const queryClient = useQueryClient();
    const { users, isLoading, error, searchUser, fetchUsers,
        createUser, updateUser, patchUser, deleteUser,
        changePage, pagination, setPageLimit } = useUsers(queryClient);
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const [sortedData, setSortedData] = useState<RowData[]>([]);

    useEffect(() => {
        if (users) {
            setSortedData(sortData(users, { sortBy, reversed: reverseSortDirection, search }));
        }
    }, [users, sortBy, reverseSortDirection, search]);

    const setSorting = (field: keyof RowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(users, { sortBy: field, reversed, search }));
    };

    const debouncedSearchUser = useCallback(
        debounce((value: string) => {
            searchUser(value);
        }, 300),
        []
    );

    const debouncedDeleteUser = useCallback(
        debounce((_id: any) => {
            deleteUser({ _id });
        }, 300),
        []
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        !value ? fetchUsers({}) : debouncedSearchUser(value);
    };

    const rows = sortedData.map((row: any) => (
        <Table.Tr key={row._id}>
            <Table.Td>{row.email}</Table.Td>
            <Table.Td>{row.username}</Table.Td>
            <Table.Td><Checkbox checked={row.isActive} disabled /></Table.Td>
            <Table.Td><Checkbox checked={row.isStaff} disabled /></Table.Td>
            <Table.Td><Checkbox checked={row.isSuperuser} disabled /></Table.Td>
            <Table.Td>
                <Group justify="start">
                    <ActionIcon variant="light" aria-label="Settings" color="orange" >
                        <IconEdit style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="light" aria-label="Settings" color="red" loading={isLoading} onClick={() => debouncedDeleteUser(row._id)}>
                        <IconTrash style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Container fluid>
            <Group justify="space-between">
                <Title order={2} ta="center" mt="sm">
                    Users
                </Title>

                <CustomModal title='Signup Invitation' buttonText={"Send Invite"}>
                    <Invite />
                </CustomModal>
            </Group>
            <Grid>
                <Grid.Col span={{ base: 24, xs: 12 }}>
                    <TextInput
                        placeholder="Search by any field"
                        mb="md"
                        leftSection={<IconSearch size={16} stroke={1.5} />}
                        value={search}
                        onChange={handleSearchChange}
                    />
                    <ScrollArea h={'calc(100vh - 280px)'} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                    <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                        <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed" striped>
                            <Table.Tbody>
                                <Table.Tr>
                                    <Th
                                        sorted={sortBy === 'email'}
                                        reversed={reverseSortDirection}
                                        onSort={() => setSorting('email')}
                                    >
                                        Email
                                    </Th>
                                    <Th
                                        sorted={sortBy === 'username'}
                                        reversed={reverseSortDirection}
                                        onSort={() => setSorting('username')}
                                    >
                                        Username
                                    </Th>
                                    <Table.Th>
                                        isActive
                                    </Table.Th>
                                    <Table.Th>
                                        isStaff
                                    </Table.Th>
                                    <Table.Th>
                                        isSuperuser
                                    </Table.Th>
                                    <Table.Th>
                                        Actions
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Tbody>
                            <Table.Tbody>
                                {rows.length > 0 ? (
                                    rows
                                ) : (
                                    <Table.Tr>
                                        <Table.Td colSpan={5}>
                                            <Text fw={500} ta="center">
                                                Nothing found
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                )}
                            </Table.Tbody>
                        </Table>
                    </ScrollArea>
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 12 }}>
                    <CustomPagination changePage={changePage} pagination={pagination} setPageLimit={setPageLimit} />
                </Grid.Col>
            </Grid>
        </Container>
    );
}

export default Users;