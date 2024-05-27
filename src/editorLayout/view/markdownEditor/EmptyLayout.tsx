import Title from "antd/es/typography/Title";
import styles from "./EmptyLayout.module.css";
import React from "react";

const EmptyLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.stub}>
        <img src="./EmptyState.png" alt="EmptyState" className={styles.logo} />
        <Title level={5} className={styles.description}>
          Не выбран ни один документ
        </Title>
      </div>
    </div>
  );
};

export { EmptyLayout };
