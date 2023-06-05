
import { Box } from '@mui/material';
import SearchComponent from './Search.component';
import {Avatar} from '@mui/material';
import {WaterDrop, NotificationsNone} from '@mui/icons-material';
import ArrowDropDownSVG from '../../assets/arrow_drop_down.svg';
function NavigationIndex() {
    return (
        <Box sx={{padding: '10px 0', bgcolor: '#fff', display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <WaterDrop style={{fontSize: 'calc(20px + 1vw)', color: '#4592F6'}}/>
                <h1 style={{fontSize: 'calc(20px + 1vw)', fontWeight:'normal'}}>MajiUp</h1>
            </Box>
            <Box sx={{width: '60%'}}>
                <SearchComponent/>
            </Box>
            <Box sx={{display: 'flex',width:'20%',height:'100%', cursor:'pointer', ":hover":{bgcolor:'#f5f5f5'}, alignItems: 'center', justifyContent: 'space-around', }}>
                <Box sx={{position:'relative'}} >
                    <NotificationsNone sx={{fontWeight:'light',color:'#000'}} />
                    <h3 style={{fontSize: '15px', fontWeight:'bold', position:'absolute', top:-6,right:3 ,backgroundColor:'#fff'}}>3</h3>
                </Box>
                <Box mr={2} sx={{display: 'flex',width:'100%', cursor:'pointer',  alignItems: 'center', justifyContent: 'space-evenly', height:'100%'}}>
                    <Avatar
                        alt="Oliver Kem"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        sx={{ width:32, height: 32, }}
                        title='John Doe'
                    />
                    <h3 style={{fontSize: 'calc(12px + .2vw)', fontWeight:'normal'}}>John Doe</h3>
                    <Box component='img' src={ArrowDropDownSVG} />
                </Box>
            </Box>
                
        </Box>
    );
}

export default NavigationIndex;