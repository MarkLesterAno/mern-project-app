import { Group, Text, Title } from '@mantine/core';

import { IconXboxX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

const DialogUtils = ({ icon, title, children, variant, onSubmit, opened, open, close, isLoading }: any) => {
    return (
        <>
            <Modal
                size={'50rem'}
                centered
                opened={opened}
                onClose={close}
                title={
                    <Title>
                        <Group>
                            {icon}
                            <Text size="sm">
                                {title}
                            </Text>
                        </Group>
                    </Title>
                }
                closeButtonProps={{
                    icon: <IconXboxX size={20} stroke={1.5} />,
                }}
            >
                <form onSubmit={onSubmit} >
                    {children}
                    <Group gap={7} mt="xl" justify='flex-end'>
                        <Button variant='light' onClick={close}>Cancel</Button>
                        <Button loading={isLoading} type='submit'>Save</Button>
                    </Group>
                </form>
            </Modal>

            <Button onClick={open} variant={variant}>{title}</Button>
        </>
    );
}

const MultiDialogUtils = ({ icon, title, children, variant, onSubmit, opened, open, close, isLoading }: any) => {
    return (
        <>
            <Modal
                centered
                opened={opened}
                onClose={close}
                title={
                    <Title>
                        <Group>
                            {icon}
                            <Text size="sm">
                                {title}
                            </Text>
                        </Group>
                    </Title>
                }
                closeButtonProps={{
                    icon: <IconXboxX size={20} stroke={1.5} />,
                }}
            >
                <form onSubmit={onSubmit} >
                    {children}
                    <Group gap={7} mt="xl" justify='flex-end'>
                        <Button variant='light' onClick={close}>Cancel</Button>
                        <Button loading={isLoading} type='submit'>Save</Button>
                    </Group>
                </form>
            </Modal>

            <Button onClick={open} variant={variant}>{title}</Button>
        </>
    );
}

export default DialogUtils