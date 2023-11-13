export const getLink = (type: string) => {
    if (type === "document") return "https://docs.google.com/document/d/"
    if (type === "spreadsheet") return "https://docs.google.com/spreadsheets/d/"
    if (type === "presentation") return "https://docs.google.com/presentation/d/"
    return "https://docs.google.com/document/d/";
}