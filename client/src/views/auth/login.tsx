import {
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
} from '@mantine/core';
import classes from '../../assets/styles/authentication.module.css';
import { GroupUtils, ComponentUtils } from '../../utils/component-utils';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { hasLength, isEmail, useForm } from '@mantine/form';



const Login = () => {
    const auth = useAuth()
    const navigate = useNavigate();

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

    useEffect(() => {
        auth.isLoggedIn() ? navigate('/') : navigate('/login')
    }, [])


    const children = [
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

    const groups = [
        {
            props: { justify: 'space-between', mt: 'lg' },
            children: [
                {
                    type: 'checkbox',
                    props: {
                        key: form.key('rememberMe'), name: 'rememberMe', label: 'Remember Me', type: 'checkbox',
                        ...form.getInputProps('rememberMe'),
                    }
                },
                {
                    type: 'anchor',
                    props: {
                        key: 'anchor', name: 'anchor', component: 'a', size: "sm", children: 'Forgot password?',
                        href: '/auth/reset-password',
                        c: "dimmed"
                    }
                },
            ],
        },
    ]

    const onSubmit = form.onSubmit(async (values) => {
        await auth.login({
            username: values.username,
            password: values.password,
        })
        auth.isLoggedIn() ? navigate('/') : navigate('/login')
    })

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Welcome back!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button">
                    Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={onSubmit} >
                    {children.map(child => ComponentUtils(child.type, child.props))}
                    {groups.map((group, index) => GroupUtils(index, group.props, group.children))}

                    <Button type='submit' fullWidth mt="xl">
                        Sign in
                    </Button>
                </form>

            </Paper>
        </Container>
    );
}
export default Login