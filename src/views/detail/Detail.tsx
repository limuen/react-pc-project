import React, { useState, useEffect } from 'react'
import styles from './Detail.module.css'
import { Spin, Row, Col, DatePicker, Space } from 'antd'
import { RouteComponentProps, useParams } from 'react-router-dom'
import axios from 'axios'
import { Header, Footer, ProductIntro } from '../../components/index'
interface MatchParams {
    touristRouteId: string
}
const { RangePicker } = DatePicker;
export const Detail: React.FC<RouteComponentProps<MatchParams>> = (props) => {
    // 这里用useParams是因为可以直接在函数式组件中使用
    // props.match.params.touristRouteId 是用的HOC 写的类组件用withrouter包裹了才能访问到
    const { touristRouteId } = useParams<MatchParams>()
    const [loading, setLoading] = useState<boolean>(true)
    const [product, setProduct] = useState<any>(null)
    const [errror, setError] = useState<string | null>(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
                setProduct(data)
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    return (
        <>
            {
                loading ?
                    <Spin
                        size="large"
                        style={{
                            marginTop: 200,
                            marginBottom: 200,
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "100%",
                            height: "100%"
                        }} /> :
                    <>
                        <Header />
                        <div className={styles['page-content']}>
                            {/* 产品简介 与 日期选择 */}
                            <div className={styles['product-intro-container']}>
                                <Row>
                                    <Col span={13}>
                                        <ProductIntro
                                            title={product.title}
                                            shorDesciption={product.description}
                                            price={product.price}
                                            coupons={product.coupons}
                                            points={product.points}
                                            discount={product.price}
                                            rating={product.rating}
                                            pictures={product.touristRoutePictures.map((item) => item.url)}
                                        />
                                    </Col>
                                    <Col span={11}>
                                        <RangePicker
                                            open
                                            style={{
                                                marginTop: 20
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </div>
                            {/* 锚点菜单 */}
                            <div className={styles['product-detail-anchor']}></div>
                            {/* 产品特色 */}
                            <div id="feature" className={styles['product-detail-container']}></div>
                            {/* 费用 */}
                            <div id="fees" className={styles['product-detail-container']}></div>
                            {/* 预定须知 */}
                            <div id="notes" className={styles['product-detail-container']}></div>
                            {/* 商品评价 */}
                            <div id="comments" className={styles['product-detail-container']}></div>
                        </div>
                        <Footer />
                    </>
            }
        </>
        //
    )
}