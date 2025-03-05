import { useEffect, useState } from 'react';
import {
    IconLogout,
    IconSwitchHorizontal,
    IconUsers,
    IconDashboard,
    IconFolder
} from '@tabler/icons-react';
import { AppShell, NavLink } from '@mantine/core';
import classes from '../assets/styles/navbar-simple.module.css';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export function Navbar() {
    const { logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [active, setActive] = useState(location.pathname);
    const data = [
        { link: '/', label: 'Dashboard', icon: IconDashboard },
        { link: '/users', label: 'Users', icon: IconUsers },
        { link: '/groups', label: 'Groups', icon: IconFolder },
    ];
    useEffect(() => {
        setActive(location.pathname);
    }, [location]);
    
    const links = data.map((item) => (
        <NavLink
            className={classes.link}
            active={item.link === active}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
                navigate(item.link);
            }}
            label={item.label}
            leftSection={<item.icon className={classes.linkIcon} stroke={1.5} />}
        />
    ));
    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <AppShell.Navbar className={classes.navbar}>
            <div className={classes.navbarMain}>
                {links}
            </div>
            <div className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                    <span>Change account</span>
                </a>
                <a href="#" className={classes.link} onClick={handleLogout}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div>
        </AppShell.Navbar>
    );
}