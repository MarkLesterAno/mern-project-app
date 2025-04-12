import { AppShell, Autocomplete, Burger, Group, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from './navbar';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from '../assets/styles/header-minimal.module.css';
import { IconSearch } from '@tabler/icons-react';
import { ActionToggle } from '../components/ui/color-scheme';
import { PermissionsProvider } from '../context/PermissionContext';
import { useAuth } from '../context/AuthContext';

interface LayoutViewProps {
    children: React.ReactNode;
}

export function LayoutView({ children }: LayoutViewProps) {
    const [opened, { toggle }] = useDisclosure();

    // Icon size for consistent styling
    const iconSize = { width: rem(16), height: rem(16) };

    const { permissions } = useAuth()
    

    return (
        <PermissionsProvider permissions={permissions}>
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            {/* Header Section */}
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <MantineLogo size={30} />
                    <Group>
                        <Autocomplete
                            className={classes.search}
                            placeholder="Search"
                            leftSection={<IconSearch style={iconSize} stroke={1.5} />}
                            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
                            visibleFrom="xs"
                        />
                        <ActionToggle />
                    </Group>
                </Group>
            </AppShell.Header>

            {/* Navbar Section */}
                <Navbar/>

            {/* Main Content Section */}
            <AppShell.Main>
                {children}
            </AppShell.Main>
            </AppShell>
            </PermissionsProvider>
    );
}

