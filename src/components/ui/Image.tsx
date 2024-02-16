import React, { useRef } from 'react';
import img from '../../assets/images/placeholder.png';
import { baseURL } from '../../constants';
import { isAbsoluteURL, joinURL } from '../../utils/helper';

type ImageType = {
  defaultImg?: string;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const Image = ({ src, defaultImg, ...rest }: ImageType) => {
  const imgSrc = baseURL;
  const defaultImgSrc = defaultImg || img;
  const isAbsUrl = isAbsoluteURL(src || '');
  const source = src ? (isAbsUrl ? src : joinURL(imgSrc, src)) : defaultImgSrc;
  const ref = useRef<HTMLImageElement>(null);
  const setDefaultImage = () => {
    if (ref.current) {
      ref.current.src = defaultImgSrc;
    }
  };
  return (
    <img
      {...rest}
      loading='lazy'
      src={source}
      ref={ref}
      onError={setDefaultImage}
    />
  );
};

export default Image;
