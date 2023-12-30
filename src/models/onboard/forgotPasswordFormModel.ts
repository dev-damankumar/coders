let forgotPasswordForm = {
  email: {
    el: "input",
    className: "col-md-12",
    labelClass: "inputlabel",
    config: {
      type: "email",
      placeholder: "Enter Email",
      name: "email",
      id: "email",
      value: "",
      className: "inputtext",
    },
    label: "Email",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
};
export default forgotPasswordForm;
