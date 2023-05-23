
import { Box } from '@mui/material';
import SearchComponent from './Search.component';
import {Avatar} from '@mui/material';
import {WaterDrop} from '@mui/icons-material';
function NavigationIndex() {
    return (
        <Box sx={{ bgcolor: '#fff', display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <WaterDrop style={{fontSize: 40, color: '#4592F6'}}/>
                <h1>MajiUp</h1>
            </Box>
            <Box sx={{width: '45%'}}>
                <SearchComponent/>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                {/* <BadgeComponent/> */}
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <h4 style={{ fontSize: '30px' }} >&#128276; </h4>
                    <Avatar
                        alt="Oliver Kem"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        sx={{ width:32, height: 32 }}
                    />
                    <Box sx={{margin: '0 15px'}}>
                        <h4>John Doe</h4>
                    </Box>
                    <h4 style={{ fontSize: '20px' }} >&#x25BC;</h4>
                </Box>
                
            </Box>
        </Box>
    );
}

export default NavigationIndex;