import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Form } from 'react-bootstrap'
import FormContainer from '../Components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingPage() {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [apt, setApt] = useState(shippingAddress.apt)
    const [city, setCity] = useState(shippingAddress.city)
    const [zipcode, setZipcode] = useState(shippingAddress.zipcode)
    const [state, setState] = useState(shippingAddress.state)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()
    const history = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('submit')
        dispatch(saveShippingAddress({
            address,
            apt,
            city,
            zipcode,
            state,
            country
        }))
        history('/payment')
    }

    return (
        <>
            <h1>Shipping</h1>
            <p style={{ textAlign: 'center', color: 'orange' }}>All fields except apt# are supposed to be required, but for dev purpose, required is removed.</p>
            <FormContainer>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='address' className='mb-3'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            //required
                            type='text'
                            placeholder='1000 John St'
                            value={address ? address : ''}
                            onChange={(e) => { setAddress(e.target.value) }}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='apt number' className='mb-3'>
                        <Form.Label>Apartment# (optional)</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='403'
                            value={apt ? apt : ''}
                            onChange={(e) => { setApt(e.target.value) }}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='city' className='mb-3'>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            //required
                            type='text'
                            placeholder='Vancouver'
                            value={city ? city : ''}
                            onChange={(e) => { setCity(e.target.value) }}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='zipcode' className='mb-3'>
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control
                            //required
                            type='text'
                            placeholder='V3A 1X4'
                            value={zipcode ? zipcode : ''}
                            onChange={(e) => { setZipcode(e.target.value) }}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='state' className='mb-3'>
                        <Form.Label>State/Providence</Form.Label>
                        <Form.Control
                            //required
                            type='text'
                            placeholder='Ontario'
                            value={state ? state : ''}
                            onChange={(e) => { setState(e.target.value) }}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='country' className='mb-3'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            //required
                            type='text'
                            placeholder='Canada'
                            value={country ? country : ''}
                            onChange={(e) => { setCountry(e.target.value) }}>
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>Next</Button>
                </Form>
            </FormContainer>

        </>
    )
}

export default ShippingPage