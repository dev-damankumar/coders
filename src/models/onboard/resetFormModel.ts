const resetPasswordForm = {
  password: {
    el: 'input',
    className: 'col-md-12',
    labelClass: 'inputlabel',
    config: {
      type: 'password',
      placeholder: 'Enter new password',
      name: 'password',
      id: 'password',
      value: '',
      className: 'inputtext',
    },
    label: 'Password',
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  confirmPassword: {
    el: 'input',
    className: 'col-md-12',
    labelClass: 'inputlabel',
    config: {
      type: 'password',
      placeholder: 'Enter confirm password',
      name: 'cpassword',
      id: 'cpassword',
      value: '',
      className: 'inputtext',
    },
    label: 'Confirm Password',
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
};
export default resetPasswordForm;
