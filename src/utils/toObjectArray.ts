type RowObject = Record<string, string>;

export function toObjectArray(
    fields: string[],
    data: string[][],
): RowObject[] {
    return data.map(row => {
        const obj: RowObject = {};
        fields.forEach((key, index) =>{
            obj[key] = row[index];
        });
        return obj;
    });
}