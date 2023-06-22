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
    setUser: (user,)=>{console.log(user);},
    toggleModal: ()=>{console.log("");},
    isOpenNav: false,
    setTanks: (devices)=>{console.log(devices);},
    selectedDevice: undefined,
    setSelectedDevice(device) {console.log(device)},
});
//return an array of device data including level, temperature, quality, etc.
//extract the first row and add it as current waterTemp, waterQuality, liters, etc.
//add the rest of the rows as consumption data

const devices2: Device[] =[
    {
        actuators:[
            {
                created: new Date(),
                id: '',
                meta:{},
                modified: new Date(),
                name: 'Pump',
                value: false,
                time: null,
            }
        ],
        capacity: 500,
        created: new Date(),
        height: 300,
        id:'hgnhgnfgsdfgv',
        length:0,
        meta:{},
        modified: new Date(),
        name: 'NGO Tank',
        notification:[{
            id:'gffgfg',
            message:'Power Low',
            meta:{},
            date: new Date(),
        }],
        radius:0,
        sensors:[{
                created: new Date(),
                id: '',
                kind: 'Temperature',
                meta:{},
                modified: new Date(),
                name: 'Temperature sensor',
                quantity: 0,
                time: null,
                unit: '',
                value:10.5,
            },
            {
                created: new Date(),
                id: '',
                kind: 'Water Level',
                meta:{},
                modified: new Date(),
                name: 'Water Level sensor',
                quantity: 0,
                time: null,
                unit: '',
                value:10.5,
            }
        ],
        width:0,
    },
]
// const DEVICES: Device[]=[
//     {
//         name: 'NGO Tank',
//         waterTemp: 75,
//         waterQuality: 'Good',
//         liters: 300,
//         on: true,
//         isSelect: true,
//         id: '623052023',
//         consumption: data,
//     },
//     {
//         name: 'Home Tank',
//         waterTemp: 50,
//         waterQuality: 'Good',
//         liters: 490,
//         on: false,
//         isSelect: false,
//         id: '53425152023',
//         consumption: data1,

//     },
//     {
//         name: 'Cattle Tank',
//         waterTemp: 44,
//         waterQuality: 'Good',
//         liters: 290,
//         on: true,
//         isSelect: false,
//         id: '094342023',
//         consumption: data2,

//     },
//     {
//         name: 'Restaurant Tank',
//         waterTemp: 24,
//         waterQuality: 'Turbidity',
//         liters: 500,
//         on: true,
//         isSelect: false,
//         id:"6465t232324",
//         consumption: data,
//     },
// ]
// const fetchAllDevices = async ()=>{
//     const res = await axios.post('http://wazigate.local/auth/token',{
//         username:"admin",
//         "password":"loragateway"
//     },{
//         headers: {
//             Accept:'text/plain; charset=utf-8',
//             "Content-Type":'application/json;charset=utf-8'
//         }
//     });
//     console.log(res.data);
// }

export const  DevicesProvider = ({children}: Props)=>{
    // const [devices,setDevices] = useState<Device[]>([]);
    const [devices,setDevices] = useState<X[]>([]);
    const [selectedTank, setSelectedTank] = useState<X>()
    const [user,setLoggedUser]=useState<{name: string,token:string}>({name:'',token:''});
    const [isOpenNav, setIsOpenNav] = useState<boolean>(false);
    const toggleModal = ()=> setIsOpenNav(!isOpenNav);
    const setTanks = (devices: X[])=> setDevices(devices);
    useEffect(()=>{
        // setDevices(DEVICES);
        setDevices(devices2.map((device)=>{ 
            return{
                ...device,
                consumption: device.sensors.map((sensor)=>{
                    return{
                        x: sensor.value,
                        y: sensor.modified.getHours(),

                    }
                }),
                isSelect: false,
                location: {
                    lat: 0,
                    lng: 0
                },
                on: true,
            }
        }));
    },[]);
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
