"use client"

import Image from  'next/image';
import { useState } from 'react';

export default function FallbackImage(props) {
  const [erro, setErro] = useState(false)
  
  const _className = erro
    ? (props.className ? props.className + " !backdrop-grayscale !saturate-[0.78]  " : "backdrop-grayscale saturate-[0.78]")
    : (props.className || "")
  
  return (
    <Image
      {...props}
      src={erro ? '/images/banner.webp' : props.src}
	  className={_className}
      onError={() => setErro(true)}
    />
  )
}