import { Flex } from "antd";
import React from "react";
import { observer } from "mobx-react-lite";
import { selectedDocumentData } from "../../model/AppModel";
import { DesktopButtons } from "./components/DesktopButtons";
import { MobileButtons } from "./components/MobileButtons";
import { ImportSection } from "./components/ImportSection";
import { ExportSection } from "./components/ExportSection";

const RightPart: React.FC = observer(() => {
  const contentState = selectedDocumentData.contentState;

  return (
    <Flex gap={10} align="center">
      <DesktopButtons />
      <MobileButtons />
      <ExportSection contentState={contentState} />
      <ImportSection />
    </Flex>
  );
});

export { RightPart };
