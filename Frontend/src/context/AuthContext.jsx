
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_URL = "http://localhost:3000/api/auth";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check whether user is already logged in
    const checkAuth = async () => {
        try {
            const response = await axios.get(`${API_URL}/me`, {
                withCredentials: true
            });

            setUser(response.data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    // Register user
    const register = async (name, email, password) => {
        const response = await axios.post(
            `${API_URL}/register`,
            { name, email, password },
            { withCredentials: true }
        );

        return response.data;
    };

    // Login user
    const login = async (email, password) => {
        const response = await axios.post(
            `${API_URL}/login`,
            { email, password },
            { withCredentials: true }
        );

        setUser(response.data.user);

        return response.data;
    };

    // Logout user
    const logout = async () => {
        try {
            await axios.post(
                `${API_URL}/logout`,
                {},
                { withCredentials: true }
            );
        } finally {
            setUser(null);
        }
    };

    const value = {
        user,
        loading,
        register,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
export const useAuth = () => {
    return useContext(AuthContext);
};
