import {
    Paper,
    Title,
    Text,
    Container,
    Center,
    Box,
    rem,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import classes from '../../assets/styles/forgot-password.module.css';
import { useForm, isEmail, hasLength } from '@mantine/form';
import { useAuth } from '../../context/AuthContext';
import { ComponentUtils, GroupUtils } from '../../utils/component-utils';
import { useNavigate, useParams } from 'react-router-dom';


const ResetPassword = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const params = useParams()
    const request_form = useForm({
        mode: 'uncontrolled',
        initialValues: { email: '' },
        validate: {
            email: isEmail('Invalid Email'),
        }

    })
    const reset_form = useForm({
        mode: 'uncontrolled',
        initialValues: { new_password: '', confirm_password: '' },
        validate: {
            new_password: hasLength({ min: 3 }, 'Must be at least 3 characters'),
            confirm_password: (value, values) => value === values.new_password ? null : 'Passwords did not match',
        }

    })
    const onSubmitRequest = request_form.onSubmit(async (values) => {
        await auth.send_request({ email: values.email })
    })
    const onSubmitReset = reset_form.onSubmit(async (values) => {
        await auth.reset_password({ new_password: values.new_password, token: params?.token || '' })
        
        navigate('/login')
    })
    const request = [
        {
            type: 'text',
            props: {
                ...request_form.getInputProps('email'),
                key: request_form.key('email'), name: 'email', label: 'Email',
                placeholder: 'Email',
                mt: 'md', required: true,
                type: 'email',
            }

        },
    ];
    const update = [
        {
            type: 'text',
            props: {
                ...reset_form.getInputProps('new_password'),
                key: reset_form.key('new_password'), name: 'new_password', label: 'New Password',
                placeholder: 'Password',
                mt: 'md', required: true,
                type: 'password',
            }
        },
        {
            type: 'text',
            props: {
                ...reset_form.getInputProps('confirm_password'),
                key: reset_form.key('confirm_password'), name: 'confirm_password', label: 'Confirm Password',
                placeholder: 'Password',
                mt: 'md', required: true,
                type: 'password',
            }
        },

    ];
    const footer = [
        {
            props: { justify: 'space-between', mt: 'lg', className: classes.controls },
            children: [
                {
                    type: 'anchor',
                    props: {
                        href: "/login", c: "dimmed", size: "sm", className: classes.control,
                        children: (
                            <Center inline>
                                <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                                <Box ml={5}>Back to the login page</Box>
                            </Center>
                        )
                    }
                },
                {
                    type: 'button',
                    props: {
                        key: 'button', name: 'button', className: classes.control, children: !params.reset_token ? 'Send Request' : 'Reset Password?',
                        type: 'submit'
                    }
                },
            ],
        },
    ]

    return (
        <Container size={460} my={30}>
            <Title className={classes.title} ta="center">
                {!params.reset_token ? 'Forgot your password?' : 'Reset your password?'}
            </Title>
            <Text c="dimmed" fz="sm" ta="center">
                Enter your email to get a reset link
            </Text>

            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                <form onSubmit={!params.reset_token ? onSubmitRequest : onSubmitReset}>
                    {(!params.reset_token ? request : update).map(child => ComponentUtils(child.type, child.props))}
                    {footer.map((group, index) => GroupUtils(index, group.props, group.children))}
                </form>
            </Paper>
        </Container>
    );
}
export default ResetPassword