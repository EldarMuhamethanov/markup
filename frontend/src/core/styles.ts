function convertObjectStyleToString(cssProperties: Record<string, string>) {
  return Object.entries(cssProperties).reduce(
    (res, [key, value]) => res + `${key}: ${value}; \n`,
    ""
  );
}

export { convertObjectStyleToString };
