import { createContext, useContext, ReactNode } from 'react';

type Permission = string;

interface PermissionsContextType {
    permissions: Permission[];
    hasPermission: (permission: Permission) => boolean;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

interface PermissionsProviderProps {
    permissions: Permission[];
    children: ReactNode;
}

export const PermissionsProvider = ({ permissions, children }: PermissionsProviderProps) => {
    const hasPermission = (permission: Permission) => permissions.includes(permission);

    return (
        <PermissionsContext.Provider value={{ permissions, hasPermission }}>
            {children}
        </PermissionsContext.Provider>
    );
};

export const usePermissions = () => {
    const context = useContext(PermissionsContext);
    if (!context) {
        throw new Error('usePermissions must be used within a PermissionsProvider');
    }
    return context;
};

export const useHasPermission = (permission: Permission): boolean => {
    const { hasPermission } = usePermissions();
    return hasPermission(permission);
};