import React, { useState } from "react";

const Pagination = ({ total, pageNo, limit, onPagination }) => {
  let pages = Math.ceil(total / limit);
  let pageArray = Array.from(Array(pages).keys());
  let [disabled, setDisabled] = useState("prev");

  let moveHandler = (type) => {
    let page;
    if (type === "next") {
      if (pageArray.length !== pageNo) {
        page = pageNo + 1;
        onPagination(page);
        if (page === pageArray.length) {
          setDisabled("next");
        } else {
          setDisabled("");
        }
      } else {
        setDisabled("next");
      }
    }
    if (type === "prev") {
      if (pageNo > 1) {
        page = pageNo - 1;
        onPagination(page);
        if (page > 1) {
          setDisabled("prev");
        } else {
          setDisabled("");
        }
      } else {
        setDisabled("prev");
      }
    }
  };

  return (
    <ul className="pagination">
      <li
        className={`page-item ${disabled === "prev" ? "page-disabled" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          moveHandler("prev");
        }}
      >
        <a className="page-link" href="#">
          <i className="bx bx-chevron-left" />
        </a>
      </li>
      {pageArray.map((v, i) => {
        return (
          <li
            className="page-item"
            key={i}
            onClick={(e) => {
              e.preventDefault();
              if (pageNo !== i + 1) {
                onPagination(i + 1);
                if (pageArray.length === i + 1) {
                  setDisabled("next");
                } else if (i + 1 === 1) {
                  setDisabled("prev");
                } else {
                  setDisabled("");
                }
              }
            }}
          >
            <a
              className={`page-link ${
                pageNo === i + 1 ? "active-warning" : ""
              }`}
              href="#"
            >
              {i + 1}
            </a>
          </li>
        );
      })}

      <li
        className={`page-item ${disabled === "next" ? "page-disabled" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          moveHandler("next");
        }}
      >
        <a className="page-link" href="#my-projects">
          <i className="bx bx-chevron-right" />
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
