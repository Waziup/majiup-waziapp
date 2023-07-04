/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useLocation,useNavigate } from "react-router-dom";
import TankDetailComponent from "../components/TankDetail/TankDetail.component";
import {NavigateBefore} from '@mui/icons-material';
import { Box } from "@mui/material";
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
    
    const data = useLocation();
    const navigate = useNavigate();
    console.log(data.state);
    const tdsValue= data.state.tds;
    
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
                />
        </Box>
    );
}

export default DevicesPage;