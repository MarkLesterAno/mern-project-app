import React, { useState } from 'react';
import {
    ScrollArea,
    Table,
    TextInput,
    Text,
    Group,
    Checkbox,
    Center,
    UnstyledButton,
    LoadingOverlay,
    Grid,
    ActionIcon,
    Stack,
} from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconEdit, IconSearch, IconSelector, IconTrash } from '@tabler/icons-react';
import cx from 'clsx';
import classes from '../assets/styles/table-sort.module.css';

interface RowData {
    [key: string]: string | boolean;
}

interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort: () => void;
}

interface SortableTableProps {
    data: RowData[];
    columns: { key: keyof RowData; label: string }[];
    children?: React.ReactNode;
    loading: boolean;
    onEdit: (row: RowData) => void;
    onDelete: (_id: string) => void;
}

export const SortableTable: React.FC<SortableTableProps> = ({ data, columns, loading, onEdit, onDelete, children }) => {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const [loadingRow, setLoadingRow] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);

    // Filter data based on the search query
    const filteredData = data.filter((item) =>
        Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(search.toLowerCase())
        )
    );

    // Sort data based on the selected column
    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortBy) return 0;

        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return reverseSortDirection
                ? bValue.localeCompare(aValue)
                : aValue.localeCompare(bValue);
        }

        return 0;
    });

    const handleEdit = async (row: RowData) => {
        onEdit(row);
    };

    const handleDelete = async (_id: string) => {
        setLoadingRow(_id);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2 seconds delay
        onDelete(_id);
        setLoadingRow(null);
    };


    const setSorting = (field: keyof RowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
    };

    const renderValue = (value: any) => {
        switch (typeof value) {
            case 'boolean':
                return <Checkbox checked={value} disabled />;
            default:
                return value;
        }
    };

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

    const rows = sortedData.map((row, index) => (
        <Table.Tr key={index}>
            {columns.map((column) => {
                return (
                    <Table.Td key={column.key as string}>{renderValue(row[column.key])}</Table.Td>
                )
            })}
            <Table.Td>
                <Group gap="xs">
                    <ActionIcon
                        variant="filled"
                        aria-label="Edit Action"
                        onClick={() => handleEdit(row)}
                    >
                        <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon
                        variant="filled"
                        aria-label="Delete Action"
                        onClick={() => handleDelete(row._id as string)}
                        loading={loadingRow === (row._id as string)}
                        loaderProps={{ type: 'dots' }}
                    >
                        <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Stack gap={"xs"}>
            <TextInput
                placeholder="Search by any field"
                mb="md"
                leftSection={<IconSearch size={16} stroke={1.5} />}
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
            />
            <ScrollArea h={600} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                <Table miw={1050} horizontalSpacing="md" verticalSpacing="xs" layout="fixed">
                    <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                        <Table.Tr>
                            {columns.map((column) => (
                                <Th
                                    key={column.key as string}
                                    sorted={sortBy === column.key}
                                    reversed={reverseSortDirection}
                                    onSort={() => setSorting(column.key)}
                                >
                                    {column.label}
                                </Th>
                            ))}
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows.length > 0 ? (
                            rows
                        ) : (
                            <Table.Tr>
                                <Table.Td colSpan={columns.length + 1}>
                                    <Text fw={500} ta="center">
                                        Nothing found
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        )}
                    </Table.Tbody>
                </Table>
            </ScrollArea>
            { children}
        </Stack>

    );
};