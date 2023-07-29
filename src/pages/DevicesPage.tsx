import { useLocation,useNavigate } from "react-router-dom";
import TankDetailComponent from "../components/TankDetail/TankDetail.component";
import {NavigateBefore} from '@mui/icons-material';
import { Box } from "@mui/material";
import { DevicesContext } from "../context/devices.context";
import { useContext } from "react";
import { X as Device } from "../context/devices.context";
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
    const {devices, setTanks} = useContext(DevicesContext);
    const data = useLocation();
    const navigate = useNavigate();
    console.log(data.state);
    const tdsValue= data.state.tds;
    function toogleActuatorHandler(id:string) {
        const newTanks = devices.map((item: Device) => {
            if(item.id === id){
                item.actuators[0].value = !item.actuators[0].value;
            }else{
                item.isSelect = false;
            }
            return item;
        })
        setTanks(newTanks);
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
                    toggleActuator={toogleActuatorHandler}
                />
        </Box>
    );
}

export default DevicesPage;