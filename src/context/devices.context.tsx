import { ReactNode, createContext, useEffect, useState } from "react";
import axios from 'axios';
type Props={
    children: ReactNode
}
type Consumption = {
    x: number,
    y: number,
}
const data: Consumption[] = [
    {
        x: 0,
        y: 20,
    },
    {
        x : 1,
        y : 21,
    },
    {
        x: 2,
        y: 23,
    },
    {
        x: 3,
        y: 24,
    },
    {
        x: 4,
        y: 23,
    },
    {
        x: 5,
        y: 22,
    },
    {
        x: 6,
        y: 22,
    },
    {
        x: 7,
        y: 18,
    },
    {
        x: 8,
        y: 19   ,
    },{
        x: 9,
        y: 20,
    },
    {
        x: 10,
        y: 21,
    },
    {
        x: 11,
        y: 19,
    },
    {
        x: 12,
        y: 20,
    },
];
const data1: Consumption[] = [
    {
        x: 0,
        y: 21,
    },
    {
        x : 1,
        y : 22,
    },
    {
        x: 2,
        y: 24,
    },
    {
        x: 3,
        y: 25,
    },
    {
        x: 4,
        y: 23,
    },
    {
        x: 5,
        y: 21,
    },
    {
        x: 6,
        y: 22,
    },
    {
        x: 7,
        y: 19,
    },
    {
        x: 8,
        y: 20,
    },{
        x: 9,
        y: 22,
    },
    {
        x: 10,
        y: 23,
    },
    {
        x: 11,
        y: 22,
    },
    {
        x: 12,
        y: 20,
    },
];
const data2: Consumption[] = [
    {
        x: 0,
        y: 22,
    },
    {
        x : 1,
        y : 23,
    },
    {
        x: 2,
        y: 25,
    },
    {
        x: 3,
        y: 22,
    },
    {
        x: 4,
        y: 20,
    },
    {
        x: 5,
        y: 23,
    },
    {
        x: 6,
        y: 22,
    },
    {
        x: 7,
        y: 19,
    },
    {
        x: 8,
        y: 23,
    },{
        x: 9,
        y: 24,
    },
    {
        x: 10,
        y: 22,
    },
    {
        x: 11,
        y: 21,
    },
    {
        x: 12,
        y: 23,
    },
];
export type Device={
    name: string,
    waterTemp: number,
    waterQuality: string,
    liters: number,
    on: boolean,
    isSelect: boolean,
    id: string,
    location?: {
        lat: number,
        lng: number
    },
    consumption: Consumption[]
}
type ContextValues={
    devices: Device[],
    user: string,
    setUser:(user: string)=>void,
    toggleModal: ()=>void,
    isOpenNav?: boolean,
    setTanks: (devices: Device[])=>void,
    selectedDevice: Device | undefined,
    setSelectedDevice: (device: Device)=>void
}
export const DevicesContext = createContext<ContextValues>({
    devices: [],
    user:'',
    setUser: (user)=>{console.log(user);},
    toggleModal: ()=>{console.log("");},
    isOpenNav: false,
    setTanks: (devices)=>{console.log(devices);},
    selectedDevice: undefined,
    setSelectedDevice(device) {console.log(device)},
});
const DEVICES: Device[]=[
    {
        name: 'NGO Tank',
        waterTemp: 75,
        waterQuality: 'Good',
        liters: 300,
        on: true,
        isSelect: true,
        id: '623052023',
        consumption: data,
    },
    {
        name: 'Home Tank',
        waterTemp: 50,
        waterQuality: 'Good',
        liters: 490,
        on: false,
        isSelect: false,
        id: '53425152023',
        consumption: data1,

    },
    {
        name: 'Cattle Tank',
        waterTemp: 44,
        waterQuality: 'Good',
        liters: 290,
        on: true,
        isSelect: false,
        id: '094342023',
        consumption: data2,

    },
    {
        name: 'Restaurant Tank',
        waterTemp: 24,
        waterQuality: 'Turbidity',
        liters: 500,
        on: true,
        isSelect: false,
        id:"6465t232324",
        consumption: data,
    },
]

const fetchAllDevices = async ()=>{
    const res = await axios.post('http://wazigate.local/auth/token',{
        username:"admin",
        "password":"loragateway"
    },{
        headers: {
            Accept:'text/plain; charset=utf-8',
            "Content-Type":'application/json;charset=utf-8'
        }
    });
    console.log(res.data);
}
export const  DevicesProvider = ({children}: Props)=>{
    const [devices,setDevices] = useState<Device[]>([]);
    const [selectedTank, setSelectedTank] = useState<Device>()
    const [user,setUser]=useState<string>('');
    const [isOpenNav, setIsOpenNav] = useState<boolean>(false);
    const toggleModal = ()=> setIsOpenNav(!isOpenNav);
    const setTanks = (devices: Device[])=> setDevices(devices);
    useEffect(()=>{
        setDevices(DEVICES);
        
        fetchAllDevices();
    },[]);
    useEffect(()=>{
        if ((devices !==undefined) && selectedTank === undefined) {
            setSelectedTank(devices[0])
        }
    },[devices, selectedTank]);
    const setSelectedDevice = (device: Device)=> setSelectedTank(device)
    const value={
        devices, 
        user, 
        setUser,
        isOpenNav,
        toggleModal,
        setTanks,
        selectedDevice: selectedTank,
        setSelectedDevice
    }
    return(
        <DevicesContext.Provider value={value}>
            {children}
        </DevicesContext.Provider>
    )
}
