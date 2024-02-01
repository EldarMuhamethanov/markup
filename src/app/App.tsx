import styles from "./App.module.css";
import { EditorLayout } from "../editorLayout/view/EditorLayout";

const App = (): JSX.Element => {
  return (
    <main className={styles.main}>
      <EditorLayout />
    </main>
  );
};

export default App;
