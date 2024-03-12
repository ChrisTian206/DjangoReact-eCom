import React, { Children } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
function FormContainer({ children }) {
    return (
        <Container>
            {/* the md in there means to set the Row fluid until md breakpoint. So it won't continue being fluid when window shrinks to mobile size view */}
            <Row className='justify-content-md-center '>
                {/* Col spans the entire width when view window is xs, spans half when md */}
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer