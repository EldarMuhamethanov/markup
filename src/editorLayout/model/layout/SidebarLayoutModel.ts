import { makeAutoObservable } from "mobx";
import { LocalStorage, STORAGE_KEYS } from "@/core/localStorage/localStorage";

export class SidebarLayoutModel {
  private _isCollapsed: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  init() {
    const savedState = LocalStorage.getValue<boolean>(
      STORAGE_KEYS.SIDEBAR_COLLAPSED_KEY
    );
    if (savedState !== null) {
      this._isCollapsed = savedState;
    }
  }

  get isCollapsed() {
    return this._isCollapsed;
  }

  setCollapsed(value: boolean) {
    this._isCollapsed = value;
    LocalStorage.setValue<boolean>(STORAGE_KEYS.SIDEBAR_COLLAPSED_KEY, value);
  }
}
