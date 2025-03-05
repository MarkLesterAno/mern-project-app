
export type SortPayload<T> = {
    sortBy: keyof T | null;
    reversed: boolean;
    search: string;
};

const filterData = <T extends object>(data: T[], search: string): T[] => {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        (Object.keys(item) as (keyof T)[]).some((key) =>
            String(item[key]).toLowerCase().includes(query)
        )
    );
};

export const sortData = <T extends object>(data: T[], { sortBy, reversed, search }: SortPayload<T>): T[] => {
    if (!sortBy) {
        return filterData(data, search);
    }
    return filterData(
        [...data].sort((a, b) => {
            if (reversed) {
                return String(b[sortBy]).localeCompare(String(a[sortBy]));
            }
            return String(a[sortBy]).localeCompare(String(b[sortBy]));
        }),
        search
    );
};

