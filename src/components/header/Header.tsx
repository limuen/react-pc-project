import React from 'react'
import logo from '../../asstes/logo.svg'
import styles from './Header.module.css'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons'
export const Header: React.FC = () => {
    return (
        <div className={styles['App-header']}>
            <div className={styles['top-header']}>
                <div className={styles.inner}>
                    <Typography.Text>你幸福开心就好</Typography.Text>
                    <Dropdown.Button
                        style={{ marginLeft: 15 }}
                        overlay={
                            <Menu>
                                <Menu.Item>中文</Menu.Item>
                                <Menu.Item>English</Menu.Item>
                            </Menu>
                        }
                        icon={<GlobalOutlined />}
                    >
                        语言
                    </Dropdown.Button>
                    <Button.Group className={styles['button-group']}>
                        <Button>注册</Button>
                        <Button>登陆</Button>
                    </Button.Group>
                </div>
            </div>
            <Layout.Header className={styles['main-header']}>
                <img src={logo} alt="" className={styles['App-logo']} />
                <Typography.Title level={3} className={styles.title}>React-Pc-Project</Typography.Title>
                <Input.Search
                    placeholder="请输入你想要去哪儿的玩意儿"
                    className={styles['search-input']}
                ></Input.Search>
            </Layout.Header>
            <Menu mode={"horizontal"} className={styles['main-muen']}>
                <Menu.Item key={1}>旅游首页</Menu.Item>
                <Menu.Item key={2}>周末游</Menu.Item>
                <Menu.Item key={3}>跟团游泳</Menu.Item>
                <Menu.Item key={4}>自由行</Menu.Item>
                <Menu.Item key={5}>私家团</Menu.Item>
                <Menu.Item key={6}>邮轮</Menu.Item>
                <Menu.Item key={7}>酒店+景点</Menu.Item>
                <Menu.Item key={8}>当地玩乐</Menu.Item>
                <Menu.Item key={9}>主题游</Menu.Item>
                <Menu.Item key={10}>定制游</Menu.Item>
                <Menu.Item key={11}>游学</Menu.Item>
                <Menu.Item key={12}>签证</Menu.Item>
                <Menu.Item key={13}>企业游</Menu.Item>
                <Menu.Item key={14}>高端游</Menu.Item>
                <Menu.Item key={15}>爱玩户外</Menu.Item>
                <Menu.Item key={16}>保险</Menu.Item>
            </Menu>
        </div>
    )
}