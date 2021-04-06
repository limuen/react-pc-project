import React from 'react'
import styles from './Login.module.css'
import { UserLayout } from '../../layouts/userLayout'
import { LoginForm } from './LoginForm'
export const Login: React.FC = (props) => {
    console.log(props)
    return (
        <UserLayout>
            <h1>登陆</h1>
            <LoginForm />
        </UserLayout>
    )
}