import React from 'react'
import { useState, useEffect } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Form } from 'react-bootstrap'
import Loader from '../Components/Loader'
import Messager from '../Components/Messager'
import FormContainer from '../Components/FormContainer'
import { login } from '../actions/userActions'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const location = useLocation()
    const history = useNavigate()
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    //userInfo is empty before log in
    const { loading, error, userInfo } = userLogin

    //Once user is logged in, redirect them; they shouldn't see the log in page again
    useEffect(() => {
        if (userInfo) {
            // history.push(redirect) *This is a old way of doing redirect, it will error if do it now
            history(redirect)
        }
    }, [userInfo, redirect, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Log In</h1>
            {error && <Messager variant={'danger'}>{error}</Messager>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='email' className='mb-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='enter your email'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='enter your password'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}>
                    </Form.Control>
                </Form.Group>

                <Row className='py-2'>
                    <Col>
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> New User?</Link>
                    </Col>
                </Row>
                <Button type='submit' variant='primary' className='mt-3'>Sign In</Button>
            </Form>
        </FormContainer>
    )
}

export default LoginPage