import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../Components/Product'
import axios from 'axios'
import { useState, useEffect } from 'react'
//useSelector used for selecting specific part of state from redux
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
//
import Loader from '../Components/Loader'

axios.defaults.baseURL = 'http://127.0.0.1:8000/'

function HomePage() {
    //using Redux action, dont need local state anymore 
    //const [products, setProducts] =  useState([]);

    const dispatch = useDispatch()

    //reference store.js for what's in the state
    const productList = useSelector(state => state.productList)

    const { error, products, loading } = productList
    useEffect(() => {
        //data fetching now handled in Action
        // const fetchProducts = async () => {
        //     setProducts((await axios.get('api/products/')).data);
        // }
        // fetchProducts();

        dispatch(listProducts())
    }, [dispatch])

    return (
        <div>
            <h1>New Products</h1>
            {loading ? <Loader />
                : error ? <h3>{error}</h3>
                    : <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>}

        </div>
    )
}

export default HomePage