
import { useForm } from '@mantine/form';
import { ComponentUtils, GroupUtils } from '../../../utils/component-utils';
import { useState } from 'react';
import { rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconExclamationCircle } from '@tabler/icons-react';


const AddGroup = ({ permissions, createGroup }: any) => {
    const [groupPermissions, setGroupPermissions] = useState<string[]>([]);
    const group_form = useForm({
        mode: 'uncontrolled',
        initialValues: { name: '', permissions: groupPermissions },
    });
    const onSubmitRequest = group_form.onSubmit(async (values) => {
        const response = await createGroup({ name: values.name, permissions: groupPermissions })
        notifications.show({
            id: 'groups',
            title: 'Groups',
            message: !response.message ? 'Group created successfully.' : response.message,
            icon: <IconExclamationCircle style={{ width: rem(20), height: rem(20) }} />,
            color: "blue"
        })
        group_form.reset()
        setGroupPermissions([])
    })
    const data = permissions.map((permission: any) => (
        {
            value: permission.name,
            label: `${permission.content_type} | ${permission.description}`
        }))
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
        {
            type: 'multiSelect',
            props: {
                ...group_form.getInputProps('permissions'),
                key: group_form.key('permissions'), name: 'permissions', label: 'Permissions',
                placeholder: 'Select permissions',
                required: true,
                searchable: true,
                data: data,
                value: groupPermissions,
                onChange: setGroupPermissions
                
            }
        },
    ];
    const footer = [
        {
            props: { justify: 'space-between', },
            children: [
                {
                    type: 'button',
                    props: {
                        key: 'button', name: 'button', children: 'Add Group',
                        type: 'submit'
                    },
                },
            ],
        },
    ]

    return (
        <form onSubmit={onSubmitRequest}>
            {children.map(child => ComponentUtils(child.type, child.props))}
            {footer.map((group, index) => GroupUtils(index, group.props, group.children))}
        </form>
    );
}
export default AddGroup;