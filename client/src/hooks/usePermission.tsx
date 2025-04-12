import { useQuery, useMutation } from 'react-query';
import PermissionService from '../services/PermissionService';
import usePagination from './usePagination';
import { useState } from 'react';
import { set } from 'lodash';

const api = new PermissionService();

const usePermission = (queryClient: any) => {
    const [permissions, setPermissions] = useState([]);
    const [allPermissions, setAllPermissions] = useState([]);
    const { pagination, setPageLimit, changePage, setTotalCount } = usePagination();

    // Fetch paginated permissions
    const fetchPermissions = async () => {
        const { count, permissions } = await api.getPermissions({
            limit: pagination.size,
            page: pagination.page,
        });
        const allPermissions = await api.getAllPermissions();
        setTotalCount(count);
        setPermissions(permissions);
        setAllPermissions(allPermissions.permissions);
        return permissions ;
    };

    const searchPermissions = async (search: any) => {
        const { count, permissions } = await api.filterPermissions({
            filter: search,
            limit: pagination.size,
            page: pagination.page,
        });
        setTotalCount(count);
        setPermissions(permissions);
        return permissions;
    };

    const createPermission = async (newPermission: any) => {
        const response = await api.createPermission(newPermission);
        return response;
    };

    const updatePermission = async ({ id, name, description }: any) => {
        const response = await api.updatePermission({ _id: id, name, description });
        return response;
    };

    const patchPermission = async ({ id, updateData }: any) => {
        const response = await api.patchPermission({ _id: id, updateData });
        return response;
    };

    const deletePermission = async (permissionId: any) => {
        await api.deletePermission(permissionId);
        return permissionId;
    };

    // Query for paginated permissions
    useQuery({
        queryKey: ['permissions', pagination.page, pagination.size],
        queryFn: fetchPermissions,
        onError: (error) => {
            console.error('Error fetching paginated permissions:', error);
        },
        keepPreviousData: true, // Retain previous data while fetching new data
    });

    

    const searchMutation = useMutation(searchPermissions, {
        onSuccess: (data) => {
            setPermissions(data);
        },
    });

    const createMutation = useMutation(createPermission, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] });
            queryClient.invalidateQueries({ queryKey: ['all-permissions'] });
        },
    });

    const updateMutation = useMutation(updatePermission, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] });
            queryClient.invalidateQueries({ queryKey: ['all-permissions'] });
        },
    });

    const patchMutation = useMutation(patchPermission, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] });
            queryClient.invalidateQueries({ queryKey: ['all-permissions'] });
        },
    });

    const deleteMutation = useMutation(deletePermission, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] });
            queryClient.invalidateQueries({ queryKey: ['all-permissions'] });
        },
    });

    return {
        permissions,
        allPermissions,
        pagination,
        setPageLimit,
        changePage,
        isLoading: !permissions.length && !searchMutation.isLoading,
        error: searchMutation.error,
        fetchPermissions,
        searchPermission: searchMutation.mutateAsync,
        createPermission: createMutation.mutateAsync,
        updatePermission: updateMutation.mutateAsync,
        patchPermission: patchMutation.mutateAsync,
        deletePermission: deleteMutation.mutateAsync,
    };
};

export default usePermission;