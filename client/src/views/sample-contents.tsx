
import { Grid, Skeleton, Container, Group, MultiSelect, TableOfContents, Button, Paper, Card, Text, ActionIcon, Menu, SimpleGrid } from '@mantine/core';
import usePermission from '../hooks/usePermission';
import { useQueryClient } from 'react-query';
import { useForm, hasLength } from '@mantine/form';
import { ComponentUtils } from '../utils/component-utils';
import { IconDots, IconFileZip, IconEye, IconTrash } from '@tabler/icons-react';
import CustomModal from '../components/custom-modal';


const child = <Skeleton height={140} radius="md" animate={false} />;

const SampleContents = () => {
    // const queryClient = useQueryClient();
    // const { permissions, isLoading, error, fetchPermissions } = usePermission(queryClient)

    const group_form = useForm({
        mode: 'uncontrolled',
        initialValues: { name: '', permissions: [] },
        validate: {
            permissions: hasLength({ min: 4 }, 'Must be at least 4 characters'),
        }
    })
    // const onSubmitRequest = request_form.onSubmit(async (values) => {
    //     await auth.send_invite({ email: values.email })
    // })
    const children = [
        {
            type: 'text',
            props: {
                ...group_form.getInputProps('name'),
                key: group_form.key('name'), name: 'name', label: 'Group Name',
                placeholder: 'ex. Managers',
                required: true,
                type: 'text',
            }
        },
        // {
        //     type: 'multiSelect',
        //     props: {
        //         ...group_form.getInputProps('permissions'),
        //         key: group_form.key('permissions'), name: 'permissions', label: 'Permissions',
        //         placeholder: 'Select permissions',
        //         required: true,
        //         searchable: true,
        //         data: permissions.map((permission: any) => (
        //             {
        //                 value: permission._id,
        //                 label: `${permission.content_type} | ${permission.description}`
        //             })),
        //     }
        // },
    ];
    const footer = [
        {
            type: 'group',
            props: { justify: 'space-between',  },
            children: [
                {
                    type: 'button',
                    props: {
                        key: 'button', name: 'button', children: 'Send Invite',
                        type: 'submit'
                    },
                },
            ],
        },
    ]

    return (
        <Container my="md">
            <Grid>

                <CustomModal title="Create Group" buttonText="Create Group"  >
                    <form>
                        {children.map(child => ComponentUtils(child.type, child.props))}
                        {footer.map((group, index) => ComponentUtils(group.type, group.props, group.children))}
                    </form>
                </CustomModal>
                <Grid.Col span={{ base: 12, xs: 4 }}>
                    
                </Grid.Col>
            </Grid>
        </Container>
    );
}
export default SampleContents;