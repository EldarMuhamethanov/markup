import { ContentStateData } from "../../model/content/ContentState";
import { useCallback, useMemo, useRef } from "react";
import {
  SelectionState,
  SelectionStateData,
} from "../../model/selection/SelectionState";
import { ModifyRichtextFn } from "../../richtextOperation/ModifyRichtextFn";
import { applyPatches, produce } from "immer";
import { useHtmlElementEventHandler } from "../../../core/hooks/useHtmlElementEventHandler";
import { History } from "../../model/History";
import { useLatestRef } from "../../../core/hooks/useLatestRef";
import { verify } from "../../../core/verify";

type useRichtextStateArgs = {
  contentState: ContentStateData;
  setContentState: (contentState: ContentStateData) => void;
  setEditorSelection: (selection: SelectionStateData | null) => void;
  getEditorSelection: () => SelectionStateData | null;
};

function useRichtextState({
  contentState,
  setContentState,
  setEditorSelection,
  getEditorSelection,
}: useRichtextStateArgs) {
  const selectionRef = useRef<SelectionStateData | null>(null);
  const contentStateRef = useLatestRef(contentState);
  const setEditorSelectionRef = useLatestRef(setEditorSelection);
  const getEditorSelectionRef = useLatestRef(getEditorSelection);
  const setContentStateRef = useLatestRef(setContentState);

  const history = useMemo(() => new History(), []);

  useHtmlElementEventHandler("selectionchange", document, () => {
    const newSelection =
      getEditorSelectionRef.current && getEditorSelectionRef.current();
    if (!SelectionState.compare(newSelection, selectionRef.current)) {
      selectionRef.current = newSelection;
    }
  });

  const updateSelection = useCallback(
    (newSelection: SelectionStateData | null) => {
      if (!SelectionState.compare(selectionRef.current, newSelection)) {
        selectionRef.current = newSelection;
      }
      requestAnimationFrame(() =>
        verify(setEditorSelectionRef.current)(newSelection)
      );
    },
    [setEditorSelectionRef]
  );

  const modifyRichtextFn = useCallback(
    (modifyFn: ModifyRichtextFn) => {
      const selection = selectionRef.current;
      const contentState = verify(contentStateRef.current);
      if (!selection) {
        return;
      }
      let newSelection: SelectionStateData | null = null;
      const newContentState = produce(
        contentState,
        (draft) => {
          const result = modifyFn(draft, selection);
          newSelection = result.selection;
        },
        (patches, invertedPatches) => {
          if (patches.length) {
            history.addAction({
              patches,
              invertedPatches,
              selectionAfter: newSelection,
              selectionBefore: selection,
            });
          }
        }
      );

      if (contentState !== newContentState && setContentStateRef.current) {
        setContentStateRef.current(newContentState);
      }
      updateSelection(newSelection);
    },
    [
      selectionRef,
      contentStateRef,
      history,
      setContentStateRef,
      updateSelection,
    ]
  );

  const undo = useCallback(() => {
    const contentState = verify(contentStateRef.current);
    if (history.canUndo()) {
      const { invertedPatches, selectionBefore } = history.undo();
      const newContentState = applyPatches(contentState, invertedPatches);
      verify(setContentStateRef.current)(newContentState);
      updateSelection(selectionBefore);
    }
  }, [contentStateRef, history, setContentStateRef, updateSelection]);

  const redo = useCallback(() => {
    const contentState = verify(contentStateRef.current);
    if (history.canRedo()) {
      const { patches, selectionAfter } = history.redo();
      const newContentState = applyPatches(contentState, patches);
      verify(setContentStateRef.current)(newContentState);
      updateSelection(selectionAfter);
    }
  }, [contentStateRef, history, setContentStateRef, updateSelection]);

  return {
    modifyRichtextFn,
    undo,
    redo,
  };
}

export { useRichtextState };
