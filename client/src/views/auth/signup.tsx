import {
    Paper,
    Title,
    Text,
    Container,
    Button,
} from '@mantine/core';
import classes from '../../assets/styles/authentication.module.css';
import { ComponentUtils } from '../../utils/component-utils';
import { isEmail,hasLength, useForm } from '@mantine/form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
const SignUp = () => {
    const auth = useAuth()
    const params = useParams()
    const navigate = useNavigate()
    const signup_form = useForm({
        mode: 'uncontrolled',
        initialValues: { email: '', username: '', password: '', confirmPassword: '' },
        validate: {
            email: isEmail('Invalid Email'),
            password: hasLength({ min: 8 }, 'Must be at least 8 characters'),
            username: hasLength({ min: 8 }, 'Must be at least 8 characters'),
            confirmPassword: (value, values) =>
                value !== values.password ? 'Passwords did not match' : null
        }
    })

    if (!params.token) {
        navigate('/login')
    }

    const onSubmitRequest = signup_form.onSubmit(async (values) => {
        await auth.complete_signup({ email: values.email, username: values.username, password: values.password, token: params.token || '' })
    })

    const children = [
        {
            key: 'email', name: 'email', label: 'Email', type: 'email', placeholder: 'you@mantine.dev',
            ...signup_form.getInputProps('email'), mt: 'md', required: true
        },
        {
            key: 'username', name: 'username', label: 'Username', type: 'text', placeholder: 'username',
            ...signup_form.getInputProps('username'), mt: 'md', required: true
        },
        {
            key: 'password', name: 'password', label: 'Password', type: 'password', placeholder: 'password',
            ...signup_form.getInputProps('password'), mt: 'md', required: true
        },
        {
            key: 'confirm_password', name: 'confirm_password', label: 'Confirm Password', type: 'password', placeholder: 'password',
            ...signup_form.getInputProps('confirmPassword'), mt: 'md', required: true
        },
    ];

    return (
        <Container size={460} my={30}>
            <Title ta="center" className={classes.title}>
                Sign Up
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
            </Text>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={onSubmitRequest}>
                {children.map(child => ComponentUtils(child.type, child))}
                <Button type='submit' fullWidth mt="xl">
                    Submit
                </Button>
                </form>
                
            </Paper>
        </Container>
    );
}

export default SignUp