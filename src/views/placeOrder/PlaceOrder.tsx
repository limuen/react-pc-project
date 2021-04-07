import React from 'react'
import styles from './PlaceOrder.module.css'
import { CheckOutCard, PaymentForm } from '../../components'
import { MainLayout } from '../../layouts/mainLayout'
import { Row, Col } from 'antd'
import { useSelector } from '../../state/hooks'
import { useDispatch } from 'react-redux'
import { placeOrder } from '../../state/order/slice'
export const PlaceOrder: React.FC = () => {

    const jwt = useSelector(state => state.user.token) as string
    const loading = useSelector(state => state.order.loading)
    const OrderList = useSelector(state => state.order.currentOrder)
    const dispatch = useDispatch()

    return (
        <MainLayout>
            <Row>
                <Col span={12}>
                    <PaymentForm />
                </Col>
                <Col span={12}>
                    <CheckOutCard
                        loading={loading}
                        order={OrderList}
                        onCheckout={() => {
                            dispatch(placeOrder({ jwt, orderId: OrderList.id }))
                        }}
                    />
                </Col>
            </Row>
        </MainLayout>
    )
}