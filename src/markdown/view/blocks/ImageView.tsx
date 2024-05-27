import React from "react";
import { ImageBlock } from "../../common/types";

const ImageView: React.FC<ImageBlock> = (props) => {
  const content = <img alt={props.alt} src={props.src} />;

  if (props.href) {
    return (
      <p>
        <a href={props.href}>{content}</a>
      </p>
    );
  }
  return <p>content</p>;
};

export { ImageView };
