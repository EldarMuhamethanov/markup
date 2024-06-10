import { Patch } from "immer";
import { SelectionStateData } from "./selection/SelectionState";

interface HistoryAction {
  patches: Patch[];
  invertedPatches: Patch[];
  selectionBefore: SelectionStateData | null;
  selectionAfter: SelectionStateData | null;
}

class History {
  private _actions: HistoryAction[] = [];
  private _currentIndex = 0;

  addAction(action: HistoryAction) {
    this._actions.splice(
      this._currentIndex,
      this._actions.length - this._currentIndex,
      action
    );
    this._currentIndex += 1;
  }

  canUndo() {
    return this._currentIndex > 0;
  }

  undo() {
    this._currentIndex -= 1;
    return this._actions[this._currentIndex];
  }

  canRedo() {
    return this._currentIndex <= this._actions.length - 1;
  }

  redo() {
    const action = this._actions[this._currentIndex];
    this._currentIndex += 1;
    return action;
  }
}

export { History };

export type { HistoryAction };
