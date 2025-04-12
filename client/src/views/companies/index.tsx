import { useState } from 'react';
import {
    Title,
    Table,
    UnstyledButton,
    Button,
    Group,
    Text,
    Center,
    ActionIcon,
    Grid
}
    from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch, IconTrash, IconEdit, IconEye, IconUserPlus } from '@tabler/icons-react';
import classes from '../../assets/styles/table-sort.module.css';
import ICompany from '../../interfaces/ICompany';
import IThProps from '../../interfaces/IThProp';
import CustomPagination from '../../components/custom-pagination';
import CompanyService from '../../services/CompanyService';
import { TextInput, rem } from '@mantine/core';
import { sortData, SortPayload } from '../../utils/data-utils';
import DialogUtils from '../../utils/dialog-utils';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { ComponentUtils } from '../../utils/component-utils';

const api = new CompanyService();

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

const headers = [
    {
        key: 'name',
        title: 'Name'
    },
    {
        key: 'email',
        title: 'Email'
    },
    {
        key: 'company',
        title: 'Company'
    },

]


const Companies = () => {
    //#region INITIALIZZTIONS
    const [companies, setCompanies] = useState(data);

    const [sortPayload, setSortPayload] = useState<SortPayload<ICompany>>({
        sortBy: 'name',
        reversed: false,
        search: '',
    });

    const [pagination, setPagination] = useState({
        page: 1,
        size: 10,
        total: 0
    })

    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState<keyof ICompany | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            password: '',
            rememberMe: false,
        },
        validate: {
            username: isEmail('Invalid email'),
            password: hasLength({ min: 3 }, 'Must be at least 3 characters'),
        },
    })
    //#endregion


    //#region GET API DATA FUNCTION
    const getCompanies = async (page: any) => {

        pagination.page = page;
        const result = await api.getComapnies({
            limit: pagination.size,
            page: page
        })

        pagination.total = result.count
        setPagination(pagination);

        console.log(result)
    }
    //#endregion


    //#region SORTING FUNCTION
    const setSorting = (field: keyof ICompany) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, sortPayload));
    };
    //#endregion

    //#region  HANDLE SEARCH FUNCTION
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSortPayload({ sortBy, reversed: reverseSortDirection, search: value })
        setSearch(value);
        setSortedData(sortData(data, sortPayload));
    };
    //#endregion
    //#region TABLE HEADER COMPONENTS
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

    const tableHeaders = headers.map((header: any) => (
        <Th
            sorted={sortBy === header.key}
            reversed={reverseSortDirection}
            onSort={() => setSorting(header.key)}
        >
            {header.title}
        </Th>
    ));
    //#endregion

    //#region TABLE DATA COMPONENT
    const rows = sortedData.map((row: any) => (
        <Table.Tr key={row.name}>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>{row.email}</Table.Td>
            <Table.Td>{row.description}</Table.Td>
            <Table.Td>
                <Group justify="center">
                    <ActionIcon variant="light" aria-label="Settings" color="blue">
                        <IconEye style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="light" aria-label="Settings" color="orange">
                        <IconEdit style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="light" aria-label="Settings" color="red">
                        <IconTrash style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));
    //#region
    const fields = [
        {
            type: 'text',
            props: {
                ...form.getInputProps('username'),
                key: form.key('username'), name: 'username', label: 'Username',
                placeholder: 'Username',
                mt: 'md', required: true,
                type: 'text',
            }
        },
        {
            type: 'password',
            props: {
                ...form.getInputProps('password'),
                key: form.key('password'), name: 'password', label: 'Password',
                placeholder: 'Password',
                mt: 'md', required: true,
                type: 'password',
            }

        },
    ];

    const handleCreate = () => {

    }

    const handleConfirm = () => console.log('Confirmed')
    const handleCancel = () => console.log('Cancelled')

    return (
        <>
            <Grid mt={'lg'}>
                <Grid.Col span={5} >
                    <Title order={2}>Companies</Title>
                </Grid.Col>
                <Grid.Col span={5} >
                    <TextInput
                        placeholder="Search by any field"
                        mb="md"
                        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                        value={search}
                        onChange={handleSearchChange}
                    />
                </Grid.Col>
                <Grid.Col span={2} flex={'end'}>
                    <DialogUtils
                        title='Add Company'
                        variant='blue'>
                        {fields.map(child => ComponentUtils(child.type, child.props))}
                    </DialogUtils>
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col span={12}>
                    <Table horizontalSpacing="md" verticalSpacing="xs" layout="fixed">
                        <Table.Tbody>
                            <Table.Tr>
                                {tableHeaders}
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
                </Grid.Col>
            </Grid>
            <Grid justify='flex-end' mt={"lg"}>
                <Grid.Col span={8} >
                    <CustomPagination onChange={(page: any) => getCompanies(page)} pagination={pagination} />
                </Grid.Col>
            </Grid>
        </>
    );
}

export default Companies;