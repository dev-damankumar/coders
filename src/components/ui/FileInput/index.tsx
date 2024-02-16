import React, { useRef } from 'react';
import { FileDrop } from 'react-file-drop';
import classes from './index.module.css';
import { loader } from '../../../utils/helper';
import placeholder from '../../../assets/images/placeholder.png';
import { useNotification } from '../../../providers/Notification';

type FileInputProps = {
  onPreview: React.Dispatch<React.SetStateAction<string | null>>;
  onUpload: React.Dispatch<React.SetStateAction<File | null>>;
};
const FileInput = (props: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const notification = useNotification();
  var loadFile = function (file: File) {
    var reader = new FileReader();
    loader.show();
    reader.onload = function () {
      if (!file.type.includes('image')) {
        props.onPreview(placeholder);
      } else {
        props.onPreview(reader.result as string);
      }
      loader.hide();
    };
    reader.readAsDataURL(file);
  };

  function uploadFile(files: FileList | null) {
    if (!files) return;
    if (files && Object.keys(files).length > 1)
      return notification.error('Only single file can be uploaded');
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
        type='file'
        className='hidden'
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
