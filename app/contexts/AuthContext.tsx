// contexts/AuthContext.tsx
'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { AuthContextType, User } from '../types'; // Assuming you have defined these types

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext) as AuthContextType;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter(); // Use Next.js router for potential redirects after login

    useEffect(() => {
        // Attempt to retrieve the user from sessionStorage on initial load
        const sessionUser = sessionStorage.getItem('user');
        if (sessionUser) {
            setUser(JSON.parse(sessionUser));
        }
    }, []);

    const signIn = async (username: string, password: string) => {
        try {
            const response = await fetch(`https://my-planner-app-glo-3202-deploy.vercel.app/api/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            // Assuming the response includes the username or other user data
            const userData: User = { username: data.username }; // Adapt based on actual response structure
            setUser(userData);
            sessionStorage.setItem('user', JSON.stringify(userData)); // Persist user session in sessionStorage
            router.push('/'); // Redirect to dashboard or other page on successful login
        } catch (error) {
            console.error('Login error:', error);
            // Handle login errors, e.g., by setting an error state or showing a message
        }
    };

    const signOut = () => {
        setUser(null);
        sessionStorage.removeItem('user');
        router.push('/pages/signin'); // Redirect to sign-in page on logout
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
