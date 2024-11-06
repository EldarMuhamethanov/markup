import React, { useRef } from "react";
import { useParseBlockContent } from "../../common/hooks/useParseBlockContent";
import styles from "./ListItemView.module.css";

interface ListItemViewProps {
  text: string;
}

const ListItemView: React.FC<ListItemViewProps> = ({ text }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  useParseBlockContent(ref, text);

  return (
    <span ref={ref} className={styles.listItem}>
      {text}
    </span>
  );
};

export { ListItemView };
