import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({ product }) {
    console.log(product)
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={`/images/${product.image}`} />
            </Link>

            <Card.Body>
                <Link href={`product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>

                    <Card.Text as='div'>
                        <div className='my-3'>
                            {/* {product.rating} from {product.numReviews} reviews */}
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                        </div>
                    </Card.Text>

                    <Card.Text as='h3'>
                        ${product.price}
                    </Card.Text>

                </Link>
            </Card.Body>
        </Card>
    )
}

export default Product