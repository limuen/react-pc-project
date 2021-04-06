import React from "react";
import styles from "./UserLayout.module.css";
import logo from "../../asstes/logo.svg";
import { Link } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { Layout, Menu, Dropdown, Button } from "antd";
const { Header, Footer, Content } = Layout;

export const UserLayout: React.FC = (props) => {
    // const menu = (
    //     <Menu>
    //         <Menu.Item>中文</Menu.Item>
    //         <Menu.Item>English</Menu.Item>
    //     </Menu>
    // );

    return (
        <Layout className={styles["user-layout-container"]}>
            <Header className={styles["header"]}>
                {/* <div className={styles["lang"]}>
                    <Dropdown overlay={menu}>
                        <Button>
                            {" "}
              选择语言 <CaretDownOutlined />
                        </Button>
                    </Dropdown>
                </div> */}
            </Header>
            <Content className={styles["content"]}>
                <div className={styles["top"]}>
                    <div className={styles["content-header"]}>
                        <Link to="/">
                            <img alt="logo" className={styles["logo"]} src={logo} />
                            <span className={styles["title"]}>React-Pc-Project</span>
                        </Link>
                    </div>
                    <div className={styles["desc"]}>
                        React Pc Project 是滨江区最具影响力的 React 的项目
                    </div>
                    {props.children}
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Copyright @ React 2021 滨江去选阿里中心技术部李沐恩出品</Footer>
        </Layout>
    );
};
