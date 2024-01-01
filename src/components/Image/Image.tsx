import React from "react";
import img from "../../assets/images/placeholder.png";
import { env } from "../../utils";

type ImageType = {
  defaultImg?: string;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const Image = ({ src, defaultImg, ...rest }: ImageType) => {
  const imgSrc = env["REACT_APP_BASE_URL"];
  const defaultImgSrc = defaultImg || img;
  const source = src ? [imgSrc, src].join("/") : defaultImgSrc;
  // useEffect(() => {
  //   (async () => {
  //     setSource(src ? [imgSrc, src].join("/") : defaultImgSrc);
  //     try {
  //       await net.get([imgSrc, src].join("/"), {
  //         mode: "no-cors",
  //       });
  //     } catch (e) {
  //       setSource(defaultImgSrc);
  //     }
  //   })();
  // }, [src]);
  return <img loading="lazy" src={source} {...rest} />;
};

export default Image;
