import React, { useState, useEffect } from 'react'
import logo from '../../asstes/logo.svg'
import styles from './Header.module.css'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'
import { useSelector } from '../../state/hooks'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'

import { LanguageActionTypes, changeLanguageActionCreator, addLanguageActionCreator } from '../../state/language/languagesActions'
import { useTranslation } from 'react-i18next'
import { UserSlice } from '../../state/user/slice'
import jwt_decode, { JwtPayload as DefaultJwtPayload } from 'jwt-decode'

interface JwtPayload extends DefaultJwtPayload {
    username: string
}


export const Header: React.FC = () => {
    const history = useHistory() // 导航操作
    const location = useLocation() // 当前路径信息
    const params = useParams() // 路径匹配的数据
    const match = useRouteMatch() // url的参数
    // 映射
    const language = useSelector((state) => state.language.language)
    const languageList = useSelector((state) => state.language.languageList)
    const jwt = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    // const dispatch = useDispatch<Dispatch<LanguageActionTypes>>()

    const [username, setUsername] = useState<string>("")

    useEffect(() => {
        if (jwt) {
            const token = jwt_decode<JwtPayload>(jwt)
            setUsername(token.username)
        }
    }, [jwt])


    const { t } = useTranslation()
    const handleMenuClick = (e) => {
        console.log(e.key, 'e')
        if (e.key === 'new') {
            dispatch(addLanguageActionCreator("新语言", "new_language"))
        } else {
            dispatch(changeLanguageActionCreator(e.key))
        }
    }

    const onLogout = () => {
        dispatch(UserSlice.actions.logOut())
        history.push('/')
    }

    return (
        < div className={styles['App-header']} >
            <div className={styles['top-header']}>
                <div className={styles.inner}>
                    <Typography.Text>{t("header.slogan")}</Typography.Text>
                    <Dropdown.Button
                        style={{ marginLeft: 15 }}
                        overlay={
                            <Menu onClick={handleMenuClick}>
                                {
                                    languageList.map(item => {
                                        return <Menu.Item key={item.code}>{item.name}</Menu.Item>
                                    })
                                }
                                <Menu.Item key={"new"}>{t("header.add_new_language")}</Menu.Item>
                            </Menu>
                        }
                        icon={<GlobalOutlined />}
                    >
                        {language === 'zh' ? '中文' : 'English'}
                    </Dropdown.Button>
                    {
                        jwt ? (
                            <Button.Group className={styles['button-group']}>
                                <Typography.Text>
                                    {t("header.welcome")}
                                    <Typography.Text strong>{username}</Typography.Text>
                                </Typography.Text>
                                <Button>{t("header.shoppingCart")}</Button>
                                <Button onClick={onLogout}>{t("header.signout")}</Button>
                            </Button.Group>
                        ) : (
                            <Button.Group className={styles['button-group']}>
                                <Button onClick={() => history.push('/register')}>{t("header.register")}</Button>
                                <Button onClick={() => history.push('/login')}>{t("header.signin")}</Button>
                            </Button.Group>
                        )
                    }
                </div>
            </div>
            <Layout.Header className={styles['main-header']}>
                <span onClick={() => history.push('/')}>
                    <img src={logo} alt="" className={styles['App-logo']} />
                    <Typography.Title level={3} className={styles.title}>{t("header.title")}</Typography.Title>
                </span>
                <Input.Search
                    placeholder="请输入你想要去哪儿的玩意儿"
                    className={styles['search-input']}
                    onSearch={(keywords) => history.push(`/search/${keywords}`)}
                ></Input.Search>
            </Layout.Header>
            <Menu mode={"horizontal"} className={styles['main-muen']}>
                <Menu.Item key={1}>{t("header.home_page")}</Menu.Item>
                <Menu.Item key={2}>{t("header.weekend")}</Menu.Item>
                <Menu.Item key={3}>{t("header.group")}</Menu.Item>
                <Menu.Item key={4}>{t("header.weekend")}</Menu.Item>
                <Menu.Item key={5}>{t("header.group")}</Menu.Item>
                <Menu.Item key={6}>{t("header.backpack")}</Menu.Item>
                <Menu.Item key={7}>{t("header.private")}</Menu.Item>
                <Menu.Item key={8}>{t("header.cruise")}</Menu.Item>
                <Menu.Item key={9}>{t("header.hotel")}</Menu.Item>
                <Menu.Item key={10}>{t("header.local")}</Menu.Item>
                <Menu.Item key={11}>{t("header.theme")}</Menu.Item>
                <Menu.Item key={12}>{t("header.custom")}</Menu.Item>
                <Menu.Item key={13}>{t("header.enterprise")}</Menu.Item>
                <Menu.Item key={14}>{t("header.high_end")}</Menu.Item>
                <Menu.Item key={15}>{t("header.outdoor")}</Menu.Item>
                <Menu.Item key={16}>{t("header.insurance")}</Menu.Item>
            </Menu>
        </div >
    )
}