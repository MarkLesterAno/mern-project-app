import { Menu } from '@mantine/core';
import { IconLogout, IconSettings } from '@tabler/icons-react';

interface UserMenuProps {
    onLogout: () => void;
    onSettings?: () => void;
}

export function UserMenu({ onLogout,onSettings }: UserMenuProps) {
    return (
        <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item leftSection={<IconSettings size={14} />} onClick={onSettings}>
                Settings
            </Menu.Item>
            <Menu.Item leftSection={<IconLogout size={14} />} onClick={onLogout}>
                Logout
            </Menu.Item>
        </Menu.Dropdown>
    );
}