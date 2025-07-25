export function removeStringKeyFromObject(object: Record<string,any>, key: string) {
    return (
        (({[key]:bulk, ...keep}) => keep) (object)
    )
}