import React, { useEffect } from 'react';
import styles from './ShoppingCart.module.css'
import { MainLayout } from '../../layouts/mainLayout'
import { Row, Col, Affix } from 'antd'
import { ProductList, PaymentCard } from '../../components'
import { clearShoppingCartItem, checkoutShoppingCart } from '../../state/shoppingCart/slice'
import { useDispatch } from 'react-redux'
import { useSelector } from '../../state/hooks'
import { useHistory } from 'react-router-dom'

export const ShoppingCart: React.FC = () => {
    const loading = useSelector(state => state.shoppingCart.loading)
    const shoppingCartItems = useSelector(state => state.shoppingCart.items)
    const jwt = useSelector(state => state.user.token) as string
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        // dispatch(getShoppingCart(token))
    }, [])


    return (
        <MainLayout>
            <Row>
                {/* 购物车清单 */}
                <Col span={16}>
                    <div className={styles['product-list-container']}>
                        <ProductList
                            data={shoppingCartItems.map((item, index) => item.touristRoute)}
                        />
                    </div>
                </Col>
                {/* 支付卡组件 */}
                <Col span={8}>
                    <Affix>
                        <div className={styles['payment-card-container']}>
                            <PaymentCard
                                loading={loading}
                                originalPrice={shoppingCartItems.map(p => p.originalPrice).reduce((a, b) => a + b, 0)}
                                price={shoppingCartItems.map(p => p.originalPrice * (p.discountPresent ? p.discountPresent : 1)).reduce((a, b) => a + b, 0)}
                                onCheckout={() => {
                                    if (shoppingCartItems.length <= 0) {
                                        return
                                    }
                                    dispatch(checkoutShoppingCart(jwt))
                                    history.push('/placeOrder')
                                }}
                                onShoppingCartClear={() => {
                                    dispatch(clearShoppingCartItem({ jwt, itemIds: shoppingCartItems.map(c => c.id) }))
                                }}
                            />
                        </div>
                    </Affix>
                </Col>
            </Row>
        </MainLayout>
    )
}