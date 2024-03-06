// contexts/AuthContext.tsx
'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, User } from '../types'; // Assuming you have defined these types
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext) as AuthContextType;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // Add a loading state
    const router = useRouter();


    useEffect(() => {
        // Attempt to retrieve the user from sessionStorage on initial load
        const sessionUser = sessionStorage.getItem('user');
        if (sessionUser) {
            setUser(JSON.parse(sessionUser));
        }
        setLoading(false);
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
            const userData: User = { username: data.username, id: data.id }; // Adapt based on actual response structure
            setUser(userData);
            sessionStorage.setItem('user', JSON.stringify(userData)); // Persist user session in sessionStorage
            router.push("/")
        } catch (error) {
            console.error('Login error:', error);
            // Handle login errors, e.g., by setting an error state or showing a message
        }
    };

    const signOut = () => {
        setUser(null);
        sessionStorage.removeItem('user');
        router.push("/pages/signin")
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
