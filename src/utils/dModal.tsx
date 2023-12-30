import React from "react";
import ReactDOM from "react-dom";

type DModalType = {
  size?: string;
  dark?: boolean;
  footer?: React.ReactNode;
  heading: string;
  hideCloseButton?: string;
  headerIcon: React.ReactNode;
  onClose?: () => void;
  onSuccess?: () => void;
  body: React.ReactNode;
  cancelButtonText?: string;
  successButtonText?: string;
};
const DModal = ({
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
}: DModalType) => {
  const closeModal = () => {
    if (onClose) {
      onClose();
    }
    ReactDOM.unmountComponentAtNode(document.getElementById("modal")!);
  };

  const successModal = () => {
    onSuccess();
    ReactDOM.unmountComponentAtNode(document.getElementById("modal")!);
  };

  const modalEl = (
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
              ×
            </span>
          )}
        </div>
        <div className="dModal-body">{body}</div>
        {footer ? (
          footer
        ) : footer != false ? (
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
                onClick={closeModal}
              >
                {cancelButtonText ? cancelButtonText : "Cancel"}
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );

  ReactDOM.render(modalEl, document.getElementById("modal"));

  return DModal;
};

const close = () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("modal")!);
};
export { DModal, close as DModalClose };
