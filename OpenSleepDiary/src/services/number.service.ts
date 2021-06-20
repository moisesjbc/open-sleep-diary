export function padNumber(number: number, maxChars: number): string {
    let numberStr = "" + number;

    while (numberStr.length < maxChars) {
        numberStr = "0" + numberStr;
    }

    return numberStr;
}