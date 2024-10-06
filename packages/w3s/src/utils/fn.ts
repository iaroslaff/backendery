type SingleSymbol = string & { __singleSymbolBrand: never }

/**
 * Ensures the provided string is exactly one symbol (one character).
 * If the string meets this condition, it is returned as a branded `SingleSymbol` type.
 * Throws an error if the string length is not exactly one.
 *
 * @param {string} symbol - The string to validate.
 * @returns {SingleSymbol} The input string cast as `SingleSymbol` if it is exactly one character long.
 * @throws {Error} Throws an error if the string length is not equal to one.
 *
 * @example
 * // valid usage
 * const validSymbol = assertSingleSymbol('a');
 *
 * // invalid usage
 * const invalidSymbol = assertSingleSymbol('ab');
 */
export function assertSingleSymbol(symbol: string): SingleSymbol {
  if (symbol.length !== 1) {
    throw new Error("string must be exactly one symbol")
  }
  /** convert string to SingleSymbol type after checking */
  return symbol as SingleSymbol
}

/**
 * Retrieves the computed width of the first element that matches the given CSS selector.
 *
 * @param {string} selector - A valid CSS selector string used to identify the target element.
 * @returns {number} - The computed width of the element in pixels as an integer.
 *
 * @throws {Error} - Throws an error if no element matching the selector is found.
 *
 * @example
 * // Assuming an element with id 'my-element' exists with a width of 200px:
 * const width = getElementWidth('#my-element');
 * console.log(width);
 */
export function getElementWidth(selector: string): number {
  const elt = document.querySelector(selector) as Element
  if (!elt) {
    throw new Error("the specified selector could not be found")
  }

  const width: number = parseInt(window.getComputedStyle(elt).getPropertyValue("width"))

  return width
}

/**
 * Retrieves the computed height of the first element that matches the given CSS selector.
 *
 * @param {string} selector - A valid CSS selector string used to identify the target element.
 * @returns {number} - The computed height of the element in pixels as an integer.
 *
 * @throws {Error} - Throws an error if no element matching the selector is found.
 *
 * @example
 * // Assuming an element with id 'my-element' exists with a height of 400px:
 * const height = getElementHeight('#my-element');
 * console.log(height); // 400
 */
export function getElementHeight(selector: string): number {
  const elt = document.querySelector(selector) as Element
  if (!elt) {
    throw new Error("the specified selector could not be found")
  }

  const height: number = parseInt(window.getComputedStyle(elt).getPropertyValue("height"))

  return height
}

/**
 * Adds the specified class to the given element if it does not already have it.
 *
 * @param {Element} element - The DOM element to which the class will be added.
 * @param {string} cls - The class name to add to the element.
 *
 * @example
 * // Assuming an element with the class 'button' exists:
 * const btn = document.querySelector('.button');
 * addClass(btn, 'active');
 */
export function addClass(element: HTMLElement, cls: string): void {
  if (!hasClass(element, cls)) {
    element.className += " " + cls
  }
}

/**
 * Checks if the specified element has the given class.
 *
 * @param {Element} element - The DOM element to check.
 * @param {string} cls - The class name to check for on the element.
 * @returns {boolean} - Returns true if the element has the specified class, otherwise false.
 *
 * @example
 * // Assuming an element with class 'button' and 'active' exists:
 * const btn = document.querySelector('.button');
 * const isActive = hasClass(btn, 'active');
 * console.log(isActive);
 */
export function hasClass(element: HTMLElement, cls: string): boolean {
  return !!element.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"))
}

/**
 * Removes the specified class from the given element if it exists.
 *
 * @param {Element} element - The DOM element from which the class will be removed.
 * @param {string} cls - The class name to remove from the element.
 *
 * @example
 * // Assuming an element with classes 'button active' exists:
 * const btn = document.querySelector('.button');
 * removeClass(btn, 'active');
 */
export function removeClass(element: HTMLElement, cls: string): void {
  if (hasClass(element, cls)) {
    element.className = element.className.replace(new RegExp("(\\s|^)" + cls + "(\\s|$)"), "")
  }
}

/**
 * Generates a string of random characters of the specified length.
 *
 * @param {number} length - The number of characters in the output string.
 * @returns {string} A string consisting of random characters.
 *
 * The sequence of characters that can be selected: 1234567890ABCDEF!@#$%^&*_+[]{}<>?/~
 *
 * @example
 * const randomString = generateRandomChars(10);
 * console.log(randomString);
 */
export function generateRandomChars(length: number): string {
  const charSequence = "1234567890ABCDEF!@#$%^&*_+[]{}<>?/~"
  let result = ""
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charSequence.length)
    result += charSequence[randomIndex]
  }
  return result
}
