/**
 * Set the state in a query param format based on the numeric value that is limited by a maximum
 * @param value Number received as string input
 * @param maximum Maximum allowed numeric value
 * @param setter Handler used to set the value to the state
 * @param prefix Name of the query param to which the value is associated in the state
 */
export const handleNumericChange = (value: string, maximum: number, setter: (val: string) => void, prefix: string) => {
    if (value === "") {
        setter("")
    }
    else if (!isNaN(Number(value))) {
        if (parseInt(value) <= maximum) setter(`&${prefix}=${value}`)
    }
}