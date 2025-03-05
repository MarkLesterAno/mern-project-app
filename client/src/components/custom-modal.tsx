import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

interface CustomModalProps {
    title: string;
    buttonText: string;
    children?: React.ReactNode;
}

const CustomModal = ({ title, buttonText, children }: CustomModalProps) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title={title}>
                {children}
            </Modal>
            <Button onClick={open}>
                {buttonText}
            </Button>
        </>
    );
}

export default CustomModal;