



function Video({ title, width = 1920, height = 1080, src, ...rest }) {
  return (

  <amp-video width={width} height={height}  layout="responsive" src={src.match(/^https?:/) ? src : `/video/${src}`} {...rest} ></amp-video>


  );
}

export default Video;
