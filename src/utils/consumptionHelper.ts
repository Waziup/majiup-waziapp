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
                    console.log('Date is :',obj[property][index].timestamp)
                    const date = new Date(obj[property][index].timestamp)
                    newObj.time = `${date.getHours()}hr:${date.getMinutes()}mins:${date.getSeconds()}s`;
                    newObj[property] = obj[property][index].value;
                    newObj.liters=((obj['waterLevel'][0].value)/tankHeight)*tankCapacity;
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
export function handleFetchTableComponents(deviceId: string){
    const getLevel = axios.get(`${import.meta.env.VITE_BACKEND_URL}/tanks/${deviceId}/waterlevel/value`)
    const getWaterQuality = axios.get(`${import.meta.env.VITE_BACKEND_URL}/tanks/${deviceId}/water-quality/value`)
    const getTemp = axios.get(`${import.meta.env.VITE_BACKEND_URL}/tanks/${deviceId}/water-temperature/value`)

    axios.all([getLevel,getWaterQuality,getTemp])
    .then(axios.spread(function (respLevel,respQuality,respTemp){
        console.log(respLevel.data,respQuality.data,respTemp.data)
        // const lastArr = selectedTableTank.consumption[selectedTableTank.consumption.length];
        // if (lastArr.level !==respLevel.data || lastArr.quality !== respQuality.data || lastArr.temp !== respTemp.data ){
        //     const date = new Date();
        //     setSelectedTableTank({
        //         consumption: [
        //             // ...selectedTableTank.consumption,
        //             {
        //                 time: `${date.getHours()}:${date.getMinutes()}`,
        //                 litres:  selectedTableTank1.liters,
        //                 level: isNaN(Math.round((devices[0].liters/devices[0].capacity)*100))?0:Math.round((devices[0].liters/devices[0].capacity)*100),
        //                 quality: selectedTableTank1.tds,
        //                 waterTemperature: selectedTableTank1.temp,
        //             }
        //         ]
        //     })
        // }
    }))
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