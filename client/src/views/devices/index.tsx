
import { Grid, Skeleton, Table, ActionIcon, Group, rem, UnstyledButton, Center, Text, Title, TextInput, ScrollArea } from '@mantine/core';
import { useEffect, useState } from 'react';
import DeviceService from '../../services/DeviceService';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { SortPayload, sortData } from '../../utils/data-utils';
import IDevice from '../../interfaces/IDevice';
import { IconChevronDown, IconChevronUp, IconEdit, IconEye, IconNetwork, IconSearch, IconSelector, IconTrash } from '@tabler/icons-react';
import CustomPagination from '../../components/custom-pagination';
import IThProps from '../../interfaces/IThProp';
import classes from '../../assets/styles/table-sort.module.css';
import DialogUtils from '../../utils/dialog-utils';
import { ComponentUtils } from '../../utils/component-utils';
import { useDisclosure } from '@mantine/hooks';
import TextUtils from '../../utils/text-utils';
import useDevices from '../../hooks/useDevice';
import { useNavigate } from 'react-router-dom';


const api = new DeviceService();

const Devices = () => {
    const navigate = useNavigate()
    //#region INITIALIZZTIONS
    const [opened, { open, close }] = useDisclosure(false);
    const queryClient = useQueryClient();
    const { devices, isLoading, error,
        createDevice, updateDevice, deleteDevice,
        changePage, pagination } = useDevices(queryClient);


    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            mac_address: '',
            ip_address: '',
            username: '',
            password: '',
        },
        validate: {
            mac_address: (value) => (!TextUtils.macAddress.test(value) ? 'Invalid MAC Address' : null),
            ip_address: (value) => (!TextUtils.ipAddress.test(value) ? 'Invalid IP Address' : null),
        },
    })

    const headers = [
        { key: 'name', title: 'Name' },
        { key: 'mac-address', title: 'MAC Address' },
        { key: 'ip-address', title: 'IP Address' },
    ]
    //#endregion


    const [sortPayload, setSortPayload] = useState<SortPayload<IDevice>>({
        sortBy: 'name',
        reversed: false,
        search: '',
    });

    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<keyof IDevice | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const [sortedData, setSortedData] = useState(devices);


    //#region SORTING FUNCTION
    const setSorting = (field: keyof IDevice) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(devices, sortPayload));
    };
    //#endregion

    //#region  HANDLE SEARCH FUNCTION
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSortPayload({ sortBy, reversed: reverseSortDirection, search: value })
        setSearch(value);
        setSortedData(sortData(devices, sortPayload));
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


    const onSubmit = form.onSubmit((values) => {
        setTimeout(() => {
            createDevice(values)
            close()
        }, 2000)
    })

    //#region TABLE DATA COMPONENT
    const mapData = (data: any) => {
        return data.map((row: any) => (
            <Table.Tr key={row._id}>
                <Table.Td>{row.name}</Table.Td>
                <Table.Td>{row.ip_address}</Table.Td>
                <Table.Td>{row.mac_address}</Table.Td>
                <Table.Td>
                    <Group justify="center">
                        <ActionIcon variant="light" aria-label="Settings" color="blue" onClick={() => navigate(`/device/${row._id}`)}>
                            <IconEye style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon variant="light" aria-label="Settings" color="orange">
                            <IconEdit style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon variant="light" aria-label="Settings" color="red" onClick={() => deleteDevice({ _id: row._id })}>
                            <IconTrash style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </Table.Td>
            </Table.Tr>
        ))
    }
    //#region
    const fields = [
        {
            type: 'text',
            props: { ...form.getInputProps('name'), key: form.key('name'), name: 'name' }
        },
        {
            type: 'text',
            props: { ...form.getInputProps('mac_address'), key: form.key('mac_address'), name: 'mac_address' }

        },
        {
            type: 'text',
            props: { ...form.getInputProps('ip_address'), key: form.key('ip_address'), name: 'ip_address' }

        },
        {
            type: 'text',
            props: { ...form.getInputProps('username'), key: form.key('username'), name: 'username', }

        },
        {
            type: 'password',
            props: { ...form.getInputProps('password'), key: form.key('password'), name: 'password', }

        },
    ];



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
                <Grid.Col span={2} >
                    <DialogUtils
                        icon={<IconNetwork />}
                        title='Add Devices'
                        variant='blue'
                        opened={opened}
                        open={open}
                        close={close}
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                    >
                        {fields.map(child => ComponentUtils(child.type, child.props))}
                    </DialogUtils>
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col span={12}>
                    <ScrollArea>
                        <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
                            <Table.Tbody>
                                <Table.Tr>
                                    {tableHeaders}
                                </Table.Tr>
                            </Table.Tbody>
                            <Table.Tbody>
                                {devices && devices.length > 0 ? (mapData(devices)) : sortedData && sortedData.length > 0 ? (mapData(sortedData))
                                    : (
                                        <Table.Tr>
                                            <Table.Td colSpan={0}>
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
            </Grid>
            <Grid justify='flex-end' mt={"lg"}>
                <Grid.Col span={8} >
                    <CustomPagination onChange={(page: any) => changePage(page)} pagination={pagination} />
                </Grid.Col>
            </Grid>
        </>
    );
}
export default Devices;