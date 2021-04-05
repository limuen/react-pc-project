import React from 'react'
import styles from './Dashboard.module.css';
import { Header, Footer, SideMenu, Carousel, ProductCollection, Cooperative } from '../../components'
import { Row, Col, Typography, Spin } from 'antd'
// import { productList1, productList2, productList3 } from './mockups'
import sideImage1 from '../../asstes/images/sider_2019_12-09.png'
import sideImage2 from '../../asstes/images/sider_2019_02-04.png'
import sideImage3 from '../../asstes/images/sider_2019_02-04-2.png'
import { withTranslation, WithTranslation } from 'react-i18next'
import axios from 'axios'
import { connect } from 'react-redux'
import { RoutState } from '../../state/store'
import { feachRecommendActionCreator, feachRecommendSuccessActionCreator, feachRecommendFailActionCreator } from '../../state/recommend/recommendActions'

const mapStateToProps = (state: RoutState) => {
    return {
        loading: state.recommendReducer.loading,
        error: state.recommendReducer.error,
        productList: state.recommendReducer.productList
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchStart: () => {
            dispatch(feachRecommendActionCreator())
        },
        fetchSuccess: (data) => {
            dispatch(feachRecommendSuccessActionCreator(data))
        },
        fetchFail: (error) => {
            dispatch(feachRecommendFailActionCreator(error))
        }
    }
}



type PropsType = WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class DashboardComponent extends React.Component<PropsType> {

    async componentDidMount() {
        this.props.fetchStart()
        try {
            const { data } = await axios.get("http://123.56.149.216:8080/api/productCollections")
            this.props.fetchSuccess(data)
        } catch (error) {
            this.props.fetchFail(error.message)
        }
    }


    render() {
        const { t, loading, error, productList } = this.props
        if (loading) {
            return (
                <Spin
                    size="large"
                    style={{
                        marginTop: 200,
                        marginBottom: 200,
                        marginLeft: "auto",
                        marginRight: "autp",
                        width: "100%"
                    }}
                />
            )
        }

        if (error) {
            return <div>{error}</div>
        }

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
                        products={productList[0].touristRoutes}
                    />
                    <ProductCollection
                        title={<Typography.Title level={3} type="danger">{t("dashboard.new_arrival")}</Typography.Title>}
                        sideImage={sideImage2}
                        products={productList[1].touristRoutes}
                    />
                    <ProductCollection
                        title={<Typography.Title level={3} type="success">{t("dashboard.domestic_travel")}</Typography.Title>}
                        sideImage={sideImage3}
                        products={productList[2].touristRoutes}
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

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(DashboardComponent))