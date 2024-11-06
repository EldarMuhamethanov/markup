import { makeAutoObservable } from "mobx";
import { LocalStorage, STORAGE_KEYS } from "../../../core/localStorage/localStorage";

export class EditorLayoutModel {
  private _leftPaneWidth: number = 50;

  constructor() {
    makeAutoObservable(this);
  }

  get leftPaneWidth(): number {
    return this._leftPaneWidth;
  }

  setLeftPaneWidth(width: number) {
    this._leftPaneWidth = width;
    this.saveToLocalStorage();
  }

  init() {
    const savedWidth = LocalStorage.getValue<number>(STORAGE_KEYS.EDITOR_LEFT_PANE_WIDTH);
    if (savedWidth !== null) {
      this._leftPaneWidth = savedWidth;
    }
  }

  private saveToLocalStorage() {
    LocalStorage.setValue(STORAGE_KEYS.EDITOR_LEFT_PANE_WIDTH, this._leftPaneWidth);
  }
} 