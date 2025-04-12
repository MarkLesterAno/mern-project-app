import { useQuery, useMutation } from 'react-query';
import GroupService from '../services/GroupService';
import { useState } from 'react';
import usePagination from './usePagination';

const api = new GroupService();

const useGroup = (queryClient: any) => {
    const [groups, setGroups] = useState([]);
    const [allGroups, setAllGroups] = useState([]);
    const { pagination, setPageLimit, changePage, setTotalCount } = usePagination();

    // Fetch paginated groups
    const fetchGroups = async () => {
        const { count, groups } = await api.getGroups({
            limit: pagination.size,
            page: pagination.page,
        });
        const  allGroups = await api.getAllGroups();
        setTotalCount(count);
        setGroups(groups);
        setAllGroups(allGroups.groups);
        return groups ;
    };

    const searchGroups = async (search: any) => {
        const { count, groups } = await api.filterGroups({
            filter: search,
            limit: pagination.size,
            page: pagination.page,
        });
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

    // Query for paginated groups
    useQuery({
        queryKey: ['groups', pagination.page, pagination.size],
        queryFn: fetchGroups,
        onError: (error) => {
            console.error('Error fetching paginated groups:', error);
        },
        keepPreviousData: true, // Retain previous data while fetching new data
    });

    // Query for all groups
    const searchMutation = useMutation(searchGroups, {
        onSuccess: (data) => {
            setGroups(data);
        },
    });

    const createMutation = useMutation(createGroup, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] });
            queryClient.invalidateQueries({ queryKey: ['all-groups'] });
        },
    });

    const updateMutation = useMutation(updateGroup, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] });
            queryClient.invalidateQueries({ queryKey: ['all-groups'] });
        },
    });

    const patchMutation = useMutation(patchGroup, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] });
            queryClient.invalidateQueries({ queryKey: ['all-groups'] });
        },
    });

    const deleteMutation = useMutation(deleteGroup, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] });
            queryClient.invalidateQueries({ queryKey: ['all-groups'] });
        },
    });

    return {
        groups,
        allGroups,
        pagination,
        setPageLimit,
        changePage,
        isLoading: !groups.length && !searchMutation.isLoading,
        error: searchMutation.error,
        fetchGroups,
        searchGroup: searchMutation.mutateAsync,
        createGroup: createMutation.mutateAsync,
        updateGroup: updateMutation.mutateAsync,
        patchGroup: patchMutation.mutateAsync,
        deleteGroup: deleteMutation.mutateAsync,
    };
};

export default useGroup;