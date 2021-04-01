import React from 'react'
import styles from './SideMenu.module.css'
import { sideMenuList } from './mockup'
import { Menu } from 'antd'
import { GifOutlined } from '@ant-design/icons'
export const SideMenu: React.FC = () => {
    return (
        <Menu mode={'vertical'} className={styles['side-menu']}>
            {
                sideMenuList.map((item, index) => (
                    <Menu.SubMenu
                        key={`side-menu-${index}`}
                        title={<span><GifOutlined />{item.title}</span>}
                    >
                        {item.subMenu.map((subm, index) => (
                            <Menu.SubMenu
                                key={`sub-menu-${index}`}
                                title={<span><GifOutlined />{subm.title}</span>}
                            >
                                {
                                    subm.subMenu.map((submenu, index) => (
                                        <Menu.Item
                                            key={`subm-submenu-${index}`}
                                        >
                                            <span><GifOutlined />{submenu}</span>
                                        </Menu.Item>
                                    ))
                                }
                            </Menu.SubMenu>
                        ))}
                    </Menu.SubMenu>
                ))
            }
        </Menu>
    )
}