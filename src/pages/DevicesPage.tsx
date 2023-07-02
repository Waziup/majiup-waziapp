/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useLocation,useNavigate } from "react-router-dom";
import TankDetailComponent from "../components/TankDetail/TankDetail.component";
import {NavigateBefore} from '@mui/icons-material';
import { Box } from "@mui/material";
function DevicesPage() {
    
    const data = useLocation();
    const navigate = useNavigate();
    console.log(data.state);
    const resp= data.state.tds;
    let foundQuality = '';
    if (resp<300) {
        foundQuality='Excellent'
    }else if(resp>300 &&resp<900){
        foundQuality='Good'
    }else if(resp>900){
        foundQuality='Poor'
    }else{
        foundQuality=('not satisfied');
    }
    return (
        <Box pl={2} pr={2}>
           <NavigateBefore sx={{cursor:'pointer', border: '1px solid #000',borderRadius:'50%'}} onClick={()=>navigate(-1)} /> 
           {
                !resp ? (
                    <Box sx={{position: 'relative'}}>
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '5%',
                            // transform: 'translate(-50, -50%)',
                            marginTop: '10px'
                        }}>
                            <h3 style={{fontSize: '15px', textAlign: 'center', margin:'10px 0'}}>
                                {data.state.name}
                            </h3>
                            {/* <Box component='img' src={FrameSVG}/> */}
                            
                            <p style={{color: '#888992',fontWeight: '600',textAlign: 'center', fontSize: 16}}>No readings detected for this device.</p>
                        </Box>
                    </Box>
                ):(
                    <TankDetailComponent
                        liters={data.state.liters.filter(ltrs=>ltrs)[0]}
                        on={data.state.on}
                        owner={data.state.name}
                        waterQuality={foundQuality}
                        waterTemp={data.state.temp.filter(temp=>temp)[0]}
                    />
                )
            }

        </Box>
    );
}

export default DevicesPage;