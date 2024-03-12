import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader() {
    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <Spinner
                animation='border' role='status' style={{ height: '100px', width: '100px' }}>

                {/* sr-only means screen reader only, you won't see it on screen thou */}
                <span className='sr-only'>Loading...</span>
            </Spinner>
        </div>
    );
}

export default Loader