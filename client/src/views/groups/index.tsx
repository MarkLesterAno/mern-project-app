import {
    Grid, Container, Group, Title, Center, Table, UnstyledButton,
    ScrollArea, TextInput, Text, Checkbox, ActionIcon, rem, Select,
    LoadingOverlay,
    Pill
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
import useGroup from '../../hooks/useGroup';
import AddGroup from './components/add-group';
import usePermission from '../../hooks/usePermission';

interface RowData {
    _id: string;
    name: string;
    permissions: string[];
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
            return (b[sortBy] as string).localeCompare(a[sortBy] as string);
        }
        return (a[sortBy] as string).localeCompare(b[sortBy] as string);
    });
}

const Groups = () => {
    const [, setScrolled] = useState(false);
    const [search, setSearch] = useState('');
    const queryClient = useQueryClient();
    const{permissions} =usePermission(queryClient)
    const { groups, isLoading, error, searchGroup, fetchGroups, createGroup,
        deleteGroup, pagination, changePage, setPageLimit } = useGroup(queryClient);
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const [sortedData, setSortedData] = useState<RowData[]>([]);

    useEffect(() => {
        if (groups) {
            setSortedData(sortData(groups, { sortBy, reversed: reverseSortDirection, search }));
        }
    }, [groups, sortBy, reverseSortDirection, search]);

    const setSorting = (field: keyof RowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(groups, { sortBy: field, reversed, search }));
    };

    const debouncedSearchGroup = useCallback(
        debounce((value: string) => {
            searchGroup(value);
        }, 300),
        []
    );

    const debouncedDeleteGroup = useCallback(
        debounce((_id: any) => {
            deleteGroup({ _id });
        }, 300),
        []
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        !value ? fetchGroups({}) : debouncedSearchGroup(value);
    };

    const rows = sortedData.map((row: any) => (
        <Table.Tr key={row._id}>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>
                <Group>
                    {row.permissions.map((permission: any) => {
                        return (<Pill key={permission.name}>{`${permission.content_type} | ${permission.description}`}</Pill>)
                    })}
                </Group>
            </Table.Td>
            <Table.Td>
                <Group justify="start">
                    <ActionIcon variant="light" aria-label="Settings" color="orange" >
                        <IconEdit style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="light" aria-label="Settings" color="red" loading={isLoading} onClick={() => debouncedDeleteGroup(row._id)}>
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
                    Groups
                </Title>

                <CustomModal title='Create Group' buttonText={"Add Group"}>
                    <AddGroup permissions={permissions} createGroup={createGroup}/>
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
                                        sorted={sortBy === 'name'}
                                        reversed={reverseSortDirection}
                                        onSort={() => setSorting('name')}
                                    >
                                        Name
                                    </Th>
                                    <Table.Th>
                                        Permissions
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
                                        <Table.Td colSpan={3}>
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

export default Groups;