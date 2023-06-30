import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";
// import axios from 'axios';
type Props={
    children: ReactNode
}
type Consumption = {
    x: number,
    y: number,
}
// const data: Consumption[] = [
//     {
//         x: 0,//time
//         y: 20, //liters
//     },
//     {
//         x : 1,
//         y : 21,
//     },
//     {
//         x: 2,
//         y: 23,
//     },
//     {
//         x: 3,
//         y: 24,
//     },
//     {
//         x: 4,
//         y: 23,
//     },
//     {
//         x: 5,
//         y: 22,
//     },
//     {
//         x: 6,
//         y: 22,
//     },
//     {
//         x: 7,
//         y: 18,
//     },
//     {
//         x: 8,
//         y: 19   ,
//     },{
//         x: 9,
//         y: 20,
//     },
//     {
//         x: 10,
//         y: 21,
//     },
//     {
//         x: 11,
//         y: 19,
//     },
//     {
//         x: 12,
//         y: 20,
//     },
// ];
// const data1: Consumption[] = [
//     {
//         x: 0,
//         y: 21,
//     },
//     {
//         x : 1,
//         y : 22,
//     },
//     {
//         x: 2,
//         y: 24,
//     },
//     {
//         x: 3,
//         y: 25,
//     },
//     {
//         x: 4,
//         y: 23,
//     },
//     {
//         x: 5,
//         y: 21,
//     },
//     {
//         x: 6,
//         y: 22,
//     },
//     {
//         x: 7,
//         y: 19,
//     },
//     {
//         x: 8,
//         y: 20,
//     },{
//         x: 9,
//         y: 22,
//     },
//     {
//         x: 10,
//         y: 23,
//     },
//     {
//         x: 11,
//         y: 22,
//     },
//     {
//         x: 12,
//         y: 20,
//     },
// ];
// const data2: Consumption[] = [
//     {
//         x: 0,
//         y: 22,
//     },
//     {
//         x : 1,
//         y : 23,
//     },
//     {
//         x: 2,
//         y: 25,
//     },
//     {
//         x: 3,
//         y: 22,
//     },
//     {
//         x: 4,
//         y: 20,
//     },
//     {
//         x: 5,
//         y: 23,
//     },
//     {
//         x: 6,
//         y: 22,
//     },
//     {
//         x: 7,
//         y: 19,
//     },
//     {
//         x: 8,
//         y: 23,
//     },{
//         x: 9,
//         y: 24,
//     },
//     {
//         x: 10,
//         y: 22,
//     },
//     {
//         x: 11,
//         y: 21,
//     },
//     {
//         x: 12,
//         y: 23,
//     },
// ];
type Sensor={
    created: Date,
    id: string,
    kind: string,
    meta: unknown,
    modified: Date,
    name: string,
    quantity: number,
    time: Date | null,
    unit: string,
    value: number,
}
type Actuator={
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
    meta: unknown,
    date: Date,
}
interface Device{
    actuators: Actuator[],
    capacity: number,
    created: Date,
    height: number,
    id: string,
    length: number,
    meta: unknown,
    modified: Date,
    name: string,
    notification: Notification[],
    radius: number,
    sensors: Sensor[],
    width: number,
}
export interface X extends Device {
    consumption: Consumption[],
    isSelect: boolean,
    location?: {
        lat: number,
        lng: number
    },
    on: boolean,
}
// export type Device={
//     name: string,
//     waterTemp: number,
//     waterQuality: string,
//     liters: number,
//     on: boolean,
//     isSelect: boolean,
//     id: string,
//     location?: {
//         lat: number,
//         lng: number
//     },
//     consumption: Consumption[]
// }
type ContextValues={
    devices: X[],
    user: {token:string,name:string},
    setUser:(user: string,token: string)=>void,
    toggleModal: ()=>void,
    isOpenNav?: boolean,
    setTanks: (devices: X[])=>void,
    selectedDevice: X | undefined,
    setSelectedDevice: (device: X)=>void
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
});
//return an array of device data including level, temperature, quality, etc.
//extract the first row and add it as current waterTemp, waterQuality, liters, etc.
//add the rest of the rows as consumption data

const fetchToken = async ()=>{
    const res = await axios.post('http://192.168.1.102:80/auth/token',{
        username:"admin",
        "password":"loragateway"
    },{
        headers: {
            Accept:'text/plain;charset=utf-8',
            "Content-Type":'application/json;charset=utf-8'
        }
    });
    console.log(res.data);
    return res.data;
}

export const  DevicesProvider = ({children}: Props)=>{
    // const [devices,setDevices] = useState<Device[]>([]);
    const [devices,setDevices] = useState<X[]>([]);
    const [selectedTank, setSelectedTank] = useState<X>()
    const [user,setLoggedUser]=useState<{name: string,token:string}>({name:'',token:''});
    const [isOpenNav, setIsOpenNav] = useState<boolean>(false);
    const toggleModal = ()=> setIsOpenNav(!isOpenNav);
    const setTanks = (devices: X[])=> setDevices(devices);
    useEffect(()=>{
        fetchToken()
        .then((token)=>{
            console.log(token);
            axios.get('http://192.168.1.102:80/devices',{
                headers:{
                    'Accept': 'application/json',
                    Authorization:'Bearer '+token
                }
            }).then((devices)=>{
                console.log(devices);
            })
        }).catch((err)=>{
            console.log(err);
        })
    },[])
    // useEffect(()=>{
    //     // setDevices(DEVICES);
    //     axios.get('http://localhost/devices',{
    //         headers:{
    //             'Accept': 'application/json',
    //         }
    //     })
    //     .then((res)=>{
    //         console.log(res.data);
    //         setDevices(res.data.map((device: X)=>{
    //             return{
    //                 ...device,
    //                 consumption: device.sensors.map((sensor: Sensor)=>{
    //                     if (sensor.name.includes('Water Level Sensor'.toLowerCase())) {
    //                         return{
    //                             x: sensor.value ?? 10,
    //                             y: sensor.modified.getHours(),
    //                         }
    //                     }
    //                 }),
    //                 isSelect: false,
    //                 location: {
    //                     lat: 0,
    //                     lng: 0
    //                 },
    //                 on: true,
    //             }
    //         }));
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })
    //     // setDevices(devices2.map((device)=>{ 
    //     //     return{
    //     //         ...device,
    //     //         consumption: device.sensors.map((sensor)=>{
    //     //             return{
    //     //                 x: sensor.value,
    //     //                 y: sensor.modified.getHours(),

    //     //             }
    //     //         }),
    //     //         isSelect: false,
    //     //         location: {
    //     //             lat: 0,
    //     //             lng: 0
    //     //         },
    //     //         on: true,
    //     //     }
    //     // }));
    // },[]);
    useEffect(()=>{
        if ((devices !==undefined) && selectedTank === undefined) {
            setSelectedTank(devices[0])
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
        setSelectedDevice
    }
    // setInterval(()=>{
    //    fetchRetoken()
    // },1000*60*10)
    // function fetchRetoken(){
    //     axios.post('https//wazigate.local/auth/retoken',{
    //         token:'',
    //     },{
    //         headers:{
    //             Authorization:''
    //         }
    //     }).then((res)=>{
    //         console.log(res);
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //     })
    // }
    return(
        <DevicesContext.Provider value={value}>
            {children}
        </DevicesContext.Provider>
    )
}
