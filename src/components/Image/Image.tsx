import React, { useRef } from 'react';
import img from '../../assets/images/placeholder.png';
import { env } from '../../utils';

type ImageType = {
  defaultImg?: string;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const Image = ({ src, defaultImg, ...rest }: ImageType) => {
  const imgSrc = env['REACT_APP_BASE_URL'];
  const defaultImgSrc = defaultImg || img;
  console.log("[imgSrc, src].join('/')", [imgSrc, src].join('/'));
  const source = src ? [imgSrc, src].join('/') : defaultImgSrc;
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
