import axios from 'axios';
import { X } from '../context/devices.context';
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
export async function getConsumption(deviceId: string, tankHeight: number, tankCapacity: number) {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tanks/${deviceId}/tank-info`, {
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
                    newObj.liters=((obj['waterLevel'][obj['waterLevel'].length-1].value)/tankHeight)*tankCapacity;
                } else {
                    newObj[property] = obj[property][obj[property].length-1].value;
                    // newObj[property] = previousValue;
                }
            }
        }
        return newObj;
    });
    return newArray;
    //find the element with the longest length
    //set the overall length of the other elements to the longest length
    //add the data to the table
}
export const getLiters = (waterLevel: number, tankHeight: number, tankCapacity: number) => {
    return Math.round(((tankHeight-waterLevel) / tankHeight) * tankCapacity);
}
export const postNewNotificationMessage = async (deviceId: string,devices: X[], message: string) => {
    const tank = devices.find((device: X) => device.id === deviceId);
    if (tank) {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tanks/${deviceId}/meta`, {
            ...tank.meta,
            notifications: {
                ...tank.meta.notifications,
                messages: [
                    ...tank.meta.notifications.messages,
                    {
                        id: tank.meta.notifications.messages.length + 1,
                        message,
                        timestamp: new Date().toLocaleTimeString(),
                        read_status: false
                    }
                ]
            }
        });
        return response;
    }
}
export const markMessageAsRead = async (deviceId: string,devices: X[], messageId: string) => {
    const tank = devices.find((device: X) => device.id === deviceId);
    if (tank) {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tanks/${deviceId}/meta`, {
            ...tank.meta,
            notifications: {
                ...tank.meta.notifications,
                messages: tank.meta.notifications.messages.map((message) => {
                    if (message.id === messageId) {
                        return {
                            ...message,
                            read_status: true
                        }
                    }
                    return message;
                })
            }
        });
        return response;
    }
}