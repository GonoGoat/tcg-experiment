export function getClassName(state: string, payload: string) {
    return (state === payload) ? payload : "inactive"
}

export function removeStringKeyFromObject(object: Record<string,any>, key: string) {
    return (
        (({[key]:bulk, ...keep}) => keep) (object)
    )
}