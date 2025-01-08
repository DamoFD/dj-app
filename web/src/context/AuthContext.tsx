import { useContext, createContext, useState, useEffect, ReactNode } from 'react';
import axiosClient from '@/axios-client';

// user type
interface userProps {
    id: string;
    artist_name: string;
    email: string;
    image?: string;
    created_at: string;
    updated_at: string;
}

// auth context type
interface AuthContextType {
    user: userProps | null;
    setUser: (user: userProps | null) => void;
    loading: boolean;
    fetchUser: () => Promise<void>;
}

// create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// auth provider type
interface AuthProviderProps {
    children: ReactNode;
}

/**
 * AuthProvider provides current user data, loading state, and refreshing
* the current user data throughout the application
*
* @param children - the react nodes that can access the auth data
*
* @returns React.FC - the context provider component
*
* @since 0.0.1
*/
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // current logged in user data
    // initially no user logged in
    const [user, setUser] = useState(null);

    // loading state while attempting user authentication
    const [loading, setLoading] = useState(true);

    // on app load, fetch the csrf token
    // and attempt to fetch user
    useEffect(() => {
        fetchCSRFToken();
        fetchUser();
    }, []);

    /**
    * Fetches the csrf token from the server
    *
    * @returns void
    *
    * @since 0.0.1
    */
    const fetchCSRFToken = async () => {
        try {
            // attempt to fetch CSRF token
            await axiosClient.get('/sanctum/csrf-cookie', {
                baseURL: 'http://localhost:8081',
            });
            // log errors to console
        } catch (error) {
            console.error('Failed to fetch CSRF token:', error);
        }
    }

    /**
    * Fetches the user based on the token
    * in local storage (if available)
    *
    * if fetch succeeds, the user is considered logged in.
    * if fetch fails, the user is reset and considered logged out.
    *
    * @returns void
    *
    * @since 0.0.1
    */
    const fetchUser = async () => {
        try {
            // get the token from local storage
            const token = localStorage.getItem('auth_token');
            if (token) {
                setAxiosAuthToken(token);
            }
            // attempt to fetch user data
            const response = await axiosClient.get('/user');
            // set current user data
            setUser(response.data);
        } catch (error) {
            // if fetch fails, reset the user data
            setUser(null);
        } finally {
            // set loading state
            setLoading(false);
        }
    };

    /**
    * Sets the axios client auth token
    *
    * @param string - the auth token
    *
    * @returns void
    *
    * @since 0.0.1
    */
    const setAxiosAuthToken = (token: string) => {
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
}

/**
* useAuth hook provides access to the auth context
*
* @returns AuthContextType
*
* @since 0.0.1
*/
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
