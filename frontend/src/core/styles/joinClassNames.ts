function joinClassNames(...args: Array<string | undefined>) {
  return args.filter((className) => !!className).join(" ");
}
export { joinClassNames };
