import React, {useState} from 'react';
import {Menu} from 'antd';
import {LoginOutlined, GithubOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import LoginGit from "../services/LoginGit.ts";
import {useNavigate} from "react-router";

const Navbar: React.FC = () => {
    const [current, setCurrent] = useState('home');

    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);

        if (e.key === 'home') {
            navigate("/")
        }

        if (e.key === 'projects') {
            navigate("/Projects")
        }

        if (e.key === 'login-github') {
            try {
                // Call the Login method from the LoginGit service
                console.log("hit");
                LoginGit.redirectToGitHubLogin();
            } catch (error) {
                console.error('Error during GitHub login:', error);
            }
        }
    };


    return (
        <>
            {/* Navigation Menu */}
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                theme={'dark'}
            >
                <Menu.Item key="home">Home</Menu.Item>
                <Menu.Item key="projects">Projects</Menu.Item>

                <Menu.SubMenu
                    key="login"
                    icon={<LoginOutlined/>}
                    style={{marginLeft: 'auto'}} // This pushes the submenu to the right
                >
                    <Menu.Item
                        key="login-github"
                        icon={<GithubOutlined/>}
                    >
                        Login with GitHub
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </>
    );
};

export default Navbar;
