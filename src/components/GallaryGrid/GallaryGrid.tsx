import React from 'react';
import {baseURL} from "../../config";

const GallaryGrid = ({images}) => {
    return (
        <div className="gallery-grid">
            {images?.map((image, i) => <div className="gallery-item" key={`image_${i}`}>
                <img alt={image} src={[baseURL, image].join("/")} className="rounded-image thumbnail"/>
            </div>)}
        </div>
    );
};

export default GallaryGrid;
