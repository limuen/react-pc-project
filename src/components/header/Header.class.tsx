import React from 'react'
import logo from '../../asstes/logo.svg'
import styles from './Header.module.css'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import store from '../../state/store'
import { LanguageState } from '../../state/languageReducer'
import { withTranslation, WithTranslation } from 'react-i18next'

interface State extends LanguageState { }


class HeaderComponent extends React.Component<RouteComponentProps & WithTranslation, State>{
    constructor(props) {
        super(props)
        // 获取store方法
        const storeState = store.getState()
        this.state = {
            language: storeState.language,
            languageList: storeState.languageList
        }
        store.subscribe(this.handleStoreChange);
    }

    handleStoreChange = () => {
        const storestate = store.getState()
        this.setState({
            language: storestate.language,
            languageList: storestate.languageList
        })
    }



    handleMenuClick = (e) => {
        console.log(e.key, 'e')
        if (e.key === 'new') {
            // 处理新语言action
            const action = {
                type: "add_language",
                payload: { code: 'new_language', name: '新语言' }
            }
            store.dispatch(action)
        } else {
            const action = {
                type: "change_language",
                payload: e.key
            };
            store.dispatch(action)
        }

    }


    render() {
        const { history, t } = this.props
        return (
            <div className={styles['App-header']}>
                <div className={styles['top-header']}>
                    <div className={styles.inner}>
                        <Typography.Text>{t("header.slogan")}</Typography.Text>
                        <Dropdown.Button
                            style={{ marginLeft: 15 }}
                            overlay={
                                <Menu onClick={this.handleMenuClick}>
                                    {
                                        this.state.languageList.map(item => {
                                            return <Menu.Item key={item.code}>{item.name}</Menu.Item>
                                        })
                                    }
                                    <Menu.Item key={"new"}>{t("header.add_new_language")}</Menu.Item>
                                </Menu>
                            }
                            icon={<GlobalOutlined />}
                        >
                            {this.state.language === 'zh' ? '中文' : 'English'}
                        </Dropdown.Button>
                        <Button.Group className={styles['button-group']}>
                            <Button onClick={() => history.push('register')}>{t("header.register")}</Button>
                            <Button onClick={() => history.push('login')}>{t("header.signin")}</Button>
                        </Button.Group>
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
            </div>
        )
    }
}

export const Header = withTranslation()(withRouter(HeaderComponent))