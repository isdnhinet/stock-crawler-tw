export function getAssetPath(assetName: string) {
    return `${import.meta.env.BASE_URL}${assetName}`;
}