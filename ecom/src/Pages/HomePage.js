import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../Components/Product'
import axios from 'axios'
import { useState, useEffect } from 'react'

axios.defaults.baseURL = 'http://127.0.0.1:8000/'

function HomePage() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            setProducts((await axios.get('api/products')).data);
        }
        fetchProducts();
    }, [])
    return (
        <div>
            <h1>New Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomePage