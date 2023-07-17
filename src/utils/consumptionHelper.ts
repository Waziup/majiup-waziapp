import axios from 'axios';
export type Consumption = {
    time: string,
    litres: number
    waterLevel: number
    waterQuality: string
    waterTemperature: number
}
type ObjProps={
    time: string, 
    liters: number, 
    [key: string]: number | string
}
export async function getConsumption(deviceId: string) {
    const response = await axios.get(`http://localhost:8080/tanks/${deviceId}/tank-info`, {
        headers:{
            'Accept': 'application/json',
        }
    });
    const obj = response.data;
    let maxLength = 0;
    for (const property in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(property) && Array.isArray(obj[property])) {
            const length = obj[property].length;
            if (length > maxLength) {
                maxLength = length;
            }
        }
    }
    // Create a new array with objects containing elements
    const newArray = Array.from({ length: maxLength }, (_, index) => {
        const newObj: ObjProps = {
            time: '',
            liters: 0
        };
        for (const property in obj) {
            // eslint-disable-next-line no-prototype-builtins
            if (obj.hasOwnProperty(property) && Array.isArray(obj[property])) {
                if (index < obj[property].length) {
                    const date = new Date(obj[property][index].timestamp)
                    newObj.time = `${date.getHours()}hr:${date.getMinutes()}mins:${date.getSeconds()}s`;
                    newObj[property] = obj[property][index].value;
                    newObj.liters=((obj['waterLevel'][0].value)/200)*2000;
                    // console.log(property,previousValue)
                } else {
                    newObj[property] = obj[property][0].value;
                    // newObj[property] = previousValue;
                }
            }
        }
        return newObj;
    });
    console.log(newArray);
    return newArray;
    //find the element with the longest length
    //set the overall length of the other elements to the longest length
    //add the data to the table
}
export const getLiters = (waterLevel: number, tankHeight: number, tankCapacity: number) => {
    return (waterLevel / tankHeight) * tankCapacity;
}