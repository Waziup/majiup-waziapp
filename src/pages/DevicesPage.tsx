/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useParams, useLocation,useNavigate } from "react-router-dom";
import TankDetailComponent from "../components/TankDetail/TankDetail.component";
import {NavigateBefore} from '@mui/icons-material';
import { Box } from "@mui/material";
function DevicesPage() {
    const params = useParams();
    const data = useLocation();
    const navigate = useNavigate();
    const resp= data.state.tds.filter(td=>td)[0]
    let foundQuality = '';        
        if (resp<300) {
            foundQuality='Excellent'
        }else if(td>300 &&td<900){
            foundQuality='Good'
        }else if(td>900){
            foundQuality='Poor'
        }else{
            foundQuality=('not satisfied');
        }
    
    return (
        <Box pl={2} pr={2}>
           <NavigateBefore sx={{cursor:'pointer', border: '1px solid #000',borderRadius:'50%'}} onClick={()=>navigate(-1)} /> 
            <TankDetailComponent
                liters={data.state.liters.filter(ltrs=>ltrs)[0]}
                on={data.state.on}
                owner={data.state.name}
                waterQuality={foundQuality}
                waterTemp={data.state.temp.filter(temp=>temp)[0]}
            />
        </Box>
    );
}

export default DevicesPage;