import React, { useCallback } from 'react';
import styles from '../view/markdownEditor/MarkdownEditorLayout.module.css';

interface UseResizerProps {
  containerClassName: string;
  onWidthChange: (width: number) => void;
  minWidth?: number;
  maxWidth?: number;
}

export const useResizer = ({
  containerClassName,
  onWidthChange,
  minWidth = 20,
  maxWidth = 80
}: UseResizerProps) => {
  const handleResize = useCallback((e: MouseEvent) => {
    const container = document.querySelector(`.${containerClassName}`);
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const newWidth =
      ((e.clientX - containerRect.left) / containerRect.width) * 100;

    const clampedWidth = Math.min(Math.max(newWidth, minWidth), maxWidth);
    onWidthChange(clampedWidth);
  }, [containerClassName, onWidthChange, minWidth, maxWidth]);

  const startResize = useCallback(() => {
    const stopResize = () => {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", stopResize);
    };

    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", stopResize);
  }, [handleResize]);

  const Resizer = useCallback(() => (
    <div className={styles.resizer} onMouseDown={startResize} />
  ), [startResize]);

  return { Resizer };
}; 