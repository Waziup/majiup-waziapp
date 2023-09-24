import axios from "axios";
import {ReactNode, createContext, useEffect, useState,} from "react";
import mqtt from "precompiled-mqtt";
const brokerUrl = `mqtt://localhost`; //localhost:8081
type Props={
    children: ReactNode
}

type Consumption = {
    x: number,
    y: number,
}

export type Sensor={
    created: Date,
    id: string,
    kind: string,
    meta: {
        kind: string
    },
    modified: Date,
    name: string,
    quantity: number,
    time: string ,
    unit: string,
    value: 1 | 0,
}
export type Actuator={
    created: Date,
    id: string,
    meta: unknown,
    modified: Date,
    name: string,
    time: Date | null,
    value: number,
}
export type Notification={
    id: string,
    message: string,
    read_status: boolean
    timestamp: string
}
export type MetaInformation={
    receivenotifications: boolean,
    notifications: {
        messages: Notification[]
    },
    location: {
        longitude: number,
        latitude: number
    },
    settings: {
        height: number,
        capacity: number,
    }
}
interface Device{
    actuators: Actuator[],
    capacity: number,
    created: Date,
    height: number,
    id: string,
    length: number,
    meta: MetaInformation,
    modified: string,
    name: string,
    notifications:{ messages: Notification[]},
    radius: number,
    sensors: Sensor[],
    width: number,
}
export interface X extends Device {
    consumption: Consumption[],
    isSelect: boolean,
    liters: number
    temp: number,
    tds: string,
    on: boolean,
}

interface ContextValues{
    devices: X[],
    user: {token:string,name:string},
    setUser:(user: string,token: string)=>void,
    toggleModal: ()=>void,
    isOpenNav?: boolean,
    setTanks: (devices: X[])=>void,
    selectedDevice: X | undefined,
    setSelectedDevice: (device: X)=>void,
    reportRef: HTMLDivElement | null,
    setReportRef: (ref: HTMLDivElement)=>void,
    loading: boolean,
    setLoadingFunc: (loading: boolean)=>void,
    // fetchinHours: ()=>void,
    searchDevices: (name: string)=>void,
    fetchInMinutes: ()=>void,
}
export const DevicesContext = createContext<ContextValues>({
    devices: [],
    user:{token:'',name:''},
    setUser: (user,token)=>{console.log(user,token);},
    toggleModal: ()=>{console.log("");},
    isOpenNav: false,
    setTanks: (devices)=>{console.log(devices);},
    selectedDevice: undefined,
    setSelectedDevice(device) {console.log(device)},
    reportRef: null,
    setReportRef: (ref: HTMLDivElement) =>{console.log(ref);},
    loading: false,
    setLoadingFunc: (loading)=>{console.log(loading);},
    // fetchinHours: ()=>{console.log('');},
    fetchInMinutes: ()=>{console.log('');},
    searchDevices: (name)=>{console.log(name);},
});

//return an array of device data including level, temperature, quality, etc.
//extract the first row and add it as current waterTemp, waterQuality, liters, etc.
//add the rest of the rows as consumption data
function isActiveDevice(modifiedTime: string): boolean{
    const now = new Date();
    const modified = new Date(modifiedTime);
    const diff = now.getTime() - modified.getTime();
    const diffInMinutes = Math.floor(diff / 1000 / 60);
    return diffInMinutes < 5;
}

function subscriberFn(client: mqtt.MqttClient, topic: string, ){
    client.subscribe(topic, (err)=>{
        if (err){
            console.log(err);
        }
        else if (!err){
            console.log("Subscribed to ", topic);
        }
    })
}

