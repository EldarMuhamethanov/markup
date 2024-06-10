import { SelectionStateData } from "../model/selection/SelectionState";
import { ContentStateData } from "../model/content/ContentState";

type ModifyRichtextFnResult = { selection: SelectionStateData };

type ModifyRichtextFn = (
  contentState: ContentStateData,
  selection: SelectionStateData
) => ModifyRichtextFnResult;

export type { ModifyRichtextFn, ModifyRichtextFnResult };
