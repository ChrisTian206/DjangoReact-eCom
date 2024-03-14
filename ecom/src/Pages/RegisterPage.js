import React from 'react'
import { useState, useEffect } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
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
    const [valid, setValid] = useState('')
    const [msg, setMsg] = useState('')

    const location = useLocation()
    const history = useNavigate()
    const dispatch = useDispatch()
    // const redirect = location.search ? location.search.split('=')[1] : '/'
    const userRegister = useSelector(state => state.userRegister)

    const { loading, error, userInfo } = userLogin

    //Once user is registered, redirect them; they shouldn't see the log in page again
    useEffect(() => {
        if (userInfo) {
            history(redirect)
        }
    }, [userInfo, redirect, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(register(email, password))
    }

    return (
        <FormContainer>
            <h1>Log In</h1>
            {error && <Messager variant={'danger'}>{error}</Messager>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='username' className='mb-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='enter your username'
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}>
                    </Form.Control>
                </Form.Group>

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
                <Button type='submit' variant='primary' className='mt-3'>Sign In</Button>
            </Form>
        </FormContainer>
    )
}

export default RegisterPage