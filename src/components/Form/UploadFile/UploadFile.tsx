import { useState } from "react";
import Modal from "../../Modal/Modal";
import FileInput from "../../FileInput/FileInput";
import coverImg from "../../../assets/images/main-2.jpg";
import ImgIcon from "../../../assets/icons/ImgIcon";

type UploadFileType = {
  title: string;
  show: boolean;
  onUpload: (file: File) => void;
  onClose: () => void;
};
const UploadFile = (props: UploadFileType) => {
  const [previewImg, setpreviewImg] = useState(null);
  const [fileImg, setFileImg] = useState<File | null>(null);

  const uploadHandler = () => {};

  const upload = (
    <div className="upload-wrap">
      <FileInput
        onPreview={setpreviewImg}
        onUpload={
          props.onUpload
            ? (file: File) => {
                props.onUpload(file);
                setFileImg(file);
              }
            : uploadHandler
        }
      />
    </div>
  );

  const footer = (
    <div className="d-modal-wrap">
      {previewImg ? (
        <div className={`preview-img`}>
          <img src={previewImg ? previewImg : coverImg} />
          <div className={`preview-info`} data-table-tooltip="Copy">
            <h5 title={fileImg?.name}>{fileImg?.name}</h5>
            <div className="x-tooltip x-tooltip-dark x-tooltip-up">
              {fileImg?.name}
            </div>
            <span>{fileImg?.type}</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );

  return (
    <Modal
      heading={props.title ? props.title : `Upload Profile Image`}
      headerIcon={<ImgIcon />}
      body={upload}
      size="md"
      footer={footer}
      show={props?.show}
      onClose={props.onClose}
    />
  );
};

export default UploadFile;
