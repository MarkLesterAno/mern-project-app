import { Avatar, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from '../assets/styles/user-button.module.css';
import TextUtils from '../utils/text-utils';
import { UserMenu } from './user-menu';

interface UserButtonProps {
    username: string;
    email: string;
    avatarUrl?: string;
    onLogout?: () => void;
    onSettings?: () => void;
}

export function UserButton({ username, email, avatarUrl, onLogout, onSettings }: UserButtonProps) {
    return (
        <Menu width={290} position="bottom-start" offset={5}>
            <Menu.Target>
                <UnstyledButton className={classes.user}>
                    <Group>
                        <Avatar src={avatarUrl} radius="xl" />
                        <div style={{ flex: 1 }}>
                            <Text size="sm" fw={500}>
                                {TextUtils.capitalizeWords(username)}
                            </Text>
                            <Text c="dimmed" size="xs">
                                {email}
                            </Text>
                        </div>
                        <IconChevronRight size={14} stroke={1.5} />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <UserMenu
                onLogout={onLogout || (() => { })}
                onSettings={onSettings || (() => { })}
            />
        </Menu>
    );
}