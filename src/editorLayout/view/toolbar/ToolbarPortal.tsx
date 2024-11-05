import React, { RefObject, useEffect, useState } from "react";
import { Toolbar } from "./Toolbar";
import { RichTextOperationHandler } from "../../../richtext/richtextOperation/RichTextOperationHandler";
import { createPortal } from "react-dom";

interface IToolbarPortalProps {
  containerRef: RefObject<HTMLElement | null>;
  operationHandler: RichTextOperationHandler;
}

const ToolbarPortal: React.FC<IToolbarPortalProps> = ({
  containerRef,
  operationHandler,
}) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      setContainer(containerRef.current);
    });
  }, [containerRef]);

  if (!container) {
    return null;
  }
  return (
    <>
      {createPortal(
        <Toolbar operationHandler={operationHandler} />,
        container || document.body,
        "toolbar"
      )}
    </>
  );
};

export { ToolbarPortal };
