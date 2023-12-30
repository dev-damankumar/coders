import { Notification, useNotification } from "../../providers/Notification";
import ToastCloseIcon from "./ToastCloseIcon";
import ToastIcon from "./ToastIcon";

const Toast = ({ type = "warning", message, id }: Notification) => {
  const notification = useNotification();
  return (
    <div
      id={id}
      onMouseUp={() => {
        notification.remove(id);
      }}
      className="c-toast-body"
      role="alert"
    >
      <ToastIcon type={type} />
      <div className="c-toast-message">{message}</div>
      <button
        onClick={() => {
          notification.remove(id);
        }}
        type="button"
        className="c-toast-close-btn"
        data-dismiss-target="#toast-success"
        aria-label="Close"
      >
        <ToastCloseIcon />
      </button>
    </div>
  );
};

export default Toast;
