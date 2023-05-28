/**
 * This TypeScript function validates whether a given string is a valid email address using a regular
 * expression.
 * @param {string} email - The `email` parameter is a string that represents an email address that
 * needs to be validated. The `validateEmail` function uses a regular expression to check if the email
 * address is valid or not. If the email address matches the regular expression, the function returns
 * `true`, otherwise it returns `false
 * @returns A boolean value indicating whether the input email string matches the regular expression
 * pattern for a valid email address.
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
