import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AuthService from '../services/AuthService';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { rem } from '@mantine/core';


// Define the shape of the context
interface AuthContextType {
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => void;
    isLoggedIn: boolean;
    isLoading: boolean;
    user: UserType | null;
    permissions: string[];
}

// Define the shape of the user
interface UserType {
    permissions: string[];
    groups: string[];
    email: string;
    username: string;
    isActive: boolean;
    isStaff: boolean;
    isSuperuser: boolean;
}

// Define the props for AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [permissions, setPermissions] = useState<string[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Check for access token on initial load
    useEffect(() => {
        const initializeAuth = async () => {
            const access_token = localStorage['access_token'];
            if (access_token && access_token !== 'undefined') {
                setIsLoggedIn(true);
            }
            const user = localStorage['user'];
            const permissions = localStorage['permissions'] ;
            if (user && permissions) { 
                setUser(JSON.parse(user));
                setPermissions(JSON.parse(permissions));
            }
        };
        initializeAuth();
    }, []);

    // Login function
    const login = async ({ username, password }: { username: string; password: string }) => {
        try {
            const api = new AuthService();
            setIsLoading(true);
            const { access_token, refresh_token, error } = await api.login({ username, password });
            if (error) {
                showErrorNotification(error.message);
                throw error;
            }
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            setIsLoading(false);
            setIsLoggedIn(true);
            await fetchCurrentUser();
        } catch (error) {
            showErrorNotification('Login failed. Please try again.');
            throw error;
        } 
    };

    // Fetch current user and permissions
    const fetchCurrentUser = async () => {
        try {
            const api = new AuthService();

            const { user, error: userError } = await api.getUser();
            localStorage['user'] = JSON.stringify(user);
            if (userError) {
                showErrorNotification(userError.message);
                throw userError;
            }
            

            const { permissions, error: permissionsError } = await api.getPermissions();
            localStorage['permissions'] = JSON.stringify(permissions);
            if (permissionsError) {
                showErrorNotification(permissionsError.message);
                throw permissionsError;
            }
        } catch (error) {
            setIsLoggedIn(false);
            localStorage.clear();
            throw error;
        }
    };

    // Logout function
    const logout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
    };

    // Helper function to show error notifications
    const showErrorNotification = (message: string) => {
        notifications.show({
            id: 'auth-error',
            title: 'Error',
            message,
            icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
            color: 'red',
        });
    };

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                isLoggedIn,
                isLoading,
                user,
                permissions,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to consume the authentication context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
