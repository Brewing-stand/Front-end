import {Avatar, Menu} from 'antd';
import {LoginOutlined, SettingOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {useNavigate} from 'react-router';
import React, {useState, useEffect} from 'react';
import AuthService from "../services/AuthService.ts";
import {User} from "../models/User.ts";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null); // Typed user state

    useEffect(() => {
        // Check if the user is logged in by checking for a token or user data in localStorage
        const storedUser = localStorage.getItem('user'); // Replace 'user' with your actual user key

        if (storedUser) {
            setIsLoggedIn(true);
            setUser(JSON.parse(storedUser)); // Assuming you store user details in localStorage
        }
    }, []);

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
            // Call logout from AuthService
            AuthService.logout().then()
        }

        if (e.key === 'settings') {
            navigate("/User/Settings"); // Navigate to the settings page
        }
    };

    return (
        <>
            <Menu
                onClick={onClick}
                mode="horizontal"
            >
                <Menu.Item key="home">Home</Menu.Item>
                <Menu.Item key="projects">Projects</Menu.Item>

                {!isLoggedIn ? (
                    <Menu.Item
                        key="auth"
                        icon={<LoginOutlined/>}
                        style={{marginLeft: 'auto', background: "#1677ff", color: "white"}}
                        onClick={onClick}
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
