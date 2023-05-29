
import { Box } from '@mui/material';
import SearchComponent from './Search.component';
import {Avatar} from '@mui/material';
import {WaterDrop} from '@mui/icons-material';
import BadgeComponent from './Badge.component';
function NavigationIndex() {
    return (
        <Box sx={{padding: '10px 0', bgcolor: '#fff', display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <WaterDrop style={{fontSize: 'calc(20px + 1vw)', color: '#4592F6'}}/>
                <h1 style={{fontSize: 'calc(20px + 1vw)', fontWeight:'normal'}}>MajiUp</h1>
            </Box>
            <Box sx={{width: '45%'}}>
                <SearchComponent/>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <BadgeComponent  />
                <Avatar
                    alt="Oliver Kem"
                    src="https://mui.com/static/images/avatar/1.jpg"
                    sx={{ width:32, height: 32, margin: '0 20px' }}
                    title='John Doe'
                />
                
                <h4 style={{margin: '0 20px', fontSize: '20px' }} >&#x25BC;</h4>
            </Box>
                
        </Box>
    );
}

export default NavigationIndex;