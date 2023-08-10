import axios from "axios";
import {ReactNode, createContext, useEffect, useState,} from "react";
import { getLiters } from "../utils/consumptionHelper";

type Props={
    children: ReactNode
}

type Consumption = {
    x: number,
    y: number,
}

type Sensor={
    created: Date,
    id: string,
    kind: string,
    meta: unknown,
    modified: Date,
    name: string,
    quantity: number,
    time: string ,
    unit: string,
    value: number,
}
export type Actuator={
    created: Date,
    id: string,
    meta: unknown,
    modified: Date,
    name: string,
    time: Date | null,
    value: boolean,
}
type Notification={
    id: string,
    message: string,
    read_status: boolean
}
type MetaInformation={
    receivenotifications: false,
    notifications: {
        id: string,
        message: string,
        read_status: boolean
    },
    location: {
        longitude: number,
        latitude: 0
    },
    settings: {
        length: number,
        width: number,
        height: number,
        radius: number,
        capacity: number,
        maxalert: number,
        minalert: number,
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
    notification: Notification,
    radius: number,
    sensors: Sensor[],
    width: number,
}
export interface X extends Device {
    consumption: Consumption[],
    isSelect: boolean,
    liters: number
    temp: number,
    tds: number,
    on: boolean,
}

type ContextValues={
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
    fetchinHours: ()=>void,
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
    fetchinHours: ()=>{console.log('');},
    fetchInMinutes: ()=>{console.log('');},
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
export const  DevicesProvider = ({children}: Props)=>{
    const [devices,setDevices] = useState<X[]>([]);
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
                return sensorResponse.data.map((sensor:Sensor) => {
                    const date = new Date(sensor.time);
                    return {
                        y: getLiters(sensor.value,device.meta.settings.height, device.meta.settings.capacity),
                        x: parseFloat((date.getHours() + (date.getMinutes()/60)).toFixed(2)),
                    };
                });
            });
            const consumption = await Promise.all(devicePromises);

            return {
                consumption: consumption[0] as Consumption[],
                res: response.data,
            };
        })
        .then(({res,consumption})=>{
            setDevices(res.map(function(device: X){
                return{
                    ...device,
                    capacity: device.meta.settings.capacity,
                    length: device.meta.settings.length,
                    width: device.meta.settings.width,
                    height: device.meta.settings.height,
                    consumption: consumption,
                    liters:  getLiters(device.sensors.find((sensor:Sensor)=>sensor.name.toLowerCase().includes('level'))?.value ?? 0,device.meta.settings.height, device.meta.settings.capacity),
                    tds: device.sensors.find((sensor:Sensor)=>sensor.name.toLowerCase().includes('quality'))?.value ?? 0,
                    temp: device.sensors.find((sensor:Sensor)=>sensor.name.toLowerCase().includes('temperature'.toLowerCase()))?.value ?? 0,
                    isSelect: false,
                    on: isActiveDevice(device.modified),
                }
            }));
            setLoading(false);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    function fetchinHours(){
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
                return sensorResponse.data.map((sensor:Sensor) => {
                    const date = new Date(sensor.time);
                    return {
                        y: getLiters(sensor.value,device.meta.settings.height, device.meta.settings.capacity),
                        x: date.getHours(),
                    };
                });
            });
            const consumption = await Promise.all(devicePromises);

            return {
                consumption: consumption[0] as Consumption[],
                res: response.data,
            };
        })
        .then(({res,consumption})=>{
            setDevices(res.map(function(device: X){
                return{
                    ...device,
                    capacity: device.meta.settings.capacity,
                    length: device.meta.settings.length,
                    width: device.meta.settings.width,
                    height: device.meta.settings.height,
                    consumption: consumption,
                    liters:  getLiters(device.sensors.find((sensor:Sensor)=>sensor.name.toLowerCase().includes('level'))?.value ?? 0,device.meta.settings.height, device.meta.settings.capacity),
                    tds: device.sensors.find((sensor:Sensor)=>sensor.name.toLowerCase().includes('quality'))?.value ?? 0,
                    temp: device.sensors.find((sensor:Sensor)=>sensor.name.toLowerCase().includes('temperature'.toLowerCase()))?.value ?? 0,
                    isSelect: false,
                    notification: device.meta.notifications,
                    on: true,
                }
            }));
            console.log('Devices: ',devices);
            setLoading(false);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        setLoading(true)
        fetchInMinutes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    useEffect(()=>{
        if ((devices !==undefined) && selectedTank === undefined) {
            setSelectedTank(devices[0])
            setLoading(false);
        }
    },[devices, selectedTank]);
    const setSelectedDevice = (device: X)=> setSelectedTank(device);
    const setUser = (userName: string,token:string)=>setLoggedUser({name:userName,token})
    const value={
        devices,
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
        fetchinHours,
        fetchInMinutes,
    }
    setInterval(()=>{
        fetchInMinutes();
    },1000*10);
    return(
        <DevicesContext.Provider value={value}>
            {children}
        </DevicesContext.Provider>
    )
}
