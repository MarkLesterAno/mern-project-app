import { Button, Grid, Group, Tabs, TextInput, Title, rem } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings, IconNetwork, IconDownload, IconArrowRight, IconClearAll, IconPlus } from '@tabler/icons-react';
import DialogUtils from '../../../utils/dialog-utils';
import TextUtils from '../../../utils/text-utils';
import { useForm } from '@mantine/form';
import { useQueryClient } from 'react-query';
import { useDisclosure } from '@mantine/hooks';
import { ComponentUtils } from '../../../utils/component-utils';
import useDevices from '../../../hooks/useDevice';

const Servers = () => {
    const iconStyle = { width: rem(12), height: rem(12) };
    const queryClient = useQueryClient();
    const [opened, { open, close }] = useDisclosure(false);

    const { devices, isLoading, error,
        createDevice, updateDevice, deleteDevice,
        changePage, pagination } = useDevices(queryClient);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            ranges: '',

        },
        validate: {
            ranges: (value) => (!TextUtils.ipAddress.test(value) ? 'Invalid IP Address' : null),
        },
    })

    const fields = [
        {
            type: 'text',
            props: { ...form.getInputProps('name'), key: form.key('name'), name: 'name' }
        },

        {
            type: 'text',
            props: { ...form.getInputProps('ip_address'), key: form.key('ip_address'), name: 'ip_address' }

        },

    ];
    const onSubmit = form.onSubmit((values) => {
        // setTimeout(() => {
        //     createDevice(values)
        //     close()
        // }, 2000)
    })

    return (
        <>
            <Grid mt={'lg'} mb={'lg'} align='middle'>
                <Grid.Col span={10} >
                    <Title order={2}>PPPOE</Title>
                </Grid.Col>

                <Grid.Col span={2} >
                    <DialogUtils
                        icon={<IconNetwork />}
                        title='Add Pool'
                        variant='blue'
                        opened={opened}
                        open={open}
                        close={close}
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                    >
                        <Grid.Col span={6}>
                            {fields.map(child => ComponentUtils(child.type, child.props))}
                            <Group justify="right" mt={'md'}>
                                <Button leftSection={<IconClearAll size={14} />} variant="default">
                                    Clear
                                </Button>

                                <Button rightSection={<IconPlus size={14} />}>Add</Button>

                            </Group>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            
                        </Grid.Col>
                    </DialogUtils>
                </Grid.Col>
            </Grid>
            <Tabs variant="pills" defaultValue="interfaces">
                <Tabs.List>
                    <Tabs.Tab value="interfaces" leftSection={<IconPhoto style={iconStyle} />}>
                        Interfaces
                    </Tabs.Tab>
                    <Tabs.Tab value="servers" leftSection={<IconPhoto style={iconStyle} />}>
                        Servers
                    </Tabs.Tab>
                    <Tabs.Tab value="active-connections" leftSection={<IconMessageCircle style={iconStyle} />}>
                        Active Connections
                    </Tabs.Tab>

                </Tabs.List>

                <Tabs.Panel value="interfaces">
                    Gallery tab content
                </Tabs.Panel>

                <Tabs.Panel value="servers">
                    Messages tab content
                </Tabs.Panel>
                <Tabs.Panel value="active-connections">
                    Messages tab content
                </Tabs.Panel>


            </Tabs>
        </>
    );
}

export default Servers

