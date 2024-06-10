import { ContentStateData } from "../model/content/ContentState";
import { SelectionStateData } from "../model/selection/SelectionState";
import { ModifyRichtextFnResult } from "../richtextOperation/ModifyRichtextFn";
import { RichtextModifiers } from "./RichtextModifiers";

function onEnter(
  contentState: ContentStateData,
  selection: SelectionStateData
): ModifyRichtextFnResult {
  return RichtextModifiers.split(contentState, selection);
}

export { onEnter };
