import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';

function Header() {
    const userState = useSelector(state => state.userLogin)
    const { userInfo } = userState

    const logoutHandler = () => {
        console.log('Log out now')
    }
    return (
        <header>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    {/* Using LinkContainer reactifies link instead of refresh into home page when using <a> tag*/}
                    <LinkContainer to='/'>
                        <Navbar.Brand className='col-3'>My Shop</Navbar.Brand>
                    </LinkContainer>

                    {/* This div is used for spacing the brand and the rest */}
                    <div lg={6} md={3}> </div>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav" className='col-3'>
                        <Nav className="ms-auto">
                            <LinkContainer to='/'>
                                <Nav.Link ><i className='fa-solid fa-house-chimney'></i>Home</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/cart'>
                                <Nav.Link><i class="fa-solid fa-cart-shopping"></i>Cart</Nav.Link>
                            </LinkContainer>

                            {
                                userInfo ?
                                    <NavDropdown title={`${userInfo.username}`}>
                                        <LinkContainer to={'/profile'}>
                                            <Nav.Link><i class="fa-solid fa-user"></i>Profile</Nav.Link>
                                        </LinkContainer>

                                        <Nav.Link onClick={logoutHandler}><i class="fa-solid fa-door-open"></i>Logout</Nav.Link>
                                    </NavDropdown> :
                                    <LinkContainer to='/login'>
                                        <Nav.Link ><i class="fa-regular fa-user"></i>Login</Nav.Link>
                                    </LinkContainer>
                            }


                            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    )
}

export default Header
