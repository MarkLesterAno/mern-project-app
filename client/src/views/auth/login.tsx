import {
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
    Group,
    Checkbox,
    TextInput,
    PasswordInput,
} from '@mantine/core';
import { useForm, hasLength, isEmail } from '@mantine/form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import classes from '../../assets/styles/authentication.module.css';

const Login = () => {
    const { isLoading, login } = useAuth();
    const navigate = useNavigate();

    // Form configuration
    const form = useForm({
        initialValues: {
            username: '',
            password: '',
            rememberMe: false,
        },
        validate: {
            username: isEmail('Invalid email'),
            password: hasLength({ min: 3 }, 'Must be at least 3 characters'),
        },
    });

    // Handle form submission
    const handleSubmit = async (values: typeof form.values) => {
        try {
            await login({
                username: values.username,
                password: values.password,
            });
            navigate('/'); // Redirect to the root view after successful login
        } catch (err: any) {
            console.error(err.message); // Handle error (e.g., show notification)
        }
    };

    return (
        <Container size={420} my={40}>
            {/* Title Section */}
            <Title ta="center" className={classes.title}>
                Welcome back!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="a" href="/auth/register">
                    Create account
                </Anchor>
            </Text>

            {/* Login Form */}
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    {/* Username Field */}
                    <TextInput
                        label="Username"
                        placeholder="Enter your email"
                        required
                        mt="md"
                        {...form.getInputProps('username')}
                    />

                    {/* Password Field */}
                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        required
                        mt="md"
                        {...form.getInputProps('password')}
                    />

                    {/* Remember Me and Forgot Password */}
                    <Group justify='space-between' mt="lg">
                        <Checkbox
                            label="Remember Me"
                            {...form.getInputProps('rememberMe', { type: 'checkbox' })}
                        />
                        <Anchor size="sm" href="/auth/reset-password" c="dimmed">
                            Forgot password?
                        </Anchor>
                    </Group>

                    {/* Submit Button */}
                    <Button type="submit" loading={isLoading} fullWidth mt="xl">
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;