import React from 'react'
import { useEffect } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import Messager from '../Components/Messager'
import { addToCart } from '../actions/cartActions'

function CartPage() {
    const match = useParams()
    const history = useNavigate()
    const location = useLocation()

    const productId = match.id;
    const searchParams = new URLSearchParams(location.search)
    const qty = searchParams.get('quantity')

    //the 10 is the parseInt means quantity is a 10-based integer
    const quantity = qty ? parseInt(qty, 10) : 1

    // console.log(quantity)

    const dispatch = useDispatch()

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, quantity))
        }
    }, [dispatch, productId, quantity])

    const products = useSelector(state => state.cart)
    const { cartItems } = products

    //console.log('cartItems: ', cartItems)

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems ? (
                    // variant 'flush' removes the rounded edge and outer border
                    <ListGroup variant='flush'>
                        {cartItems.map(product => (
                            <ListGroupItem>
                                <Row>
                                    <Col md={2}>
                                        <Image src={`/images/${product.image}`} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${product.price}
                                    </Col>

                                    <Col md={3}>
                                        <Form.Select
                                            aria-label='Default select example'
                                            as='select'
                                            value={product.quantity}
                                            onChange={(e) => dispatch(addToCart(product.product, e.target.value))}>
                                            <option>{product.qty}</option>
                                            {
                                                [...Array(product.countInStock)].map((x, index) => (
                                                    index + 1 !== product.qty ? (
                                                        <option key={index + 1} value={index + 1}>
                                                            {index + 1}
                                                        </option>
                                                    ) : null
                                                ))
                                            }
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                ) : (
                    <Messager variant='info'>
                        Your Cart is empty <Link to='/'>Continue Shopping</Link>
                    </Messager>
                )}

            </Col>

            <Col md={8}>
            </Col>
        </Row>
    )
}

export default CartPage