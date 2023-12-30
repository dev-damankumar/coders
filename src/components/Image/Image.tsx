import React, { useEffect, useState } from "react";
import img from "../../assets/images/placeholder.png";
import { env } from "../../utils";
import { net } from "../../helpers";

type ImageType = {
  defaultImg?: string;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const Image = ({ src, defaultImg, ...rest }: ImageType) => {
  const imgSrc = env["REACT_APP_BASE_URL"];
  const defaultImgSrc = defaultImg || img;
  const [source, setSource] = useState(
    src ? [imgSrc, src].join("/") : defaultImgSrc
  );
  useEffect(() => {
    setSource(src ? [imgSrc, src].join("/") : defaultImgSrc);
    try {
      net.get([imgSrc, src].join("/"));
    } catch (e) {
      setSource(defaultImgSrc);
    }
  }, [src]);
  return <img loading="lazy" src={source} {...rest} />;
};

export default Image;
