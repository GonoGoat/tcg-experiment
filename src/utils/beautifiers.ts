/**
 * Returns a string with first letter in UpperCase, and the rest in LowerCase
 * @param s Input string
 * @returns Modified string
 */
export function capitalizeFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}