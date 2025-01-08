import {Avatar, Menu} from 'antd';
import {LoginOutlined, SettingOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {useNavigate} from 'react-router';
import React, {useState, useEffect} from 'react';
import AuthService from "../services/AuthService.ts";
import {User} from "../models/User.ts";
import SessionAccountService from '../services/SessionAccountService'; // Import the session service

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null); // Store the entire user object

    // Function to update user data based on session
    const updateUserData = () => {
        const storedUser = SessionAccountService.get(); // Retrieve the user object from session storage
        if (storedUser) {
            setIsLoggedIn(true);
            setUser(storedUser); // Store the entire user object
        } else {
            setIsLoggedIn(false);
            setUser(null); // Clear user data if no session data
        }
    };

    useEffect(() => {
        // Call the update function on component mount
        updateUserData();

        // Set up an event listener to handle changes in sessionStorage across tabs
        const storageListener = () => {
            updateUserData(); // Update the user state when session storage changes
        };

        // Add event listener for changes in sessionStorage
        window.addEventListener('storage', storageListener);

        // Also update user data whenever session is updated (via `SessionAccountService.update()`)
        const interval = setInterval(() => {
            SessionAccountService.update().then(updateUserData); // Re-check session every few seconds
        }, 5000); // You can adjust the interval timing as needed

        // Cleanup listeners when the component unmounts
        return () => {
            window.removeEventListener('storage', storageListener);
            clearInterval(interval); // Clear interval when the component is unmounted
        };

    }, []); // Empty array ensures the effect runs only once on mount

    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key === 'home') {
            navigate("/");
        }

        if (e.key === 'projects') {
            navigate("/Projects");
        }

        if (e.key === 'auth') {
            if (!isLoggedIn) {
                navigate("/Auth"); // Navigate to the login page
            }
        }

        if (e.key === 'logout') {
            // Call logout from AuthService and clear the session
            AuthService.logout().then(() => {
                setIsLoggedIn(false); // Update state to reflect the user is logged out
                setUser(null); // Clear user data
            });
        }

        if (e.key === 'settings') {
            navigate("/User/Settings"); // Navigate to the settings page
        }
    };

    return (
        <>
            <Menu onClick={onClick} mode="horizontal">
                <Menu.Item key="home">Home</Menu.Item>
                <Menu.Item key="projects">Projects</Menu.Item>

                {!isLoggedIn ? (
                    <Menu.Item
                        key="auth"
                        icon={<LoginOutlined/>}
                        style={{marginLeft: 'auto', background: "#1677ff", color: "white"}}
                    >
                        Sign in
                    </Menu.Item>
                ) : (
                    <Menu.SubMenu
                        key="userMenu"
                        title={<Avatar src={user?.avatar}/>}
                        style={{marginLeft: 'auto'}}
                    >
                        <Menu.Item key="settings" icon={<SettingOutlined/>} onClick={onClick}>
                            Settings
                        </Menu.Item>
                        <Menu.Item key="logout" icon={<LoginOutlined/>} onClick={onClick}>
                            Logout
                        </Menu.Item>
                    </Menu.SubMenu>
                )}
            </Menu>
        </>
    );
};

export default Navbar;
