/*
 * @Author: zhouxishun
 * @Date: 2023-09-25 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-26 15:33:03
 * @Description: 图片
 */
import { meta } from './meta';
import React, { useEffect, useState } from 'react';

// const AltWrapper = styled(View)((p) => ({
//   display: 'inline-flex',
//   // position: "absolute",
//   alignItems: 'center',
//   justifyContent: 'center',
//   backgroundColor: '#f5f5f5',
//   flexShrink: 0,
// }));

// const ImageAlt = ({ height, width, ...rest }: ImageProps) => (
//   <AltWrapper style={{ height, width, ...rest.style }}>
//     图片
//   </AltWrapper>
// );

function _Image({ src, ...rest }: any, ref: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setError(false);
    setLoading(true);
    setImageSrc(src);
  }, [src]);

  if (!error && imageSrc) {
    return (
      <img
        ref={ref}
        src={src}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        onLoad={() => {
          setLoading(false);
        }}
        {...rest}
      />
    );
  }
  return <>图片</>;
}
const Image = React.forwardRef(_Image);

export const ContainerMeta = meta;
