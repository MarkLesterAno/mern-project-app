import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AuthService from '../services/AuthService';
import { notifications } from '@mantine/notifications';
import { IconExclamationCircle, IconX, } from '@tabler/icons-react';
import { rem } from '@mantine/core';


const api = new AuthService();

// Define the shape of the context
interface AuthContextType {
    login: (credentials: { username: string, password: string }) => Promise<void>;
    logout: () => void;
    isLoggedIn: () => boolean;
    getPermissions: () => Promise<string[]>;
    getUser: () => Promise<UserType>;
    send_request: (credentials: { email: string }) => Promise<void>;
    send_invite: (credentials: { email: string }) => Promise<void>;
    complete_signup: (credentials: { email: string, username: string, password: string, token: string }) => Promise<void>;
    reset_password: (credentials: { new_password: string, token: string }) => Promise<void>;
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

// Create a provider component that will manage authentication state
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    // Function to log in a user
    const login = async ({ username, password }: { username: string; password: string }) => {
        try {
            const { access_token, refresh_token, error } = await api.login({ username, password });
            if (error) {
                notifications.show({
                    id: 'server-errors',
                    title: 'Error',
                    message: error.message,
                    icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
                    color: "red"
                })
                throw error
            }
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            setUser(user);
        } catch (error) {
            throw error;
        }
    };
    const send_request = async ({ email }: { email: string }) => {
        try {
            await api.reset_password({ email });
            notifications.show({
                id: 'reset-password',
                title: 'Reset Password',
                message: 'Request for password reset sent to your email.',
                icon: <IconExclamationCircle style={{ width: rem(20), height: rem(20) }} />,
                color: "blue"
            })
            return
        } catch (error) {
            throw error;
        }
    };
    const send_invite = async ({ email }: { email: string }) => {
        try {
            await api.invite_signup({ email });
            notifications.show({
                id: 'invite-signup',
                title: 'Invite Signup',
                message: 'Request for signup invitation was sent to your email.',
                icon: <IconExclamationCircle style={{ width: rem(20), height: rem(20) }} />,
                color: "blue"
            })
            return
        } catch (error) {
            throw error;
        }
    };
    const complete_signup = async ({ email, username, password, token }: { email: string, username: string, password: string, token: string }) => {
        try {
            await api.complete_signup({ email, username, password, token });
            notifications.show({
                id: 'complete-signup',
                title: 'Complete Signup',
                message: 'Your signup is complete. Welcome!',
                icon: <IconExclamationCircle style={{ width: rem(20), height: rem(20) }} />,
                color: "blue"
            })
            return
        } catch (error) {
            throw error;
        }
    };
    const reset_password = async ({ new_password, token }: { new_password: string, token: string }) => {
        try {
            await api.conplete_reset_password({ new_password, token });
            notifications.show({
                id: 'reset-password',
                title: 'Reset Password',
                message: 'Password reset successful.',
                icon: <IconExclamationCircle style={{ width: rem(20), height: rem(20) }} />,
                color: "blue"
            })
            return
        } catch (error) {
            throw error;
        }
    };

    const isLoggedIn = (): boolean => {
        const access_token = localStorage.getItem('access_token');
        return Boolean(access_token && access_token.length > 0);
    };

    const getPermissions = async (): Promise<string[]> => {
        const { permissions } = await api.getPermissions();
        return permissions ? permissions : [];
    };

    const getUser = async (): Promise<UserType> => {
        if (!user) {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                return JSON.parse(storedUser);
            }
            return {} as UserType;
        }
        return user;
    };

    // Function to log out a user
    const logout = async () => {
        try {
            localStorage.clear();
            setUser(null);
        } catch (error) {
            throw error
        }
    };

    return (
        <AuthContext.Provider value={
            {
                login,
                logout,
                reset_password,
                send_request,
                isLoggedIn,
                getPermissions,
                getUser,
                send_invite,
                complete_signup
            }
        }>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to consume the authentication context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
