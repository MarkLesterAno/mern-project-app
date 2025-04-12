import { Modal, Button } from '@mantine/core';

interface CustomModalProps {
    title: string;
    size: string;
    buttonText: string;
    children?: React.ReactNode;
    opened: boolean; // External state to control modal visibility
    onClose: () => void; // Callback to handle modal close event
    onOpen?: () => void; // Optional callback to handle modal open event
}

const CustomModal = ({ title, size, buttonText, children, opened, onClose, onOpen }: CustomModalProps) => {
    return (
        <>
            <Modal size={size} opened={opened} onClose={onClose} title={title}>
                {children}
            </Modal>
            <Button onClick={onOpen}>
                {buttonText}
            </Button>
        </>
    );
};

export default CustomModal;