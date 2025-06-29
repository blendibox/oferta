



function Video({ image, width = 1920, height = 1080, src, ...rest }) {
  return (

  <amp-video  poster={image} width={width} height={height}  src={src.match(/^https?:/) ? src : `/video/${src}`} {...rest} ></amp-video>


  );
}

export default Video;
