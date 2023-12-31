
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function getDateString(date: Date): string {
    const dateString = JSON.stringify(date);
    return dateString.substring(1, dateString.length - 2);
}

export function getFormattedDate(dateTime: string): string {
    const dateString = dateTime.split("T")[0];
    const dateParts = dateString.split("-");

    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    return `${months[parseInt(month) - 1]} ${day}, ${year}`;
}