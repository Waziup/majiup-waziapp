import { ReactNode, createContext, useEffect, useState } from "react";
import axios from 'axios';
type Props={
    children: ReactNode
}
export type Device={
    name: string,
    waterTemp: number,
    waterQuality: string,
    liters: number,
    on: boolean,
    isSelect: boolean,
    id: string
}
type ContextValues={
    devices: Device[],
    user: string,
    setUser:(user: string)=>void,
    toggleModal: ()=>void,
    isOpenNav?: boolean,
    setTanks: (devices: Device[])=>void,
}
export const DevicesContext = createContext<ContextValues>({
    devices: [],
    user:'',
    setUser: (user)=>{console.log(user);},
    toggleModal: ()=>{console.log("");},
    isOpenNav: false,
    setTanks: (devices)=>{console.log(devices);},
});
const DEVICES: Device[]=[
    {
        name: 'NGO Tank',
        waterTemp: 75,
        waterQuality: 'Good',
        liters: 300,
        on: true,
        isSelect: true,
        id: '623052023'
    },
    {
        name: 'Home Tank',
        waterTemp: 50,
        waterQuality: 'Good',
        liters: 490,
        on: false,
        isSelect: false,
        id: '53425152023'
    },
    {
        name: 'Cattle Tank',
        waterTemp: 44,
        waterQuality: 'Good',
        liters: 290,
        on: true,
        isSelect: false,
        id: '094342023'
    },
    {
        name: 'Restaurant Tank',
        waterTemp: 24,
        waterQuality: 'Turbidity',
        liters: 500,
        on: true,
        isSelect: false,
        id:"6465t232324"
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
    const [devices,setDevices] = useState<Device[]>();
    const [user,setUser]=useState<string>('');
    const [isOpenNav, setIsOpenNav] = useState<boolean>(false);
    const toggleModal = ()=> setIsOpenNav(!isOpenNav);
    const setTanks = (devices: Device[])=> setDevices(devices);
    useEffect(()=>{
        setDevices(DEVICES);
        fetchAllDevices();
    },[])
    const value={
        devices: devices??[], 
        user, 
        setUser,
        isOpenNav,
        toggleModal,
        setTanks
    }
    return(
        <DevicesContext.Provider value={value}>
            {children}
        </DevicesContext.Provider>
    )
}
