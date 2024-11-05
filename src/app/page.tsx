import styles from "./App.module.css";
import { EditorLayout } from "../editorLayout/view/EditorLayout";
import React from "react";

const App: React.FC = () => {
  return (
    <main className={styles.main}>
      <EditorLayout />
    </main>
  );
};

export default App;
