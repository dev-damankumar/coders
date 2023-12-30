const customStyles = {
  menu: (provided: object) => ({
    ...provided,
    boxShadow:
      "0 1px 6px -4px rgb(0 0 0 / 12%), 0 9px 16px 0 rgb(0 0 0 / 8%), 0 18px 28px 8px rgb(0 0 0 / 5%)",
    marginTop: 0,
    border: "none",
    borderRadius: "0 0 10px 10px",
    padding: "5px 0",
    borderTop: "1px solid #efefef",
    zIndex: 999999,
    transition: "none",
  }),
  control: (style, { menuIsOpen }) => {
    return {
      // none of react-select's styles are passed to <Control />
      width: "140px !important",
      background: " #fafbfc",
      boxShadow: "none",
      border: "1px solid #e2e5e9",
      minWidth: " 120px",
      borderRadius: menuIsOpen ? "10px 10px 0 0" : "10px",
      cursor: "pointer",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      paddingRight: "0",
      transition: "none",
    };
  },
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    color: state.isSelected ? "white" : "#24292e",
    lineHeight: "1.5",
    padding: "5px 10px",
    fontSize: "14px",
    marginBottom: "3px",
    transition: "none",
  }),
};

export default customStyles;
