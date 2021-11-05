import React, { useState, useEffect } from 'react'
import { Spin, Row, Col, DatePicker, Divider, Typography, Anchor, Menu, Button, } from 'antd'
import { RouteComponentProps, useParams } from 'react-router-dom'
import axios from 'axios'
import { Header, Footer, ProductIntro, ProductComments } from '../../components/index'
import { commentMockData } from './mockup'
import styles from './Detail.module.css'
import { productDetailSlice, getProductDetail } from "../../state/productDetail/slice"

import { useSelector } from '../../state/hooks'
import { useDispatch } from 'react-redux'
import { MainLayout } from '../../layouts/mainLayout'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { addShoppingCartItem } from '../../state/shoppingCart/slice'


interface MatchParams {
    touristRouteId: string
}
const { RangePicker } = DatePicker;
export const Detail: React.FC<RouteComponentProps<MatchParams>> = (props) => {
    // 这里用useParams是因为可以直接在函数式组件中使用
    // props.match.params.touristRouteId 是用的HOC 写的类组件用withrouter包裹了才能访问到
    const { touristRouteId } = useParams<MatchParams>()
    // hooks 写法
    // const [loading, setLoading] = useState<boolean>(true)
    // const [product, setProduct] = useState<any>(null)
    // const [errror, setError] = useState<string | null>(null)

    // hooks下访问redux的数据（createAsyncThunk
    const loading = useSelector(state => state.productDetail.loading)
    const error = useSelector(state => state.productDetail.error)
    const product = useSelector(state => state.productDetail.data)
    const dispatch = useDispatch()
    // 参数为string ｜ null 直接把它as string
    const jwt = useSelector(state => state.user.token) as string
    const shoppingCartLoading = useSelector(state => state.shoppingCart.loading)


    useEffect(() => {
        const fetchData = async () => {
            // hooks写法
            // setLoading(true)
            // RTK写法
            // dispatch(productDetailSlice.actions.fetchStart())
            // try {
            //     const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
            //     // setProduct(data)
            //     // setLoading(false)
            //     dispatch(productDetailSlice.actions.fetchSuccess(data))
            // } catch (error) {
            //     // setError(error.message)
            //     // setLoading(false)
            //     dispatch(productDetailSlice.actions.fetchFail(error.message))
            // }
            // 在RTK thunk异步代码请求数据
            dispatch(getProductDetail(touristRouteId))
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
                        }}
                    /> :
                    <MainLayout>
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
                                    <Button
                                        style={{ marginTop: 50, marginBottom: 30, display: 'block' }}
                                        type="primary"
                                        danger
                                        loading={shoppingCartLoading}
                                        onClick={() => {
                                            dispatch(addShoppingCartItem({ jwt, touristRouteId: product.id }))
                                        }}
                                    >
                                        <ShoppingCartOutlined />
                                        加入购物车
                                    </Button>

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
                        <Anchor className={styles['product-detail-anchor']}>
                            <Anchor.Link
                                href="#feature" title="产品特色"
                            />
                            <Anchor.Link
                                href="#fees" title="费用"
                            />
                            <Anchor.Link
                                href="#notes" title="预定须知"
                            />
                            <Anchor.Link
                                href="#comments" title="商品评价"
                            />
                        </Anchor>
                        {/* 产品特色 */}
                        <div id="feature" className={styles['product-detail-container']}>
                            <Divider orientation={'center'}>
                                <Typography.Title level={3}>产品特色</Typography.Title>
                            </Divider>
                            <div
                                dangerouslySetInnerHTML={{ __html: product.features }}
                                style={{
                                    margin: 50
                                }}
                            ></div>
                        </div>
                        {/* 费用 */}
                        <div id="fees" className={styles['product-detail-container']}>
                            <Divider orientation={'center'}>
                                <Typography.Title level={3}>费用</Typography.Title>
                            </Divider>
                            <div
                                dangerouslySetInnerHTML={{ __html: product.fees }}
                                style={{
                                    margin: 50
                                }}
                            ></div>
                        </div>
                        {/* 预定须知 */}
                        <div id="notes" className={styles['product-detail-container']}>
                            <Divider orientation={'center'}>
                                <Typography.Title level={3}>预定须知</Typography.Title>
                            </Divider>
                            <div
                                dangerouslySetInnerHTML={{ __html: product.notes }}
                                style={{
                                    margin: 50
                                }}
                            ></div>
                        </div>
                        {/* 商品评价 */}
                        <div id="comments" className={styles['product-detail-container']}>
                            <Divider orientation={'center'}>
                                <Typography.Title level={3}>商品评价</Typography.Title>
                            </Divider>
                            <div style={{ margin: 40 }}>
                                <ProductComments
                                    data={commentMockData}
                                />
                            </div>
                        </div>
                    </MainLayout>
            }
        </>
        //
    )
}
