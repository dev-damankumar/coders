import React from 'react';
import logo from "../../assets/images/logo.svg"

function Loader(props) {
    return (
        <div className="loader">
            <img src={logo} />
        </div>
    );
}

export default Loader;