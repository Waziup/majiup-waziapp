import { useParams, useLocation,useNavigate } from "react-router-dom";
import TankDetailComponent from "../components/TankDetail/TankDetail.component";
import {NavigateBefore} from '@mui/icons-material';
import { Box } from "@mui/material";
function DevicesPage() {
    const params = useParams();
    console.log(params)
    const data = useLocation();
    const navigate = useNavigate();

    return (
        <Box pl={2} pr={2}>
           <NavigateBefore sx={{cursor:'pointer', border: '1px solid #000',borderRadius:'50%'}} onClick={()=>navigate(-1)} /> 
            <TankDetailComponent
                liters={data.state.liters}
                on={data.state.on}
                owner={data.state.name}
                waterQuality={data.state.waterQuality}
                waterTemp={data.state.waterTemp}
            />
        </Box>
    );
}

export default DevicesPage;