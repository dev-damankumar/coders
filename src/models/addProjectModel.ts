export const formStructure = {
  projectName: {
    el: 'input',
    config: {
      type: 'text',
      placeholder: 'Enter Project Name',
      name: 'title',
      id: 'title',
      value: '',
    },
    label: 'Project Name',
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  description: {
    el: 'input',
    config: {
      type: 'text',
      placeholder: 'Enter Description',
      name: 'description',
      id: 'description',
      value: '',
    },
    label: 'Description',
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  project: {
    el: 'input',
    config: {
      type: 'file',
      name: 'project',
      id: 'project',
      accept: '.zip,.rar,.7zip',
    },
    label: 'Select Project',
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  image: {
    el: 'input',
    config: {
      type: 'file',
      name: 'image',
      id: 'image',
    },
    label: 'Select Image',
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  tags: {
    el: 'select',
    config: {
      type: 'select',
      placeholder: 'Select Tags',
      name: 'tags',
      id: 'tags',
      value: '',
      multiple: true,
    },
    options: [],
    label: 'Tags',
  },
  projectImages: {
    el: 'input',
    config: {
      type: 'file',
      name: 'imageGrid',
      id: 'imageGrid',
      multiple: true,
    },
    label: 'Project Images',
  },
  setPrivacy: {
    el: 'input',
    config: {
      type: 'radio',
    },
    options: [
      {
        value: 'true',
        config: {
          name: 'visibility',
          id: 'public',
          checked: true,
        },
        label: 'Public',
      },
      {
        value: 'false',
        config: {
          name: 'visibility',
          id: 'private',
        },
        label: 'Private',
      },
    ],
    label: 'Set Privacy',
  },
  submit: {
    el: 'button',
    config: {
      type: 'submit',
      value: 'Next',
      style: { marginLeft: 'auto', display: 'block' },
    },
    label: 'date',
  },
};

export const executableStructure = {
  executableFile: {
    el: 'select',
    config: {
      type: 'select',
      placeholder: 'Select Executable File',
      name: 'executableFile',
      id: 'executableFile',
      value: '',
    },
    options: [],
    label: 'Select File',
  },
  submit: {
    el: 'button',
    config: {
      type: 'submit',
      value: 'Finish',
      style: { marginLeft: 'auto', display: 'block' },
    },
    label: 'date',
  },
};
