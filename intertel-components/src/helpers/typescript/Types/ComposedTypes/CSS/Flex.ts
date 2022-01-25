import { CSS_Generic } from "./Global";

type CSS_FlexAlignmentTypes =
  | "normal"
  | "stretch"
  | "center"
  | "start"
  | "end"
  | "flex-start"
  | "flex-end"
  | "baseline"
  | "first baseline"
  | "last baseline"
  | "safe center"
  | "unsafe center"
  | CSS_Generic;

type CSS_FlexGrowShrinkTypes = number | CSS_Generic;

export type { CSS_FlexAlignmentTypes, CSS_FlexGrowShrinkTypes };
