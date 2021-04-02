import React from 'react'
import styles from './Dashboard.module.css';
import { Header, Footer, SideMenu, Carousel, ProductCollection, Cooperative } from '../../components'
import { Row, Col, Typography } from 'antd'
import { productList1, productList2, productList3 } from './mockups'
import sideImage1 from '../../asstes/images/sider_2019_12-09.png'
import sideImage2 from '../../asstes/images/sider_2019_02-04.png'
import sideImage3 from '../../asstes/images/sider_2019_02-04-2.png'


export class Dashboard extends React.Component {
    render() {
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
                        title={<Typography.Title level={3} type="warning">爆款推荐</Typography.Title>}
                        sideImage={sideImage1}
                        products={productList1}
                    />
                    <ProductCollection
                        title={<Typography.Title level={3} type="danger">新品上市</Typography.Title>}
                        sideImage={sideImage2}
                        products={productList2}
                    />
                    <ProductCollection
                        title={<Typography.Title level={3} type="success">国内游推荐</Typography.Title>}
                        sideImage={sideImage3}
                        products={productList3}
                    />
                    <Cooperative
                        title={<Typography.Title level={3} type="secondary">合作系统</Typography.Title>}
                    />
                </div>
                <Footer />
            </>
        )
    }
}
