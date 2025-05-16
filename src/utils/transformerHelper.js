export function convertToBooleans(row, fields){
    let newRow = {...row};
    fields.forEach(field => {
        if(field in newRow){
            newRow[field] = Boolean(newRow[field]);
        }
    });
    return newRow;
}