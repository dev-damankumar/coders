import { UserStateType } from '../providers/Auth';
import { getSubscriptionName } from '../utils/';

const localUser = localStorage.getItem('user') || null;
let user: UserStateType = null;
if (localUser) {
  user = JSON.parse(localUser);
}
const formStructure = {
  name: {
    el: 'input',
    config: {
      type: 'text',
      placeholder: 'Enter Your Name',
      name: 'name',
      id: 'name',
      value: user?.username || '',
    },
    label: 'Name',
    valid: true,
    touched: false,
  },
  email: {
    el: 'input',
    config: {
      type: 'email',
      disabled: true,
      placeholder: 'Enter Email',
      name: 'email',
      id: 'email',
      value: user?.email || '',
    },
    label: 'Email',
  },
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
  type: {
    el: 'input',
    config: {
      type: 'text',
      disabled: true,
      placeholder: 'Enter User Type',
      name: 'usertype',
      id: 'usertype',
      value: getSubscriptionName(user?.type) || 'Free User',
    },
    label: 'Subscription',
  },
  mobile: {
    el: 'input',
    config: {
      type: 'text',
      placeholder: 'Enter Mobile Number',
      name: 'mobile',
      id: 'mobile',
      value: user?.mobile || '',
    },
    label: 'Mobile Number',
    valid: true,
    touched: false,
  },
  address: {
    el: 'input',
    config: {
      type: 'text',
      placeholder: 'Enter Address',
      name: 'address',
      id: 'address',
      value: user?.address || '',
    },
    label: 'Address',
    valid: true,
    touched: false,
  },
  city: {
    el: 'input',
    config: {
      type: 'text',
      placeholder: 'Enter City',
      name: 'city',
      id: 'city',
      value: user?.city || '',
    },
    label: 'City',
    valid: true,
    touched: false,
  },
  country: {
    el: 'input',
    config: {
      type: 'text',
      placeholder: 'Enter Country',
      name: 'country',
      id: 'country',
      value: user?.country || '',
    },
    label: 'Country',
    valid: true,
    touched: false,
  },
  submit: {
    el: 'button',
    className: 'col-md-12',
    config: {
      type: 'submit',
      value: 'Next',
      style: { marginLeft: 'auto', display: 'block' },
    },
    label: 'date',
  },
};

export default formStructure;
