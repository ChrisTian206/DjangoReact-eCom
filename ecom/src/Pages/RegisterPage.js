import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Form } from 'react-bootstrap'
import Loader from '../Components/Loader'
import Messager from '../Components/Messager'
import FormContainer from '../Components/FormContainer'
import { register } from '../actions/userActions'

function RegisterPage() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cmfPassword, setCmfPassword] = useState('')
    const [msg, setMsg] = useState('')

    const location = useLocation()
    const history = useNavigate()
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    //Once user is registered, redirect them; they shouldn't see the log in page again
    useEffect(() => {
        if (userInfo) {
            history(redirect)
        }
    }, [userInfo, redirect, history])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== cmfPassword) {
            setMsg('Passwords do not match ')
        } else {
            dispatch(register(username, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Log In</h1>
            {msg && <Messager variant={'danger'}>{msg}</Messager>}
            {error && <Messager variant={'danger'}>{error}</Messager>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='username' className='mb-3'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='enter your username'
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email' className='mb-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='enter your email'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='enter your password'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Confirm Your Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='confirm your password'
                        value={cmfPassword}
                        onChange={(e) => { setCmfPassword(e.target.value) }}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-3'>Register</Button>

                <Row className='py-2'>
                    <Col>
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Already have an account? </Link>
                    </Col>
                </Row>

            </Form>
        </FormContainer>
    )
}

export default RegisterPage