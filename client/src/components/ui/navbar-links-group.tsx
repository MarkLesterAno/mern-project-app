import { useState } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { Box, Collapse, Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import classes from '../../assets/styles/navbar-links-group.module.css';
import { useNavigate } from 'react-router-dom';

interface LinkItem {
    label: string;
    link: string;
}

interface LinksGroupProps {
    icon: React.ElementType;
    label: string;
    path?: string,
    active: string,
    initiallyOpened?: boolean;
    links?: LinkItem[];
}

export function LinksGroup({ icon: Icon, label, active, path, initiallyOpened = false, links = [] }: LinksGroupProps) {
    const [opened, setOpened] = useState(initiallyOpened);
    const navigate = useNavigate();

    const hasLinks = links.length > 0;

    const handleLinkClick = (link: string) => {
        navigate(link);
    };

    const items = links.map((link) => (
        <Text<'a'>
            component="a"
            className={active === link.link ? classes.active : classes.link}
            href={link.link}
            key={link.label}
            onClick={(event) => {
                event.preventDefault();
                handleLinkClick(link.link);
            }}
        >
            {link.label}
        </Text>
    ));

    return (
        <>
            <UnstyledButton
                onClick={() => hasLinks ? setOpened((o) => !o) : handleLinkClick(path || '')}
                className={active === path ? classes.activeControl : classes.control}
            >
                <Group justify="space-between" gap={0}>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <ThemeIcon variant="light" size={30}>
                            <Icon size={18} />
                        </ThemeIcon>
                        <Box ml="md">{label}</Box>
                    </Box>
                    {hasLinks && (
                        <IconChevronRight
                            className={classes.chevron}
                            stroke={1.5}
                            size={16}
                            style={{ transform: opened ? 'rotate(-90deg)' : 'none' }}
                        />
                    )}
                </Group>
            </UnstyledButton>
            {hasLinks && <Collapse in={opened}>{items}</Collapse>}
        </>
    );
}
