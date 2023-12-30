import React, { useState, useRef } from "react";
import { FileDrop } from "react-file-drop";
import "./FileInut.css";
import Toast from "../../utils/toast";
import Loader from "../../utils/loader";
import placeholder from "../../assets/images/placeholder.png";

let toast = new Toast();
let loader = Loader();
const FileInput = (props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  var loadFile = function (file) {
    var reader = new FileReader();
    loader.show();
    reader.onload = function () {
      if (!file.type.includes("image")) {
        props.onPreview(placeholder);
      } else {
        props.onPreview(reader.result);
      }
      loader.hide();
    };
    reader.readAsDataURL(file);
  };

  function uploadFile(files: FileList | null) {
    if (!files) return;
    if (files && Object.keys(files).length > 1)
      return toast.error(`Only single file can be uploaded`);
    const file = files[0];
    props.onUpload(file);
    loadFile(file);
  }

  const onDropHandler = (files: FileList | null) => {
    uploadFile(files);
  };

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    uploadFile(files);
    // do something with your files...
  };
  const onTargetClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  return (
    <>
      <input
        onChange={onFileInputChange}
        ref={fileInputRef}
        type="file"
        className="hidden"
      />
      <FileDrop
        onTargetClick={onTargetClick}
        onDrop={(files) => onDropHandler(files)}
      >
        Drop some files here!
      </FileDrop>
    </>
  );
};

export default FileInput;
