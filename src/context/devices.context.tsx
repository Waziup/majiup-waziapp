import { ReactNode, createContext, useEffect, useState } from "react";
import axios from 'axios';
type Props={
    children: ReactNode
}
type Device={
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
}
export const DevicesContext = createContext<ContextValues>({
    devices: [],
    user:'',
    setUser: (user)=>{console.log(user);},
    toggleModal: ()=>{console.log("");},
    isOpenNav: false
});
const DEVICES: Device[]=[
    {
        name: 'NGO Tank',
        waterTemp: 75,
        waterQuality: 'Good',
        liters: 300,
        on: true,
        isSelect: true,
        id: 'Gateway: Majiup23052023'
    },
    {
        name: 'Home Tank',
        waterTemp: 50,
        waterQuality: 'Good',
        liters: 490,
        on: false,
        isSelect: false,
        id: 'Gateway: Majiup25152023'
    },
    {
        name: 'Cattle Tank',
        waterTemp: 44,
        waterQuality: 'Good',
        liters: 290,
        on: true,
        isSelect: false,
        id: 'Gateway: Majiup28052023'

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
    useEffect(()=>{
        setDevices(DEVICES);
        fetchAllDevices();
    },[])
    const value={
        devices: devices??[], 
        user, 
        setUser,
        isOpenNav,
        toggleModal
    }
    return(
        <DevicesContext.Provider value={value}>
            {children}
        </DevicesContext.Provider>
    )
}
