export const getImageUrl = (name: string): string => {
    return new URL(`../assets/images/${name}`, import.meta.url).href
}
export const getIconUrl = (name: string): string => {
    return new URL(`../assets/icons/${name}`, import.meta.url).href
}