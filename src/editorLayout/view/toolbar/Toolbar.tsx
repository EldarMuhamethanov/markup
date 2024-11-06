import React, { ReactNode } from "react";
import { RichTextOperationHandler } from "../../../richtext/richtextOperation/RichTextOperationHandler";
import styles from "./Toolbar.module.css";
import { Button, Space, Tooltip, Dropdown, MenuProps } from "antd";
import {
  BoldOutlined,
  DownOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
} from "@ant-design/icons";
import { ToggleInlineStyles } from "../../../richtext/model/InlineStyles";
import { SubscriptText } from "../../../common/icons/SubscriptText";
import { SuperscriptText } from "../../../common/icons/SuperscriptText";
import { HightlightText } from "../../../common/icons/HightlightText";
import { CodeText } from "../../../common/icons/CodeText";
import { SwitchParagraphType } from "../../../richtext/immutable/switchParagraphType";
import { HeadingIcon } from "../../../common/icons/HeadingIcon";
import {
  OrderedListOutlined,
  UnorderedListOutlined,
  QuestionOutlined,
} from "@ant-design/icons";

const Divider: React.FC = () => {
  return <div className={styles.divider}></div>;
};

interface IToolbarProps {
  operationHandler: RichTextOperationHandler;
}

const Toolbar: React.FC<IToolbarProps> = ({ operationHandler }) => {
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

  const headingItems: MenuProps["items"] = [
    {
      key: "heading-one",
      label: "Heading 1",
      icon: <HeadingIcon level={1} />,
    },
    {
      key: "heading-two",
      label: "Heading 2",
      icon: <HeadingIcon level={2} />,
    },
    {
      key: "heading-three",
      label: "Heading 3",
      icon: <HeadingIcon level={3} />,
    },
    {
      key: "heading-four",
      label: "Heading 4",
      icon: <HeadingIcon level={4} />,
    },
    {
      key: "heading-five",
      label: "Heading 5",
      icon: <HeadingIcon level={5} />,
    },
    {
      key: "heading-six",
      label: "Heading 6",
      icon: <HeadingIcon level={6} />,
    },
  ];

  const paragraphTypes: {
    icon: ReactNode;
    type: SwitchParagraphType;
    tooltipText: string;
  }[] = [
    {
      icon: <QuestionOutlined />,
      type: "quote",
      tooltipText: "Quote",
    },
    {
      icon: <UnorderedListOutlined />,
      type: "unordered-list-item",
      tooltipText: "Unordered list",
    },
    {
      icon: <OrderedListOutlined />,
      type: "ordered-list-item",
      tooltipText: "Ordered list",
    },
    {
      icon: <CodeText />,
      type: "code-block",
      tooltipText: "Code block",
    },
  ];

  const handleHeadingSelect: MenuProps["onClick"] = ({ key }) => {
    operationHandler.switchBlocksStyles(key as SwitchParagraphType);
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarContent}>
        <Space size="small">
          <Dropdown
            menu={{ items: headingItems, onClick: handleHeadingSelect }}
            dropdownRender={(element) => (
              <div onMouseDown={(e) => e.preventDefault()}>{element}</div>
            )}
          >
            <Button>
              <Space>
                <HeadingIcon level={1} />
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Divider />
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
