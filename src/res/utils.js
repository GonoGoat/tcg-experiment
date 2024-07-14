export function getClassName(state, payload) {
    return (state === payload)?payload:"inactive"
}