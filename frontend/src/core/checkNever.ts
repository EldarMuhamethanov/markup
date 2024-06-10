function checkNever(
  value: never,
  message = `unhandled value: ${JSON.stringify(value, null, " ")}`
) {
  console.error(message);
}

export { checkNever };
