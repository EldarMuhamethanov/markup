import { joinClassNames } from "./joinClassNames";

type ModsType = {
  [item: string]: boolean;
};

function getStylesWithMods(defaultStyle: string, mods: ModsType): string {
  const styles = [defaultStyle];
  const modsStyles = Object.keys(mods).filter((style) => mods[style]);
  styles.push(...modsStyles);
  return joinClassNames(...styles);
}

export { getStylesWithMods };
