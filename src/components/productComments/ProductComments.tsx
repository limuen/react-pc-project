import React from 'react';
import { Comment, Tooltip, List } from 'antd';
import styles from './ProductComments.module.css'

interface PropsType {
    data: {
        author: string,
        avatar: string,
        content: string,
        createDate: string
    }[]
}

export const ProductComments: React.FC<PropsType> = (props) => {
    const { data } = props
    return (
        <List
            header={`${data.length} replies`}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => {
                return (
                    <li>
                        <Comment
                            author={item.author}
                            avatar={item.author}
                            content={item.content}
                            datetime={item.createDate}
                        />
                    </li>
                )
            }}
        />
    )
}