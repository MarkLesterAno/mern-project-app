import { Group, Pagination, Select } from "@mantine/core";
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
        <Group justify='end'>
            <Select
                data={['10', '20', '30', '40', '50', 'All']}
                defaultValue={'10'}
                leftSection={<IconHash size={18} />}
                onChange={onChangeLimit}
                style={{ width: 100, color: 'transparent' }}
            />
            <Pagination.Root
                total={total}
                value={activePage}
                onChange={onChangePage}
                getItemProps={(page) => ({
                    component: 'a',
                    href: `#page-${page}`,
                })}
            >
                <Group gap={7}>
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