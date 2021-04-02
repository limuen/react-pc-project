import React from 'react'
import styles from './Detail.module.css'
import { RouteComponentProps } from 'react-router-dom'

interface MatchParams {
    touristRouteId: string
}

export const Detail: React.FC<RouteComponentProps<MatchParams>> = (props) => {
    console.log(props)
    return (
        <div>detail,路线ID： {props.match.params.touristRouteId}</div>
    )
}