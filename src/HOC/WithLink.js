import React from 'react';
import { Link } from 'react-router-dom';

const WithLink = ({ destination, className, children }) => {
    return (
        <Link to={destination} className={className}>
            {children}
        </Link>
    )
}

export default WithLink;