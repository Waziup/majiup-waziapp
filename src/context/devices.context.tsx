import axios from "axios";
import {ReactNode, createContext, useEffect, useState,} from "react";

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
    time: Date | null,
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
    notifications: Notification[],
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
    location?: {
        lat: number,
        lng: number
    },
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
    reportRef: HTMLDivElement | undefined,
    setReportRef: (ref: HTMLDivElement)=>void,
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
    reportRef: undefined,
    setReportRef: (ref) =>{console.log(ref);},
});

//return an array of device data including level, temperature, quality, etc.
//extract the first row and add it as current waterTemp, waterQuality, liters, etc.
//add the rest of the rows as consumption data

async function fetchConsumption(deviceID: string): Promise<Consumption[]>{
    const response = await axios.get(`http://localhost:8080/tanks/${deviceID}/tank-sensors/waterlevel/values`,{
        headers:{
            'Accept': 'application/json',
        }
    });
    return response.data.map((sensor: {value: number,time: string})=>{
        return{
            x: sensor.value,
            y: new Date(sensor.time).getHours(),
        }
    });
}

export const  DevicesProvider = ({children}: Props)=>{
    const [devices,setDevices] = useState<X[]>([]);
    const [selectedTank, setSelectedTank] = useState<X>()
    const [user,setLoggedUser]=useState<{name: string,token:string}>({name:'',token:''});
    const [isOpenNav, setIsOpenNav] = useState<boolean>(false);
    const toggleModal = ()=> setIsOpenNav(!isOpenNav);
    const setTanks = (devices: X[])=> setDevices(devices);
    const [reportRef,setReportRefFunch] = useState<HTMLDivElement>();
    // const [devicesID, setDevicesID] = useState<{deviceID:string,sensorID:string}[]>([]);
    const setReportRef = (ref: HTMLDivElement)=>{setReportRefFunch(ref)};
    useEffect(()=>{
        axios.get('http://localhost:8080/tanks',{
            headers:{
                'Accept': 'application/json',
            }
        })
        .then((res)=>{
            setDevices(res.data.map(async (device: X)=>{
                return{
                    ...device,
                    // consumption: device.sensors.filter((sensor: Sensor)=>sensor.name.toLowerCase().includes('Water Level Sensor'.toLowerCase()))
                    // .map((sensor: Sensor)=>{
                    //     setDevicesID((prevDevices)=>[...prevDevices, {deviceID: device.id, sensorID: sensor.id}]);
                    //     return{
                    //         x: sensor.value ?? 10,
                    //         y: new Date(sensor.modified).getHours(),
                    //     }
                    // }),
                    consumption: await fetchConsumption(device.id),
                    liters: device.sensors.find((sensor:Sensor)=>sensor.name.toLowerCase().includes('Water Level Sensor'.toLowerCase()))?.value ?? 0,
                    tds: device.sensors.find((sensor:Sensor)=>sensor.name.includes('TDS'.toLowerCase()))?.value ?? 0,
                    temp: device.sensors.find((sensor:Sensor)=>sensor.name.toLowerCase().includes('Temperature Sensor'.toLowerCase()))?.value ?? 0,
                    isSelect: false,
                    location: {
                        lat: 0,
                        lng: 0
                    },
                    on: true,
                }
            }));
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);
    useEffect(()=>{
        if ((devices !==undefined) && selectedTank === undefined) {
            setSelectedTank(devices[0])
        }
    },[devices, selectedTank]);
    // function fetchDataAtInterval(){
    //     console.log('fetching data', devicesID);
    // }
    // fetchDataAtInterval()
    // setInterval(fetchDataAtInterval, 10000);
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
    }
    return(
        <DevicesContext.Provider value={value}>
            {children}
        </DevicesContext.Provider>
    )
}
