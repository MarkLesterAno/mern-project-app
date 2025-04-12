import { useState } from 'react';

const usePagination = (initialPage = 1, initialSize = 10) => {
    const [pagination, setPagination] = useState({
        page: initialPage,
        size: initialSize,
        total: 0
    });

    const setPageLimit = (limit: any) => {
        setPagination((prev) => ({
            ...prev,
            size: limit === 'All' ? pagination.total : limit,
            page: 1
        }));
    };

    const changePage = (page: any) => {
        setPagination((prev) => ({
            ...prev,
            page
        }));
    };

    const setTotalCount = (total: number) => {
        setPagination((prev) => ({
            ...prev,
            total
        }));
    };

    return {
        pagination,
        setPageLimit,
        changePage,
        setTotalCount
    };
};

export default usePagination;