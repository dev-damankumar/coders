import Loader from "./utils/loader";
import Toast from "./utils/toast";

const loader = new Loader();
const toast = new Toast();
const joinURL = (...args) => {
  return args.join("/");
};

export const env = import.meta.env;
export { loader, toast, joinURL };
