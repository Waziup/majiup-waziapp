import { ArrowBack} from '@mui/icons-material'
import { Box } from '@mui/material';
import SearchComponent from './Search.component';
import BadgeComponent from './Badge.component';
import { AddCircle } from '@mui/icons-material';
import {Avatar} from '@mui/material';
function NavigationIndex() {
    const num=3;
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <ArrowBack/>
                <SearchComponent/>
            </div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '40%', alignItems: 'center'}}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                    <AddCircle sx={{color: '#1a73e8', fontSize: 30}} />
                    <h4 style={{color: '#1a73e8'}}>Add Device</h4>
                </Box>
                <BadgeComponent/>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Avatar
                        alt="Oliver Kem"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        sx={{ width: 56, height: 56 }}
                    />
                    <Box sx={{margin: '0 15px'}}>
                        <h4>Oliver Kem</h4>
                        <p>{num} device{num>1? 's':''}</p>
                    </Box>
                </Box>
                
            </Box>
        </Box>
    );
}

export default NavigationIndex;