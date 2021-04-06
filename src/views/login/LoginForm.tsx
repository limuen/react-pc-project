import React, { useEffect } from 'react'
import styles from './LoginForm.module.css'

import { Form, Input, Button, Checkbox } from 'antd';
import { login } from '../../state/user/slice'
import { useSelector } from '../../state/hooks'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
};
const tailLayout = {
    wrapperCol: { offset: 7, span: 17 },
};

export const LoginForm: React.FC = () => {

    const loading = useSelector(state => state.user.loading)
    const error = useSelector(state => state.user.error)
    const token = useSelector(state => state.user.token)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        console.log(token, 'token')
        if (token != null) {
            history.push('/')
        }
    }, [token])

    const onFinish = (values: any) => {
        console.log('Success:', values);
        dispatch(login({
            email: values.username,
            password: values.password
        }))
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={styles['login-form']}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    登陆
                </Button>
            </Form.Item>
        </Form>
    );
};