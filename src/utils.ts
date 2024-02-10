import Loader from './utils/loader';

const loader = new Loader();
const joinURL = (...args) => {
  return args.join('/');
};

export const env = import.meta.env;
export { loader, joinURL };
