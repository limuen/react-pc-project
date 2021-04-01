import React from 'react'
import { Row, Col, Divider } from 'antd'
import styles from './Cooperative.module.css'

import image1 from '../../asstes/images/microsoft-80658_640.png'
import image2 from '../../asstes/images/icon-720944_640.png'
import image3 from '../../asstes/images/follow-826033_640.png'
import image4 from '../../asstes/images/facebook-807588_640.png'

const comImageList = [
    { src: image1, title: "microsoft" },
    { src: image2, title: "icon" },
    { src: image3, title: "follow" },
    { src: image4, title: "facebook" },
]

interface PropsType {
    title: JSX.Element
}


export const Cooperative: React.FC<PropsType> = (props) => {
    const { title } = props
    return (
        <div className={styles.content}>
            <Divider orientation="left">{title}</Divider>
            <Row>
                {comImageList.map((item, index) => (
                    <Col
                        span={6}
                        key={`comImange-${index}`}
                    >
                        <img src={item.src} alt="" className={styles['cooper-img']} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}