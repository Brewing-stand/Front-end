import React, {useState} from 'react';
import {Menu} from 'antd';
import {LoginOutlined, GithubOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';

const Navbar: React.FC = () => {
    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
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
