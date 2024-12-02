import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('log');
        if (token) {
            setIsLoggedIn(true);
        }

        axios.get('http://localhost:8888/user/roles', {
            withCredentials: true,
        })
            .then((response) => {
                const roles = response.data.roles || [];
                if (roles.includes('ADMIN')) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            })
            .catch((error) => {
                console.error('Failed to fetch user roles:', error);
            });

        axios.get('http://localhost:8888/user/profileImage', {
            withCredentials: true,
        })
            .then((response) => {
                if (response.data.profileImage && response.data.username) {
                    const fullURL = `http://localhost:8888${response.data.profileImage}`;
                    setProfileImage(fullURL);
                    setUserName("Hello! " + response.data.username);
                }
            })
            .catch((error) => {
                setIsLoggedIn(false);
                setProfileImage(null);
                localStorage.removeItem('log');
                setUserName('');
                setIsAdmin(false);
            });
    }, []);

    const login = (token, userName, profileImage, roles) => {
        localStorage.setItem('log', token);
        setIsLoggedIn(true);
        setUserName("Hello! " + userName);
        if (profileImage != null) {
            setProfileImage(`http://localhost:8888${profileImage}`)
        }
        if (roles.includes('ADMIN')) {
            setIsAdmin(true);
        }
    };

    const serverNotConnect = () => {
        setIsLoggedIn(false);
        setProfileImage(null);
        localStorage.removeItem('log');
        setUserName('');
        setIsAdmin(false);
    }

    const logout = async () => {
        try {
            const response = await axios.get('http://localhost:8888/user/logout',
                {
                    withCredentials: true
                }
            );
            if (response.status === 200) {
                setIsLoggedIn(false);
                setProfileImage(null);
                localStorage.removeItem('log');
                setUserName('');
                setIsAdmin(false);

            }
            else {
            }
        } catch (err) {
        }

    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, profileImage, login, logout, setProfileImage, userName, setUserName, isAdmin, serverNotConnect }}>
            {children}
        </AuthContext.Provider>
    );
};
