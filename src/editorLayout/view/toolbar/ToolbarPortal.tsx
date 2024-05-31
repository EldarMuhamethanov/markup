import React from "react";
import { createPortal } from "react-dom";
import { Toolbar } from "./Toolbar";
import { RichTextOperationHandler } from "../../../richtext/richtextOperation/RichTextOperationHandler";

interface IToolbarPortalProps {
  container: HTMLElement | null;
  operationHandler: RichTextOperationHandler;
}

const ToolbarPortal: React.FC<IToolbarPortalProps> = ({
  container,
  operationHandler,
}) => {
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
