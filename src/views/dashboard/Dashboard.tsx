import React from 'react'
import styles from './Dashboard.module.css';
import { Header, Footer, SideMenu, Carousel, ProductCollection, Cooperative } from '../../components'
import { Row, Col, Typography } from 'antd'
import { productList1, productList2, productList3 } from './mockups'
import sideImage1 from '../../asstes/images/sider_2019_12-09.png'
import sideImage2 from '../../asstes/images/sider_2019_02-04.png'
import sideImage3 from '../../asstes/images/sider_2019_02-04-2.png'
import { withTranslation, WithTranslation } from 'react-i18next'

class DashboardComponent extends React.Component<WithTranslation> {
    render() {
        const { t } = this.props
        return (
            <>
                <Header />
                {/* 页面内容 content */}
                <div className={styles['page-content']}>
                    <Row style={{ marginTop: 20 }}>
                        <Col span={6}>
                            <div>
                                <SideMenu />
                            </div>
                        </Col>
                        <Col span={18}>
                            <div>
                                <Carousel />
                            </div>
                        </Col>
                    </Row>
                    <ProductCollection
                        title={<Typography.Title level={3} type="warning">{t("dashboard.hot_recommended")}</Typography.Title>}
                        sideImage={sideImage1}
                        products={productList1}
                    />
                    <ProductCollection
                        title={<Typography.Title level={3} type="danger">{t("dashboard.new_arrival")}</Typography.Title>}
                        sideImage={sideImage2}
                        products={productList2}
                    />
                    <ProductCollection
                        title={<Typography.Title level={3} type="success">{t("dashboard.domestic_travel")}</Typography.Title>}
                        sideImage={sideImage3}
                        products={productList3}
                    />
                    <Cooperative
                        title={<Typography.Title level={3} type="secondary">{t("dashboard.joint_venture")}</Typography.Title>}
                    />
                </div>
                <Footer />
            </>
        )
    }
}

export const Dashboard = withTranslation()(DashboardComponent)