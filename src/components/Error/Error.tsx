import errorImg from "../../assets/images/cancel.png";

type ErrorMessagePropsType = {
  error: boolean;
  message: string;
};
const ErrorMessage = (props: ErrorMessagePropsType) => {
  return (
    <div className="dModal dModal-show">
      <div className="dModal-content dModal-sm-content" data-modal-content="sm">
        <div className="dModal-header">
          <h3>
            <img src={errorImg} /> Unexpected Error Occured
          </h3>
          <span className="dModal-close" data-modal-destroy="">
            x
          </span>
        </div>
        <div className="dModal-body">
          <p className={`error`} style={{ margin: 0 }}>
            {props.message}
          </p>
        </div>
        <div className="dModal-footer">
          <div className="d-modal-button-div">
            <button className={`btn btn-small btn-primary`} type="button">
              <a href={"/"}> Go To Home</a>
            </button>
            <button
              className={`btn btn-small btn-dark`}
              type="reset"
              data-modal-close=""
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
