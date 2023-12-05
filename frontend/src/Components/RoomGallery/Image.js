import React from "react";

export default function Image({ src, ...rest }) {
  src =
    src && src.includes("https://")
      ? src
      : "https://travelgo-a9qu.onrender.com/" + src;
  return <img {...rest} src={src} alt={""} />;
}
