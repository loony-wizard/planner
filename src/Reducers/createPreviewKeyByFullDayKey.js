export default function (fullDayKey) {
    // full day key is like dayFullDD_MM_YYYY
    // I need to get DD_MM_YYYY
    // and put it tp dayPreviewDD_MM_YYYY
    return `dayPreview${fullDayKey.substring(7)}`;
}