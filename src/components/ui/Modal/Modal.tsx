import { useEffect, useState } from 'react';
import If from '../../hoc/If';
import classes from './Modal.module.css';
export type ModalTypes = {
  show?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  dark?: boolean;
  footer?: React.ReactNode | null | 'default';
  heading: string;
  hideCloseIcon?: boolean;
  headerIcon?: React.ReactNode;
  onClose?: () => void;
  onSuccess?: (...args: any) => any;
  body: React.ReactNode;
  cancelButtonText?: string;
  successButtonText?: string;
  hideSuccessButton?: boolean;
};

const Modal = ({
  show = true,
  size,
  dark,
  footer = 'default',
  heading = 'Modal Heading',
  hideCloseIcon,
  headerIcon,
  onClose,
  onSuccess,
  body,
  cancelButtonText,
  successButtonText,
  hideSuccessButton = false,
}: ModalTypes) => {
  const [showModal, setShowModal] = useState(show);
  const closeHandler = () => {
    onClose?.();
    setShowModal(false);
  };

  useEffect(() => {
    setShowModal(show);
  }, [show]);

  const successHandler = () => {
    onSuccess?.();
    closeHandler();
  };
  if (!showModal) return;
  return (
    <div
      className={`${classes.modal} ${showModal ? classes.show : ''} 
      ${dark ? classes.dark : ''}`}
    >
      <div
        className={`${classes.modalContent} ${
          size ? classes[`modal-${size}-content`] : ''
        }`}
      >
        <div className={classes.header}>
          <h3>
            {headerIcon} {heading}
          </h3>
          {!hideCloseIcon && (
            <span onClick={closeHandler} className={classes.close}>
              &times;
            </span>
          )}
        </div>
        <div className={classes.body}>{body}</div>
        <If cond={footer !== null}>
          <div className={classes.footer}>
            <If
              cond={footer !== 'default'}
              else={
                <div className={classes.footerWrapper}>
                  {!hideSuccessButton && (
                    <button
                      type='button'
                      onClick={successHandler}
                      className='btn btn-small btn-primary'
                    >
                      {successButtonText ? successButtonText : 'Submit'}
                    </button>
                  )}

                  <button
                    className='btn btn-small btn-dark'
                    type='reset'
                    onClick={closeHandler}
                  >
                    {cancelButtonText ? cancelButtonText : 'Cancel'}
                  </button>
                </div>
              }
            >
              {footer}
            </If>
          </div>
        </If>
      </div>
    </div>
  );
};

export default Modal;
