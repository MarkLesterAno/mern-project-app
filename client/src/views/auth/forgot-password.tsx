import {
    Paper,
    Title,
    Text,
    Container,
    Center,
    Box,
    rem,
} from '@mantine/core';
import classes from '../../assets/styles/authentication.module.css';
import { GroupUtils, ComponentUtils } from '../../utils/component-utils';
import { useAuth } from '../../context/AuthContext';
import { isEmail, useForm } from '@mantine/form';
import { IconArrowLeft } from '@tabler/icons-react';



const ForgotPassword = () => {
    const auth = useAuth()

    const request_form = useForm({
        mode: 'uncontrolled',
        initialValues: { email: '' },
        validate: {
            email: isEmail('Invalid Email'),
        }

    })

    const onSubmitRequest = request_form.onSubmit(async (values) => {
        await auth.send_request({ email: values.email })
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
                        key: 'button', name: 'button', className: classes.control, children: 'Send Request',
                        type: 'submit'
                    },
                },
            ],
        },
    ]



    return (
        <Container size={420} my={40}>
            <Title className={classes.title} ta="center">
                {'Forgot your password?'}
            </Title>
            <Text c="dimmed" fz="sm" ta="center">
                Enter your email to get a reset link
            </Text>

            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                <form onSubmit={onSubmitRequest}>
                    {request.map(child => ComponentUtils(child.type, child.props))}
                    {footer.map((group, index) => GroupUtils(index, group.props, group.children))}
                </form>
            </Paper>
        </Container>
    );
}
export default ForgotPassword