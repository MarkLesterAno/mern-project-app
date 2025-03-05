import { Autocomplete, Group, Burger, rem, AppShell } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from '../assets/styles/header-minimal.module.css';
import { ActionToggle } from '../components/color-scheme';

interface HeaderProps {
    desktopOpened: boolean
    toggleDesktop: () => void
}

export const Header = (props: HeaderProps) => {
    const { desktopOpened, toggleDesktop } = props

    return (
        <AppShell.Header px={'md'} >
            <div className={classes.inner}>
                <Group>
                    <Burger opened={desktopOpened} onClick={toggleDesktop} size="sm" hiddenFrom="sm" />
                    <MantineLogo size={28} onClick={toggleDesktop} />
                </Group>

                <Group>
                    <Autocomplete
                        className={classes.search}
                        placeholder="Search"
                        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                        data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
                        visibleFrom="xs"
                    />
                    <ActionToggle />
                </Group>
            </div>
        </AppShell.Header>

    );
}