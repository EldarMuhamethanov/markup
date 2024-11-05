import Title from "antd/es/typography/Title";
import {Image} from "antd"
import styles from "./EmptyLayout.module.css";
import React from "react";

const EmptyLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.stub}>
        <Image src="/EmptyState.png" preview={false} className={styles.logo} alt="logo" />
        <Title level={5} className={styles.description}>
          Не выбран ни один документ
        </Title>
      </div>
    </div>
  );
};

export { EmptyLayout };
