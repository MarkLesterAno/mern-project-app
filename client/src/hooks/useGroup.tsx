import { useQuery, useMutation } from 'react-query';
import GroupService from '../services/GroupService';
import { useState } from 'react';
import usePagination from './usePagination';

const api = new GroupService();

const useGroup = (queryClient: any) => {
    const [groups, setGroups] = useState([]);
    const { pagination, setPageLimit, changePage, setTotalCount } = usePagination();

    const fetchGroups = async () => {
        const { count, groups } = await api.getGroups();
        setTotalCount(count);
        setGroups(groups);
        return groups;
    };

    const searchGroups = async (search: any) => {
        const { count, groups } = await api.filterGroups({ filter: search });
        setTotalCount(count);
        setGroups(groups);
        return groups;
    };

    const createGroup = async (newGroup: any) => {
        const response = await api.createGroup(newGroup);
        return response;
    };

    const updateGroup = async ({ id, name, permissions }: any) => {
        const response = await api.updateGroup({ _id: id, name, permissions });
        return response;
    };

    const patchGroup = async ({ id, updateData }: any) => {
        const response = await api.patchGroup({ _id: id, updateData });
        return response;
    };

    const deleteGroup = async (groupId: any) => {
        await api.deleteGroup(groupId);
        return groupId;
    };

    useQuery({
        queryKey: ['groups', pagination.page, pagination.size],
        queryFn: fetchGroups,
        onError: (error) => {
            console.error('Error fetching groups:', error);
        },
    });

    const searchMutation = useMutation(searchGroups, {
        onSuccess: (data) => {
            setGroups(data);
        },
    });

    const createMutation = useMutation(createGroup, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] });
        },
    });

    const updateMutation = useMutation(updateGroup, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] });
        },
    });

    const patchMutation = useMutation(patchGroup, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] });
        },
    });

    const deleteMutation = useMutation(deleteGroup, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] });
        },
    });

    return {
        groups,
        isLoading: !groups.length && !searchMutation.isLoading,
        error: searchMutation.error,
        fetchGroups: searchMutation.mutateAsync,
        searchGroup: searchMutation.mutateAsync,
        createGroup: createMutation.mutateAsync,
        updateGroup: updateMutation.mutateAsync,
        patchGroup: patchMutation.mutateAsync,
        deleteGroup: deleteMutation.mutateAsync,
        changePage,
        pagination,
        setPageLimit
    };
};

export default useGroup;