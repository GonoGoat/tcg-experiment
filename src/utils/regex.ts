export function getSingleRegexMatch(regex: string, value: string): string;
export function getSingleRegexMatch(regex: string, value: string, def:string): string;

/**
 * Give first Regex match in given string with supplied regex pattern
 * @param regex Regex to use
 * @param value Source to extract data from
 * @param def Default value to put in case no value is matched
 * @returns First substring in value that matches the Regex
 */
export function getSingleRegexMatch(regex: string, value: string, def?: string) {
    return (new RegExp(regex).exec(value) || [def || ""])[0];
}


/**
 * Generate a regexp that will match only if supplied string is part of the compared string.
 * @param value String that should be part of the final string
 * @returns Matching String RegExp 
 */
export function getStringAmongStringsRegExp (value: string) {
    return `(?=.*${value})`
}


/**
 * Generate a regexp that will match only if supplied string is not part of the compared string.
 * @param value String that should not be part of the final string
 * @returns Matching String RegExp 
 */
export function getStringNotAmongStringsRegExp (value: string) {
    return `(?!.*${value})`
}