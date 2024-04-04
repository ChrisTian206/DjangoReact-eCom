import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Form } from 'react-bootstrap'
import Loader from '../Components/Loader'
import Messager from '../Components/Messager'
import FormContainer from '../Components/FormContainer'
import { getUserDetails, updateProfile } from '../actions/userActions'

function ProfilePage() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cmfPassword, setCmfPassword] = useState('')
    const [msg, setMsg] = useState('')

    const location = useLocation()
    const history = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const userLogin = useSelector(state => state.userLogin)
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)

    const { loading, error, user } = userDetails
    const { userInfo } = userLogin
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            history('/login')
        } else {
            //if we have a user loged in, but not yet load user's 
            if (!user || !user.username) {
                dispatch(getUserDetails('profile')) //then it will reach backend "/api/user/profile"
            } else {
                setUsername(user.username)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, user, userInfo, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== cmfPassword) {
            setMsg('Passwords do not match ')
        } else {
            console.log('updating profile for: ', user.username)
            dispatch(updateProfile({
                'user': user._id,
                'username': username,
                'email': email,
                'password': password
            }))
            setMsg('')
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>user profile</h2>
                {msg && <Messager variant={'danger'}>{msg}</Messager>}
                {error && <Messager variant={'danger'}>{error}</Messager>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler} >
                    <Form.Group controlId='username' className='mb-3'>
                        <Form.Label>Username</Form.Label>
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

                    <Form.Group controlId='password'>
                        <Form.Label>Confirm Your Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='confirm your password'
                            value={cmfPassword}
                            onChange={(e) => { setCmfPassword(e.target.value) }}>
                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary' className='mt-3'>Update</Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>my orders</h2>
            </Col>
        </Row>
    )
}

export default ProfilePage