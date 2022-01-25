/**
 * Check if a specified CSS property exists (Existence in the CSS implementation, not in the CSS spec).
 * @public
 * @param {string} property The name of the CSS property.
 * @returns It will return true if the CSS property exists, false otherwise.
 */
const CSS_PropertyExists = (property: string): boolean =>
  new Option().style[property as any] === "";

/**
 * Validates a CSS property against a specified value.
 * @public
 * @param {string} property The name of the CSS property.
 * @param {string} value The string version of the CSS value to test the property with.
 * @returns It will return true if the value is valid for the specified CSS property, false otherwise.
 */
const CSS_ValidateProperty = (property: string, value: string): boolean => {
  const testElementStyle: CSSStyleDeclaration = new Option().style;

  if (CSS_PropertyExists(property)) testElementStyle[property as any] = value;

  return testElementStyle[property as any] === value;
};

export { CSS_ValidateProperty, CSS_PropertyExists };
