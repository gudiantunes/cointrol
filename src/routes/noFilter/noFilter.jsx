import React from 'react';
import { Link } from 'react-router-dom';

function NoFilter(props) {
    return (
        <div>
          Filter not found
          <Link to='/'>Return to Home</Link>
        </div>
    );
}

export default NoFilter;