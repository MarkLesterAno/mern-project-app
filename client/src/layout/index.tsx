import { AppShell, Container, } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Header } from './header';
import { Navbar } from './navbar';

export function LayoutView(props: any) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <Header desktopOpened={opened} toggleDesktop={toggle} />
            <Navbar />
            <AppShell.Main>
                    {props.children}
            </AppShell.Main>
        </AppShell>
    );
}
