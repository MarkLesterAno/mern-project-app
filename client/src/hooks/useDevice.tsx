import { useQuery, useMutation, useQueryClient } from 'react-query';
import DeviceService from '../services/DeviceService';
import { useState } from 'react';

const api = new DeviceService();

const useDevices = (queryClient: any) => {
    const [pagination, setPagination] = useState({
        page: 1,
        size: 10,
        total: 0
    });

    const fetchDevices = async () => {
        const { count, devices } = await api.getDevices({ limit: pagination.size, page: pagination.page });
        pagination.total = count;
        setPagination(pagination);
        return devices;
    };

    const createDevice = async (newDevice: any) => {
        const response = await api.createDevice(newDevice); // Assuming DeviceService handles creation
        return response; // Assuming response contains the created device
    };

    const updateDevice = async (updatedDevice: any) => {
        const response = await api.updateDevice({ ...updatedDevice }); // Assuming DeviceService handles update
        return response; // Assuming response contains the updated device
    };

    const deleteDevice = async (deviceId: any) => {
        await api.deleteDevice(deviceId); // Assuming DeviceService handles deletion
        return deviceId;
    };

    const changePage = (page: any) => {
        pagination.page = page;
        setPagination(pagination);
        queryClient.invalidateQueries({ queryKey: ['devices'] }); // Invalidate 'devices' query to trigger re-fetch
    };

    const { data: devices, isLoading, error } = useQuery({
        queryKey: ['devices'],
        queryFn: fetchDevices,
        onError: (error) => {
            console.error('Error fetching devices:', error);
        },
    });

    const createMutation = useMutation(createDevice, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['devices'] });
        },
    });

    const updateMutation = useMutation(updateDevice, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['devices'] });
        },
    });

    const deleteMutation = useMutation(deleteDevice, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['devices'] });
        },
    });

    return {
        devices,
        isLoading,
        error,
        createDevice: createMutation.mutateAsync,
        updateDevice: updateMutation.mutateAsync,
        deleteDevice: deleteMutation.mutateAsync,
        changePage,
        pagination,
    };
};

export default useDevices;