export const client = mqtt.connect(brokerUrl);
export const  DevicesProvider = ({children}: Props)=>{
    const [devices,setDevices] = useState<X[]>([]);
    const [filteredDevices,setFilteredDevices] = useState<X[]>(devices);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedTank, setSelectedTank] = useState<X>()
    const [user,setLoggedUser]=useState<{name: string,token:string}>({name:'',token:''});
    const [isOpenNav, setIsOpenNav] = useState<boolean>(false);
    const toggleModal = ()=> setIsOpenNav(!isOpenNav);
    const setTanks = (devices: X[])=> setDevices(devices);
    const [reportRef,setReportRefFunch] = useState<HTMLDivElement | null>(null);
    const setReportRef = (ref: HTMLDivElement)=>{
        if (ref !==null) {
            setReportRefFunch(ref)
        }
    };
    const setLoadingFunc = (loading: boolean)=>{setLoading(!loading)};  
    
    function fetchInMinutes(){

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/tanks`,{
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(async (response)=>{
            const devicePromises = response.data.map(async (device:Device) => {
                const sensorResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tanks/${device.id}/tank-sensors/waterlevel/values`, {
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                                   
                const plotVals = sensorResponse.data?.waterLevels.map((val: { timestamp: any; liters: any; })=>{
                    const date = new Date(val.timestamp)
                    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

                    const dayOfWeek = daysOfWeek[date.getUTCDay()];

                    const hours = String(date.getUTCHours()).padStart(2, '0');

                    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
                    return {
                        x: (`${dayOfWeek}, ${hours}:${minutes}`),
                        y: val.liters
                    }
                })

                return plotVals
                
            });
            const consumption = await Promise.all(devicePromises);

            console.log('Devices all promises is: ',consumption)
            return {
                consumption: consumption as Consumption[],
                res: response.data,
            };
        })
        .then(({res,consumption})=>{
            setDevices(res.map(function(device: X, index:number){
                subscriberFn(client,`devices/${device.id}/meta/#`);
                subscriberFn(client,`devices/${device.id}/sensors/#`);
                subscriberFn(client,`devices/${device.id}/actuators/#`);  
                
               
                return{
                    ...device,
                    capacity: device.meta.settings.capacity,
                    height: Math.round(device.meta.settings.height),
                    consumption: consumption[index],
                    liters: device.sensors.find((sensor: Sensor)=>sensor.meta.kind.toLowerCase().includes('waterlevel'))?.value,
                    tds: device.sensors.find((sensor: Sensor)=>sensor.meta.kind.toLowerCase().includes('waterpollutantsensor'))?.value,
                    temp: device.sensors.find((sensor: Sensor)=>sensor.meta.kind.toLowerCase().includes('waterthermometer'))?.value,
                    isSelect: false,
                    on: isActiveDevice(device.modified),
                    notifications: device.meta.notifications.messages,
                }
            }));
            setLoading(false);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    // function fetchinHours(){
    //     axios.get(`${import.meta.env.VITE_BACKEND_URL}/tanks`,{
    //         headers:{
    //             'Accept': 'application/json',
    //             'Content-Type':'application/json'
    //         }
    //     })
    //     .then(async (response)=>{
    //         const devicePromises = response.data.map(async (device:Device) => {
    //             const sensorResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tanks/${device.id}/tank-sensors/waterlevel/values`, {
    //                 headers: {
    //                     'Accept': 'application/json',
    //                 }
    //             });
    //             return sensorResponse.data.map((sensor:Sensor) => {
    //                 const date = new Date(sensor.time);
    //                 return {
    //                     y: sensor.value,
    //                     x: date.getHours(),
    //                 };
    //             });
    //         });
    //         const consumption = await Promise.all(devicePromises);

    //         return {
    //             consumption: consumption[0] as Consumption[],
    //             res: response.data,
    //         };
    //     })
    //     .then(({res,consumption})=>{
    //         setDevices(res.map(function(device: X){

    //             return{
    //                 ...device,
    //                 capacity: device.meta.settings.capacity,
    //                 height: device.meta.settings.height,
    //                 consumption: consumption,
    //                 liters: device.sensors.find((sensor: Sensor)=>sensor.meta.kind.toLowerCase().includes('waterlevel'))?.value,
    //                 tds: device.sensors.find((sensor: Sensor)=>sensor.meta.kind.toLowerCase().includes('waterpollutantsensor'))?.value,
    //                 temp: device.sensors.find((sensor: Sensor)=>sensor.meta.kind.toLowerCase().includes('waterthermometer'))?.value,
    //                 isSelect: false,
    //                 notification: device.meta.notifications,
    //                 on: isActiveDevice(device.modified),
    //             }
                
    //         }));
    //         setLoading(false);
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })
    // }
    client.on('connect', ()=>{
        console.log("Connected to devices");
    });
    useEffect(()=>{
        setLoading(true)
        fetchInMinutes();
        setFilteredDevices(devices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    function searchDevices(name: string){
        if(name.length ===0){
            setFilteredDevices(devices);
            return;
        }
        const filtered =devices.filter((device: X)=>device.name.toLowerCase().includes(name.toLowerCase()));
        setFilteredDevices(filtered)
    }
    useEffect(()=>{
        if ((devices !==undefined) && selectedTank === undefined) {
            setSelectedTank(devices[0])
            setLoading(false);
        }
    },[devices, selectedTank]);
    const setSelectedDevice = (device: X)=> setSelectedTank(device);
    const setUser = (userName: string,token:string)=>setLoggedUser({name:userName,token})
    const value={
        devices: filteredDevices.length===0?devices:filteredDevices,
        user, 
        setUser,
        isOpenNav,
        toggleModal,
        setTanks,
        selectedDevice: selectedTank,
        setSelectedDevice,
        reportRef,
        setReportRef,
        loading,
        setLoadingFunc,
        // fetchinHours,
        fetchInMinutes,
        searchDevices,
    }
    return(
        <DevicesContext.Provider value={value}>
            {children}
        </DevicesContext.Provider>
    )
}
