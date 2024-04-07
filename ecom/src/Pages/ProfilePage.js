import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Form } from 'react-bootstrap'
import Loader from '../Components/Loader'
import Messager from '../Components/Messager'
import { getUserDetails, updateProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfilePage() {
    const [name, setName] = useState('')
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

    const { userInfo } = userLogin
    const { loading, error, user } = userDetails

    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            history('/login')
        } else {
            //if we have a user loged in, but not yet load user's 
            if (!user || !user.name || success) {
                console.log('profilePage, in if(!user||!user.username) says: ', 'I ran!')
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile')) //then it will reach backend "/api/user/profile"
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, user, userInfo, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== cmfPassword) {
            setMsg('Passwords do not match ')
        } else {
            console.log('updating profile for: ', user.name)
            dispatch(updateProfile({
                'user': user._id,
                'name': name,
                'email': email,
                'password': password,
                'greet': 'hiii from front end'
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
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='enter your username'
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}>
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