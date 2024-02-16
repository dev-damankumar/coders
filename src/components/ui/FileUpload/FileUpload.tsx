import React, { useState } from 'react';
import filePlaceholder from '../../assets/images/file-img.png';
import { baseImageSrc } from '../../../constants';
import { isAbsoluteURL } from '../../../utils/helper';
const FileUpload = React.forwardRef(
  (
    {
      name,
      id,
      accept = 'image/*',
      defaultImage = filePlaceholder,
      ...rest
    }: React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > & {
      name: string;
      id: string;
      accept?: string;
      defaultImage?: string;
    },
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [preview, setPreview] = useState<string[]>([defaultImage]);
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files || [];
      const temp = [...preview];

      for (let file of files) {
        if (file.type.includes('image')) {
          temp.push(URL.createObjectURL(file));
        } else {
          temp.push(filePlaceholder);
        }
      }
      setPreview(temp);
    };
    return (
      <div>
        <div className='main-file-wrap'>
          <div className='file-make-div '>
            <input
              {...rest}
              type='file'
              name={name}
              id={id}
              accept={accept}
              ref={ref}
              onChange={onChangeHandler}
            />
            <i className='bx bx-plus' />
          </div>
          {preview.map((src, index) => {
            return (
              <img
                src={isAbsoluteURL(src) ? src : `${baseImageSrc}/${src}`}
                key={index}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

export default FileUpload;
