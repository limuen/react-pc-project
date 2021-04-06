import React from 'react'
import styles from './ProductIntro.module.css'
import { Typography, Carousel, Image, Table, Rate } from 'antd'
import { ColumnsType } from 'antd/es/table'
interface PropsType {
    title: string;
    shorDesciption: string;
    price: string | number;
    coupons: string;
    points: string;
    discount: string;
    rating: string | number;
    pictures: string[]
}

const columns: ColumnsType<RowType> = [
    {
        title: "title",
        dataIndex: "title",
        key: "title",
        align: "left",
        width: 120
    },
    {
        title: "desc",
        dataIndex: "desc",
        key: "desc",
        align: "left",
    }
]

interface RowType {
    title: string;
    desc: string | number | JSX.Element;
    key: number
}


export const ProductIntro: React.FC<PropsType> = (props) => {
    const { title, shorDesciption, price, coupons, points, discount, rating, pictures } = props
    const tableDataSource: RowType[] = [
        {
            key: 0,
            title: "路线名称",
            desc: title,
        },
        {
            key: 1,
            title: "价格",
            desc: (
                <>
                    ¥{" "}
                    <Typography.Text type="danger" strong>
                        {price}
                    </Typography.Text>
                </>
            ),
        },
        {
            key: 2,
            title: "限时抢购折扣",
            desc: discount ? (
                <>
                    ¥ <Typography.Text delete>{price}</Typography.Text>{" "}
                    <Typography.Text type="danger" strong>
                        ¥ {discount}
                    </Typography.Text>
                </>
            ) : (
                "暂无折扣"
            ),
        },
        {
            key: 3,
            title: "领取优惠",
            desc: coupons ? discount : "无优惠券可领",
        },
        {
            key: 4,
            title: "线路评价",
            desc: (
                <>
                    <Rate allowHalf defaultValue={+rating} />
                    <Typography.Text style={{ marginLeft: 10 }}>
                        {rating} 星
                    </Typography.Text>
                </>
            ),
        },
    ]
    return (
        <div className={styles['intro-container']}>
            <Typography.Title level={4}>{title}</Typography.Title>
            <Typography.Title level={4}>{shorDesciption}</Typography.Title>
            <div className={styles['intro-detail-content']}>
                <Typography.Text style={{ marginLeft: 20 }}>¥<span className={styles['intro-detail-strong-text']}>{price}</span>/人起</Typography.Text>
                <Typography.Text style={{ marginLeft: 20 }}>¥<span className={styles['intro-detail-strong-text']}>{rating}</span>分</Typography.Text>
            </div>
            <Carousel autoplay slidesToShow={3}>
                {pictures.map((item, index) =>
                    <Image height={150} src={item} key={`prictres-img-${index}`} />
                )}
            </Carousel>
            <Table<RowType>
                columns={columns}
                dataSource={tableDataSource}
                size="small"
                bordered={false}
                pagination={false}
                showHeader={false}
            />
        </div>
    )
}