import { ReactNode, createContext, useEffect, useState } from "react";
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
}
type ContextValues={
    devices: Device[],
}
export const DevicesContext = createContext<ContextValues>({
    devices: []
});
const DEVICES: Device[]=[
    {
        name: 'NGO Tank',
        waterTemp: 75,
        waterQuality: 'Good',
        liters: 300,
        on: true,
        isSelect: true,
    },
    {
        name: 'Home Tank',
        waterTemp: 50,
        waterQuality: 'Good',
        liters: 490,
        on: false,
        isSelect: false,
    },
    {
        name: 'Cattle Tank',
        waterTemp: 44,
        waterQuality: 'Good',
        liters: 290,
        on: true,
        isSelect: false,
    },
]
export const  DevicesProvider = ({children}: Props)=>{
    const [devices,setDevices] = useState<Device[]>()
    useEffect(()=>{
        setDevices(DEVICES)
    },[])
    const value={devices: devices??[]}
    return(
        <DevicesContext.Provider value={value}>
            {children}
        </DevicesContext.Provider>
    )
}
