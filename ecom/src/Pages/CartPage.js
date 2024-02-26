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

    const removeItemHandler = (id) => {
        console.log('removed: ', id)
    }

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
                                            aria-label='Select qty'
                                            as='select'
                                            value={product.quantity}
                                            onChange={(e) => dispatch(addToCart(product.product, Number(e.target.value)))}>
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

                                    <Col md={1}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeItemHandler(product.product)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
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

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Subtotal ({cartItems.reduce((acc, product) => acc + product.qty, 0)}) items </h2>
                            ${cartItems.reduce((acc, product) => acc + product.qty * product.price, 0).toFixed(2)}
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartPage