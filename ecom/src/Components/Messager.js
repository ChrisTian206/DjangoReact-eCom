import React from 'react'
import { Alert } from 'react-bootstrap'

function Messager({ variant, children }) {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}

export default Messager