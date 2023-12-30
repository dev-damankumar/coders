import React from 'react';
import If from "../If/If";

const Tags = ({tags}) => {
    return (
        <div className="tags">
            {tags?.map((tag, i) => <If key={`tag_${i}`} cond={tag}><div className="tag">{tag}</div></If>)}
        </div>
    );
};

export default Tags;
