import React from 'react';
import { useHasPermission } from '../context/PermissionContext';

export const withPermission = (permission: string) => (WrappedComponent: React.ComponentType<any>) => {
    return (props: any) => {
        const hasPermission = useHasPermission(permission);
        return hasPermission ? <WrappedComponent {...props} /> : null;
    };
};