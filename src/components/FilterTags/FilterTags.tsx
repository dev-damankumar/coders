import React from 'react';

const FilterTags = ({tags,filterHandler}) => {
    return (
        <div className="col-md-12">
            <ul className="nav nav-pills category-tabs">
                <li className="nav-item">
                    <a onClick={filterHandler} className={`nav-link ${!tags ? "active" : ""}`} href="#all">All</a>
                </li>
                <li className="nav-item">
                    <a onClick={filterHandler} className={`nav-link ${tags === "html" ? "active" : ""}`}
                        href="#html">HTML</a>
                </li>
                <li className="nav-item">
                    <a onClick={filterHandler} className={`nav-link ${tags==="css" ? "active" : ""}`}
                        href="#css">CSS</a>
                </li>
                <li className="nav-item">
                    <a onClick={filterHandler} className={`nav-link ${tags==="js" ? "active" : ""}`}
                        href="#js">Javascript</a>
                </li>
                <li className="nav-item">
                    <a  onClick={filterHandler} className={`nav-link ${tags==="python" ? "active" : ""}`}
                       href="#python">Python</a>
                </li>
                <li className="nav-item">
                    <a onClick={filterHandler} className={`nav-link ${tags==="others" ? "active" : ""}`}
                      href="#others">Others</a>
                </li>
            </ul>
        </div>
    );
};

export default FilterTags;
