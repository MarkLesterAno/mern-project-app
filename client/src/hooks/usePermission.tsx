import { useQuery, useMutation } from 'react-query';
import PermissionService from '../services/PermissionService';
import { useState } from 'react';

const api = new PermissionService();

const usePermission = (queryClient: any) => {
    const [permissions, setPermissions] = useState([]);

    const fetchPermissions = async () => {
        const { permissions } = await api.getPermissions();
        setPermissions(permissions);
        return permissions;
    };

    const searchPermissions = async (search: any) => {
        const { permissions } = await api.filterPermissions({ filter: search });
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

    useQuery({
        queryKey: ['permissions'],
        queryFn: fetchPermissions,
        onError: (error) => {
            console.error('Error fetching permissions:', error);
        },
    });

    const searchMutation = useMutation(searchPermissions, {
        onSuccess: (data) => {
            setPermissions(data);
        },
    });

    const createMutation = useMutation(createPermission, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] });
        },
    });

    const updateMutation = useMutation(updatePermission, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] });
        },
    });

    const patchMutation = useMutation(patchPermission, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] });
        },
    });

    const deleteMutation = useMutation(deletePermission, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] });
        },
    });

    return {
        permissions,
        isLoading: !permissions.length && !searchMutation.isLoading,
        error: searchMutation.error,
        fetchPermissions: searchMutation.mutateAsync,
        searchPermission: searchMutation.mutateAsync,
        createPermission: createMutation.mutateAsync,
        updatePermission: updateMutation.mutateAsync,
        patchPermission: patchMutation.mutateAsync,
        deletePermission: deleteMutation.mutateAsync,
    };
};

export default usePermission;