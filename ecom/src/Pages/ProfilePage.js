import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Form } from 'react-bootstrap'
import Loader from '../Components/Loader'
import Messager from '../Components/Messager'
import FormContainer from '../Components/FormContainer'
import { getUserDetails } from '../actions/userActions'

function ProfilePage() {
    const location = useLocation()
    const history = useNavigate()
    const dispatch = useDispatch()

    return (
        <Row>
            <Col md={3}>
                <h2>user profile</h2>
            </Col>

            <Col md={9}>
                <h2>my orders</h2>
            </Col>
        </Row>
    )
}

export default ProfilePage