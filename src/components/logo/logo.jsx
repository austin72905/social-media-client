import React from 'react';
import logo from './logo.png';
import  './logo.scss';

function Logo(props) {
    return (
        <div className="logo-container">
            <img src={logo} alt="logo" className="logo-img"/>
        </div>
    );
}

export default Logo;