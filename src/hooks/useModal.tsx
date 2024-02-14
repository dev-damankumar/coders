import ReactDOM from 'react-dom/client';
import Modal, { ModalTypes } from '../components/ui/Modal/Modal';

const ModalFn = ({
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
}: ModalTypes) => {
  const root = ReactDOM.createRoot(document.getElementById('modal')!);
  const closeModal = () => {
    if (onClose) {
      onClose?.();
    }
    root.unmount();
  };

  const successModal = () => {
    onSuccess?.();
    root.unmount();
  };

  const modalEl = (
    <Modal
      body={body}
      heading={heading}
      size={size}
      dark={dark}
      footer={footer}
      hideCloseIcon={hideCloseIcon}
      headerIcon={headerIcon}
      onClose={closeModal}
      onSuccess={successModal}
      cancelButtonText={cancelButtonText}
      successButtonText={successButtonText}
    />
  );

  root.render(modalEl);
};

const useModal = () => {
  return { modal: ModalFn };
};

export default useModal;
