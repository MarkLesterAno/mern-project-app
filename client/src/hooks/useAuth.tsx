import { useQuery, useMutation } from 'react-query';
import UserService from '../services/UserService';
import { useState } from 'react';
import usePagination from './usePagination';

const api = new UserService();

const useAuth = (queryClient: any) => {
    const [, setUsers] = useState([]);

    const fetchUsers = async () => {
        const { count, users } = await api.getUsers({ limit: pagination.size, page: pagination.page });
        setTotalCount(count);
        setUsers(users);
        return users;
    };

    const searchUsers = async (search: any) => {
        const { count, users } = await api.filterUsers({ filter: search, limit: pagination.size, page: pagination.page });
        setTotalCount(count);
        setUsers(users);
        return users;
    };

    const createUser = async (newUser: any) => {
        const response = await api.createUser(newUser);
        return response;
    };

    const updateUser = async ({ id, email, username, isActive, isStaff, isSuperuser, groups, permissions }: any) => {
        const response = await api.updateUser({ _id: id, email, username, isActive, isStaff, isSuperuser, groups, permissions });
        return response;
    };

    const patchUser = async ({ id, updateData }: any) => {
        const response = await api.patchUser({ _id: id, data: updateData });
        return response;
    };

    const deleteUser = async (userId: any) => {
        await api.deleteUser(userId);
        return userId;
    };

    useQuery({
        queryKey: ['users', pagination.page, pagination.size],
        queryFn: fetchUsers,
        onError: (error) => {
            console.error('Error fetching users:', error);
        },
    });

    const searchMutation = useMutation(searchUsers, {
        onSuccess: (data) => {
            setUsers(data);
        },
    });

    const createMutation = useMutation(createUser, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const updateMutation = useMutation(updateUser, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const patchMutation = useMutation(patchUser, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const deleteMutation = useMutation(deleteUser, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    return {
        users,
        isLoading: !users.length && !searchMutation.isLoading,
        error: searchMutation.error,
        fetchUsers: searchMutation.mutateAsync,
        searchUser: searchMutation.mutateAsync,
        createUser: createMutation.mutateAsync,
        updateUser: updateMutation.mutateAsync,
        patchUser: patchMutation.mutateAsync,
        deleteUser: deleteMutation.mutateAsync,
        changePage,
        pagination,
        setPageLimit
    };
};

export default useUsers;