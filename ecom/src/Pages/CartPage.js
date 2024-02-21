import React from 'react'
import { useEffect } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Messager } from '../Components/Messager'
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

    console.log(quantity)
    return (
        <div>CartPage</div>
    )
}

export default CartPage