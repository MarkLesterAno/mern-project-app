import { Checkbox, Grid, List, Stack, Text } from '@mantine/core';
import { useQueryClient } from 'react-query';
import useGroup from '../hooks/useGroup';


interface Group {
    _id: string;
    name: string;
    permissions: string[];
}

interface GroupsTabProps {
    props: any;
    selectedRows: string[]; // Selected group or permission IDs
    setSelectedRows: (updatedGroups: string[]) => void; // Function to update selected IDs
}

export function GroupsTab({ selectedRows, setSelectedRows, props }: GroupsTabProps) {
    const queryClient = useQueryClient();
    const { allGroups }: { allGroups: Group[] } = useGroup(queryClient);

    // Handle checkbox selection for groups
    const handleGroupChange = (groupId: string, isChecked: boolean) => {
        const updatedGroups = isChecked
            ? [...selectedRows, groupId]
            : selectedRows.filter((id) => id !== groupId);
        setSelectedRows(updatedGroups);
    };

    if (!allGroups || allGroups.length === 0) {
        return <Text>No groups available.</Text>;
    }

    return (
        <Stack {...props}>
            {allGroups.map((group) => (
                <Checkbox
                    key={group._id}
                    label={group.name}
                    checked={selectedRows.includes(group._id)}
                    onChange={(event) =>
                        handleGroupChange(group._id, event.currentTarget.checked)
                    }
                    aria-label={`Select group: ${group.name}`}
                />
            ))}
        </Stack>
    );
}