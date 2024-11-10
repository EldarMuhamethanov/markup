import { Flex } from "antd";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { selectedDocumentData } from "../../model/AppModel";
import { GeneratePdfModalLoadingModal } from "./GeneratePdfModalLoadingModal";
import { MarkdownHelpModal } from "./MarkdownHelpModal";
import { FeedbackModal } from "./FeedbackModal";
import { DesktopButtons } from "./components/DesktopButtons";
import { MobileButtons } from "./components/MobileButtons";
import { ImportSection } from "./components/ImportSection";
import { ExportSection } from "./components/ExportSection";

const RightPart: React.FC = observer(() => {
  const contentState = selectedDocumentData.contentState;
  const [generatePdfModalOpened, setGeneratePdfModalOpened] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  return (
    <Flex gap={10} align="center">
      <DesktopButtons
        onHelpClick={() => setIsHelpModalOpen(true)}
        onFeedbackClick={() => setIsFeedbackModalOpen(true)}
      />

      <MobileButtons
        setIsHelpModalOpen={setIsHelpModalOpen}
        setIsFeedbackModalOpen={setIsFeedbackModalOpen}
      />

      <ExportSection
        contentState={contentState}
        setGeneratePdfModalOpened={setGeneratePdfModalOpened}
      />

      <ImportSection />

      <GeneratePdfModalLoadingModal isOpen={generatePdfModalOpened} />
      <MarkdownHelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </Flex>
  );
});

export { RightPart };
