import { useEffect, useState } from "react";

type ModalTypes = {
  show?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  dark?: boolean;
  footer?: React.ReactNode;
  heading: string;
  hideCloseButton?: boolean;
  headerIcon?: React.ReactNode;
  onClose?: () => void;
  onSuccess?: () => void;
  body: React.ReactNode;
  cancelButtonText?: string;
  successButtonText?: string;
};
const Modal = ({
  show = true,
  size,
  dark,
  footer,
  heading,
  hideCloseButton,
  headerIcon,
  onClose,
  onSuccess,
  body,
  cancelButtonText,
  successButtonText,
}: ModalTypes) => {
  let [showModal, setShowModal] = useState(show);
  let close = () => {
    onClose?.();

    if (!onClose) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    setShowModal(show);
  }, [show]);
  let successModal = () => {
    onSuccess?.();
    close();
  };

  return showModal ? (
    <div className={`dModal dModal-show ${dark ? "dModalDark" : ""}`}>
      <div
        className={`dModal-content ${size ? `dModal-${size}-content` : ""}`}
        data-modal-content="sm"
      >
        <div className="dModal-header">
          <h3>
            {headerIcon} {heading}
          </h3>
          {!hideCloseButton && (
            <span
              onClick={close}
              className="dModal-close"
              data-modal-destroy=""
            >
              &times;
            </span>
          )}
        </div>
        <div className="dModal-body">{body}</div>
        {footer ? (
          footer
        ) : (
          <div className="dModal-footer">
            <div className="d-modal-button-div">
              <button
                type="button"
                onClick={successModal}
                className="btn btn-small btn-primary"
              >
                {successButtonText ? successButtonText : "Submit"}
              </button>
              <button
                className="btn btn-small btn-dark"
                type="reset"
                onClick={close}
              >
                {cancelButtonText ? cancelButtonText : "Cancel"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Modal;
