import {
  Html5Outlined,
  FilePdfOutlined,
  FileMarkdownOutlined,
  GoogleOutlined,
  GithubOutlined,
  QuestionCircleOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import React from "react";

export const exportItems: MenuProps["items"] = [
  {
    label: "HTML",
    key: "html",
    icon: <Html5Outlined />,
  },
  {
    label: "PDF",
    key: "pdf",
    icon: <FilePdfOutlined />,
  },
  {
    label: "Markdown",
    key: "markdown",
    icon: <FileMarkdownOutlined />,
  },
  {
    label: "Google Drive",
    key: "gdrive",
    icon: <GoogleOutlined />,
  },
];

export const importItems: MenuProps["items"] = [
  {
    label: "Markdown",
    key: "markdown",
    icon: <FileMarkdownOutlined />,
  },
  {
    label: "HTML",
    key: "html",
    icon: <Html5Outlined />,
  },
  {
    label: "Google Drive",
    key: "gdrive",
    icon: <GoogleOutlined />,
  },
];

export const createMoreMenuItems = (
  setIsHelpModalOpen: (value: boolean) => void,
  setIsFeedbackModalOpen: (value: boolean) => void
): MenuProps["items"] => [
  {
    label: "GitHub",
    key: "github",
    icon: <GithubOutlined />,
    onClick: () =>
      window.open("https://github.com/EldarMuhamethanov/markup", "_blank"),
  },
  {
    label: "Справка по Markdown",
    key: "help",
    icon: <QuestionCircleOutlined />,
    onClick: () => setIsHelpModalOpen(true),
  },
  {
    label: "Обратная связь",
    key: "feedback",
    icon: <MessageOutlined />,
    onClick: () => setIsFeedbackModalOpen(true),
  },
]; 