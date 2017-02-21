export default function (previewKey) {
    // preview key is like dayPreviewDD_MM_YYYY
    // I need to get DD_MM_YYYY
    // and put it tp dayFullDD_MM_YYYY
    return `dayFull${previewKey.substring(10)}`;
}