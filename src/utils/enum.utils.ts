type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };

/**
 * Check if a string is a number, return true if a string is a valid number
 *
 * eg:
 * ```javascript
 * checkcheckStringIsNumber('0'); // true
 * checkcheckStringIsNumber('hello'); // false
 * ```
 * @param value
 */
const checkStringIsNumber = (value: string): boolean => isNaN(Number(value)) === false;

/**
 * Transform a enum type to a array, this is utils for use the enum in js libraries
 * @param enumme
 * @todo add typed for return value
 */
export const enumToArray = <E extends Enum<E>>(enumme: E): string[] => {
  return Object.keys(enumme)
    .filter(checkStringIsNumber)
    .map((key) => enumme[key]);
};