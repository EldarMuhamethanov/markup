import React, { ReactNode, useState } from "react";
import { RichTextOperationHandler } from "../../../richtext/richtextOperation/RichTextOperationHandler";
import styles from "./Toolbar.module.css";
import { Button, Space, Tooltip } from "antd";
import {
  BoldOutlined,
  DownOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { ToggleInlineStyles } from "../../../richtext/model/InlineStyles";
import { SubscriptText } from "../../../common/icons/SubscriptText";
import { SuperscriptText } from "../../../common/icons/SuperscriptText";
import { getStylesWithMods } from "../../../core/styles/getStylesWithMods";
import { HightlightText } from "../../../common/icons/HightlightText";
import { CodeText } from "../../../common/icons/CodeText";
import { SwitchParagraphType } from "../../../richtext/immutable/switchParagraphType";

const Divider: React.FC = () => {
  return <div className={styles.divider}></div>;
};

interface IToolbarProps {
  operationHandler: RichTextOperationHandler;
}

const Toolbar: React.FC<IToolbarProps> = ({ operationHandler }) => {
  const [showed, setShowed] = useState(true);

  const inlineStyles: Array<{
    icon: ReactNode;
    style: ToggleInlineStyles;
    tooltipText: string;
  }> = [
    {
      icon: <BoldOutlined />,
      style: "bold",
      tooltipText: "Bold",
    },
    {
      icon: <ItalicOutlined />,
      style: "italic",
      tooltipText: "Italic",
    },
    {
      icon: <StrikethroughOutlined />,
      style: "strikethrow",
      tooltipText: "Strikethrow",
    },
    {
      icon: <SubscriptText />,
      style: "subscript",
      tooltipText: "Subscript",
    },
    {
      icon: <SuperscriptText />,
      style: "superscript",
      tooltipText: "Superscript",
    },
    {
      icon: <HightlightText />,
      style: "highlight",
      tooltipText: "Highlight",
    },
    {
      icon: <CodeText />,
      style: "inlineCode",
      tooltipText: "Inline code",
    },
  ];

  const paragraphTypes: {
    icon: ReactNode;
    type: SwitchParagraphType;
    tooltipText: string;
  }[] = [
    {
      icon: <BoldOutlined />,
      type: "quote",
      tooltipText: "Quote",
    },
    {
      icon: <ItalicOutlined />,
      type: "unordered-list-item",
      tooltipText: "Unordered list item",
    },
  ];

  return (
    <div
      className={getStylesWithMods(styles.toolbar, {
        [styles.toolbar_hidden]: !showed,
      })}
    >
      <div className={styles.toolbarContent}>
        <span
          className={styles.toolbarHideButton}
          onClick={() => setShowed(!showed)}
        >
          {showed ? <DownOutlined /> : <UpOutlined />}
        </span>
        <Space>
          <Space>
            {inlineStyles.map((inlineStyle) => (
              <Tooltip
                key={inlineStyle.style}
                trigger={"hover"}
                placement={"top"}
                title={inlineStyle.tooltipText}
              >
                <Button
                  type={"default"}
                  size={"middle"}
                  icon={inlineStyle.icon}
                  onClick={() =>
                    operationHandler.toggleInlineStyle(inlineStyle.style)
                  }
                />
              </Tooltip>
            ))}
          </Space>
          <Divider />
          <Space>
            {paragraphTypes.map((paragraphType) => (
              <Tooltip
                key={paragraphType.type}
                trigger={"hover"}
                placement={"top"}
                title={paragraphType.tooltipText}
              >
                <Button
                  type={"default"}
                  size={"middle"}
                  icon={paragraphType.icon}
                  onClick={() =>
                    operationHandler.switchBlocksStyles(paragraphType.type)
                  }
                />
              </Tooltip>
            ))}
          </Space>
        </Space>
      </div>
    </div>
  );
};

export { Toolbar };
