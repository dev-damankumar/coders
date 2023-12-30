export type RegisterUserType = {
  name: string;
  mobile: string;
  email: string;
  password: string;
  city: string;
  country: string;
  address: string;
};

const registerStructure = {
  name: {
    el: "input",
    config: {
      type: "text",
      placeholder: "Enter Your Name",
      name: "name",
      id: "name",
      value: "",
      className: "inputtext",
    },
    labelClass: "inputlabel",
    label: "Name",
    validation: {
      required: true,
    },
    className: "col-md-6",
    valid: false,
    touched: false,
  },
  mobile: {
    el: "input",
    labelClass: "inputlabel",
    className: "col-md-6",
    config: {
      type: "tel",
      placeholder: "Enter Mobile Number",
      name: "mobile",
      id: "mobile",
      value: "",
      className: "inputtext",
    },
    label: "Mobile",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  email: {
    el: "input",
    className: "col-md-6",
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
  password: {
    el: "input",
    className: "col-md-6",
    labelClass: "inputlabel",
    config: {
      type: "password",
      placeholder: "Enter Password",
      name: "password",
      id: "password",
      value: "",
      className: "inputtext",
    },
    label: "Password",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  city: {
    el: "input",
    className: "col-md-6",
    labelClass: "inputlabel",
    config: {
      type: "text",
      placeholder: "Enter City",
      name: "city",
      id: "city",
      value: "",
      className: "inputtext",
    },
    label: "City",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  country: {
    el: "input",
    className: "col-md-6",
    labelClass: "inputlabel",
    config: {
      type: "text",
      placeholder: "Enter Country",
      name: "country",
      id: "country",
      value: "",
      className: "inputtext",
    },
    label: "Country",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  address: {
    el: "textarea",
    className: "col-md-12",
    labelClass: "inputlabel",
    config: {
      placeholder: "Enter Address",
      name: "address",
      id: "address",
      value: "",
      className: "inputtext",
    },
    label: "Address",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
};
export default registerStructure;
