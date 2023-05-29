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
// accept: application/json
// Accept-Encoding: gzip, deflate
// Accept-Language: en-US,en;q=0.8
// Connection: keep-alive
// Cookie: Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJjbGllbnQiOiI2MDE3YzcyMTc4NDUyNDAwMDY4NDExYmUiLCJleHAiOjE2ODUyNjY4OTh9.ReLy1UwYjcOGcHh_rMPDi6qKUgC80EQCm7vGyYKIwrk
// Host: wazigate.local
// Referer: http://wazigate.local/docs/
// Sec-GPC: 1
const fetchAllDevices = async ()=>{
    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJjbGllbnQiOiI2MDE3YzcyMTc4NDUyNDAwMDY4NDExYmUiLCJleHAiOjE2ODUyNjgzNDB9.1vIplb8reiwTVJ2ef40nnjbo5F0IOTb-E7bzyT4K4xE";
    // axios.defaults.headers.common['Cookie'] = `Token=${token}`;
    const res = await axios.post('http://wazigate.local/devices',{
        headers: {
            'accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
            // 'Content-Type': 'text/plain',
            // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            'Cookie': `Token=${token}`,
            "Allow ": "GET, POST, HEAD, OPTIONS"
        }
    });
    console.log(res.data);
}
export const  DevicesProvider = ({children}: Props)=>{
    const [devices,setDevices] = useState<Device[]>()
    useEffect(()=>{
        setDevices(DEVICES);
        fetchAllDevices()

    },[])
    const value={devices: devices??[]}
    return(
        <DevicesContext.Provider value={value}>
            {children}
        </DevicesContext.Provider>
    )
}
