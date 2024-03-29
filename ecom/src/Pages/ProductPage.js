import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../Components/Rating'
import Loader from '../Components/Loader'
import Messager from '../Components/Messager'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'

function ProductPage({ }) {
    const [quantity, setQuantity] = useState(1)
    const match = useParams()
    const history = useNavigate()

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    useEffect(() => {
        dispatch(listProductDetails(match.id))
    }, [dispatch, match])

    const addToCartHandler = () => {
        history(`/cart/${match.id}/?quantity=${quantity}`)
    }

    return (
        <div>

            {loading ?
                <Loader />
                : error ? <Messager variant='danger'>{error}</Messager>
                    : (
                        <Row>
                            <Col md={6}>

                                <Image src={`/images/${product.image}`} alt={product.name} fluid />
                            </Col>

                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Price: ${product.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>

                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Price:
                                                </Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Status:
                                                </Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Quantity</Col>
                                                    <Col xs='auto' className='my-1'>
                                                        <Form.Select
                                                            aria-label='Default select example'
                                                            as='select'
                                                            value={quantity}
                                                            onChange={(e) => setQuantity(e.target.value)}>
                                                            <option>Select Quantity</option>
                                                            {/* <option value={1}>1</option>
                                                            <option value={2}>2</option>
                                                            <option value={3}>3</option> */}

                                                            {/* mistake: I used {} at the arrow function. Nothing is returned
                                                            this way. I was why I'm not seeing the dropdown. Change it to () */}
                                                            {
                                                                [...Array(product.countInStock)].map((x, index) => (
                                                                    <option key={index + 1} value={index + 1}>
                                                                        {index + 1}
                                                                    </option>
                                                                ))
                                                            }

                                                        </Form.Select>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                        <ListGroup.Item>
                                            {product.countInStock > 0 ? (
                                                <Button
                                                    onClick={addToCartHandler}
                                                    className='btn-block'
                                                    type='button'
                                                    disabled={product.countInStock === 0}>
                                                    Add to Cart</Button>
                                            ) : (
                                                <Button className='btn-block' type='button' disabled>Out of Stock</Button>
                                            )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    )}




            <Link to='/' className='btn btn-light my-3'>Home</Link>

        </div>
    )
}

export default ProductPage