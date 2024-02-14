import errorImg from '../../assets/images/cancel.png';
import Modal from './Modal/Modal';

type ErrorMessagePropsType = {
  error: boolean;
  message: string;
  onClose?: () => void;
};
const ErrorMessage = (props: ErrorMessagePropsType) => {
  return (
    <Modal
      heading='Unexpected Error Occured'
      headerIcon={<img src={errorImg} />}
      body={
        <p className={`error`} style={{ margin: 0 }}>
          {props.message}
        </p>
      }
      onClose={() => {
        props.onClose?.();
      }}
      successButtonText='Go To Home'
      onSuccess={() => {
        location.href = '/';
      }}
    />
  );
};

export default ErrorMessage;
