import { Box, Container, Grid, Group, Pagination, Select } from "@mantine/core";
import { IconHash } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const CustomPagination = ({ pagination, setPageLimit, changePage }: any) => {
    const [total, setTotal] = useState(1);
    const [activePage, setPage] = useState(1);
    const [limit, setLimit] = useState('10');

    useEffect(() => {
        setTotal(limit === 'All' ? 1 : Math.ceil(pagination.total / pagination.size));
    }, [pagination]);

    useEffect(() => {
        setPageLimit(limit);
        setPage(1);
    }, [limit]);

    useEffect(() => {
        changePage(activePage);
    }, [activePage]);

    const onChangeLimit = (value: any) => setLimit(value);
    const onChangePage = (page: any) => setPage(page);

    return (
        <Group justify='space-between' align="bottom" my={20}>
            <Box w={100}>
                <Select
                    variant="filled"
                    inputSize="sm"
                    data={['10', '20', '30', '40', '50', 'All']}
                    defaultValue={'10'}
                    leftSection={<IconHash size={18} />}
                    onChange={onChangeLimit}
                />
            </Box>
            <Pagination.Root
                size="md"
                total={total}
                value={activePage}
                onChange={onChangePage}
                getItemProps={(page) => ({
                    component: 'a',
                    href: `#page-${page}`,
                })}
            >
                <Group gap={7} align="bottom">
                    <Pagination.First />
                    <Pagination.Previous />
                    <Pagination.Items />
                    <Pagination.Next />
                    <Pagination.Last />
                </Group>
            </Pagination.Root>
        </Group>
    );
}

export default CustomPagination;