import { useState } from 'react';
import {
    Table,
    UnstyledButton,
    Group,
    Text,
    Center,
    TextInput,
    rem,
    keys,
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from '../assets/styles/table-sort.module.css';
import ICompany from '../interfaces/ICompany';
import IThProps from '../interfaces/IThProp';


const Th = ({ children, reversed, sorted, onSort }: IThProps) => {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
        <Table.Th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group justify="space-between">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </Table.Th>
    );
}

const filterData = (data: ICompany[], search: string) => {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
    );
}

const sortData = (
    data: ICompany[],
    payload: { sortBy: keyof ICompany | null; reversed: boolean; search: string }
) => {
    const { sortBy } = payload;

    if (!sortBy) {
        return filterData(data, payload.search);
    }

    return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return b[sortBy].localeCompare(a[sortBy]);
            }

            return a[sortBy].localeCompare(b[sortBy]);
        }),
        payload.search
    );
}

const data = [
    {
        name: 'Athena Weissnat',
        description: 'Little - Rippin',
        email: 'Elouise.Prohaska@yahoo.com',
    },
    {
        name: 'Deangelo Runolfsson',
        description: 'Greenfelder - Krajcik',
        email: 'Kadin_Trantow87@yahoo.com',
    },
    {
        name: 'Danny Carter',
        description: 'Kohler and Sons',
        email: 'Marina3@hotmail.com',
    },
    {
        name: 'Trace Tremblay PhD',
        description: 'Crona, Aufderhar and Senger',
        email: 'Antonina.Pouros@yahoo.com',
    },
    {
        name: 'Derek Dibbert',
        description: 'Gottlieb LLC',
        email: 'Abagail29@hotmail.com',
    },
    {
        name: 'Viola Bernhard',
        description: 'Funk, Rohan and Kreiger',
        email: 'Jamie23@hotmail.com',
    },
    {
        name: 'Austin Jacobi',
        description: 'Botsford - Corwin',
        email: 'Genesis42@yahoo.com',
    },
    {
        name: 'Hershel Mosciski',
        description: 'Okuneva, Farrell and Kilback',
        email: 'Idella.Stehr28@yahoo.com',
    },
    {
        name: 'Mylene Ebert',
        description: 'Kirlin and Sons',
        email: 'Hildegard17@hotmail.com',
    },
    {
        name: 'Lou Trantow',
        description: 'Parisian - Lemke',
        email: 'Hillard.Barrows1@hotmail.com',
    },
    {
        name: 'Dariana Weimann',
        description: 'Schowalter - Donnelly',
        email: 'Colleen80@gmail.com',
    },
    {
        name: 'Dr. Christy Herman',
        description: 'VonRueden - Labadie',
        email: 'Lilyan98@gmail.com',
    },
    {
        name: 'Katelin Schuster',
        description: 'Jacobson - Smitham',
        email: 'Erich_Brekke76@gmail.com',
    },
    {
        name: 'Melyna Macejkovic',
        description: 'Schuster LLC',
        email: 'Kylee4@yahoo.com',
    },
    {
        name: 'Pinkie Rice',
        description: 'Wolf, Trantow and Zulauf',
        email: 'Fiona.Kutch@hotmail.com',
    },
    {
        name: 'Brain Kreiger',
        description: 'Lueilwitz Group',
        email: 'Rico98@hotmail.com',
    },
];

export const TableSort = () => {

    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState<keyof ICompany | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const setSorting = (field: keyof ICompany) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const rows = sortedData.map((row: any) => (
        <Table.Tr key={row.name}>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>{row.email}</Table.Td>
            <Table.Td>{row.description}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Table.ScrollContainer minWidth={500}>
            <TextInput
                placeholder="Search by any field"
                mb="md"
                leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                value={search}
                onChange={handleSearchChange}
            />
            <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
                <Table.Tbody>
                    <Table.Tr>
                        <Th
                            sorted={sortBy === 'name'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('name')}
                        >
                            Name
                        </Th>
                        <Th
                            sorted={sortBy === 'email'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('email')}
                        >
                            Email
                        </Th>
                        <Th
                            sorted={sortBy === 'description'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('description')}
                        >
                            Company
                        </Th>
                    </Table.Tr>
                </Table.Tbody>
                <Table.Tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                        <Table.Tr>
                            <Table.Td colSpan={Object.keys(data[0]).length}>
                                <Text fw={500} ta="center">
                                    Nothing found
                                </Text>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}