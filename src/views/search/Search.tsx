import React, { useEffect } from 'react'
import styles from './Search.module.css'
import { Spin } from 'antd'
import { searchProduct } from '../../state/productSearch/slice'
import { useSelector } from '../../state/hooks'
import { Header, Footer, FilterArea, ProductList } from '../../components/index'
import { useParams, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MainLayout } from '../../layouts/mainLayout'
interface MatchParams {
    keywords: string
}
export const Search: React.FC<MatchParams> = (props) => {
    const { keywords } = useParams<MatchParams>()
    const loading = useSelector(state => state.productSearch.loading)
    const pagination = useSelector(state => state.productSearch.pagination)
    const error = useSelector(state => state.productSearch.error)
    const productList = useSelector(state => state.productSearch.data)

    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        const searchData = async () => {
            dispatch(searchProduct({
                pageNumber: 1,
                pageSize: 10,
                keywords
            }))
        }
        searchData()
    }, [location])

    const onPageChange = (pageNumber, pageSize) => {
        dispatch(searchProduct({
            pageNumber,
            pageSize,
            keywords
        }))
    }

    return (
        <>
            {loading ?
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
                    {/* 分类过滤器 */}
                    <div className={styles['product-list-container']}>
                        <FilterArea />
                    </div>
                    {/* 产品列表 */}
                    <div className={styles['product-list-container']}>
                        <ProductList
                            data={productList}
                            paging={pagination}
                            onPageChange={onPageChange}
                        />
                    </div>
                </MainLayout>
            }
        </>

    )
}