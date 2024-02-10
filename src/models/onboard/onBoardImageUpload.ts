const formStructure = {
  image: {
    el: 'input',
    config: {
      type: 'file',
      name: 'profileImage',
      id: 'profileImage',
      accept: 'image/*',
    },
    label: 'Select Profile Image',
    touched: false,
  },
  cover: {
    el: 'input',
    config: {
      type: 'file',
      name: 'cover',
      id: 'cover',
      accept: 'image/*',
    },
    label: 'Select Cover Image',
    touched: false,
  },
};

export default formStructure;
