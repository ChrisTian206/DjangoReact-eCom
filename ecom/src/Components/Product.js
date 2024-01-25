import React from 'react'
import { Card } from 'react-bootstrap'

function Product({ product }) {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href=''>
                <Card.Img />
            </a>

        </Card>
    )
}

export default Product