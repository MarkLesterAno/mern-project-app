import { useEffect, useState } from 'react';
import { IconDashboard, IconServer, } from '@tabler/icons-react';
import { AppShell, ScrollArea } from '@mantine/core';
import { UserButton } from '../components/user-button';
import classes from '../assets/styles/navbar-nested.module.css';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LinksGroup } from '../components/ui/navbar-links-group';


const NavGroups = [
    {
        label: 'Dashboard',
        icon: IconDashboard,
        path: '/'
    },
    {
        label: 'System',
        icon: IconServer,
        links: [
            { label: 'Users', link: '/users' },
            { label: 'Groups', link: '/groups' },
            { label: 'Permissions', link: '/permissions' },
        ],
    },
];

export function Navbar() {
    const location = useLocation();
    const { user, logout } = useAuth();
    const [active, setActive] = useState(location.pathname);
    const links = NavGroups.map((item) => <LinksGroup {...item} active={active} key={item.label} />);

    // Update active state when the location changes
    useEffect(() => {
        setActive(location.pathname);
    }, [location]);

    return (
        <AppShell.Navbar className={classes.navbar}>
            {/* Scrollable navigation links */}
            <ScrollArea className={classes.links}>
                {links}
            </ScrollArea>

            {/* Footer with user button */}
            <div className={classes.footer}>
                <UserButton
                    username={user?.username || ''}
                    email={user?.email || ''}
                    avatarUrl={'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png'}
                    onLogout={logout}
                />
            </div>
        </AppShell.Navbar>
    );
}