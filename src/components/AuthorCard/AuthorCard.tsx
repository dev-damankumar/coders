import React from "react";
import img from "../../assets/images/profile.svg";
import Image from "../Image/Image";

const AuthorCard = ({ name, src, self, id }) => {
  return (
    <a
      href={self ? `/profile` : `/profile/${id}`}
      target="_blank"
      data-table-tooltip="true"
      className={`author-wrap ${self ? "author-self" : ""}`}
    >
      <Image className="author-img" src={src} defaultImg={img} />
      <p className="author-name">
        <span className="x-tooltip x-tooltip-up">{name || "anonymous"}</span>
        {name || "anonymous"}
      </p>
    </a>
  );
};

export default AuthorCard;
