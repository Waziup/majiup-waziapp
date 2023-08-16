import { useLocation,useNavigate } from "react-router-dom";
import TankDetailComponent from "../components/TankDetail/TankDetail.component";
import {NavigateBefore} from '@mui/icons-material';
import { Box } from "@mui/material";
import { DevicesContext } from "../context/devices.context";
import { useContext } from "react";
import { X as Device } from "../context/devices.context";
import axios from "axios";
function getWaterQuality(tds: number){
    if (tds>0 && tds<300) {
        return 'Excellent'
    }else if(tds>300 &&tds<900){
        return'Good'
    }else if(tds>900){
        return 'Poor'
    }else{
        return('Not satisfied');
    }
}
function DevicesPage() {
    const {devices} = useContext(DevicesContext);
    const data = useLocation();
    const navigate = useNavigate();
    const tdsValue= data.state.tds;
    async function toogleActuatorHandler(id:string) {
        let currentValue: number;
        const tank = devices.find((item: Device) => item.id === id);
        if(tank){
            currentValue = tank.actuators[0].value === 1? 0 : 1;
            console.log(tank.actuators[0].value,id,tank.actuators[0].value === 1, currentValue)
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tanks/${id}/pumps/state`,{
                "value": currentValue,
            },{
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            .then((response)=>{
                console.log(response.data);
                return response.data;
            })
            .catch((error)=>{
                console.log(error);
                return true;
            });
        }
        return false;
    }
    return (
        <Box pl={2} pr={2}>
           <NavigateBefore sx={{cursor:'pointer', border: '1px solid #000',borderRadius:'50%'}} onClick={()=>navigate(-1)} /> 
                <TankDetailComponent
                    liters={data.state.liters}
                    on={data.state.on}
                    owner={data.state.name}
                    waterQuality={getWaterQuality(tdsValue)}
                    waterTemp={data.state.temp}
                    actuator={data.state.actuators}
                    consumption={data.state.consumption}
                    height={data.state.height}
                    capacity={data.state.capacity}
                    id={data.state.id}
                    maxalert={data.state.meta.settings.maxalert}
                    minalert={data.state.meta.settings.minalert}
                    toggleActuator={toogleActuatorHandler}
                    receiveNotifications={data.state.meta.receiveNotifications?? false}
                />
        </Box>
    );
}

export default DevicesPage;