import { Add, MoreVert } from '@mui/icons-material';
import NavigationIndex from '../components/Navigation';
import SideNavigation from '../components/SideNavigation';
import { Box, Grid, Stack } from '@mui/material';
import FrameSVG from '../assets/frame.svg';
import { useContext } from 'react';
import { DevicesContext } from '../context/devices.context';
import { Android12Switch } from '../components/TankDetail/TankDetail.component';
const BoxStyle={ 
    bgcolor: "#fff", 
    borderRadius: "10px",
    mt:3,
    width:'30%',
    minWidth: '300px'
}
function SettingsPage() {
    const { devices } = useContext(DevicesContext);
    return (
        <Grid container style={{background: '#F6F6F6'}} spacing={2}>
            <Grid item  xs={12} >
                <NavigationIndex />
            </Grid>
            <Grid container spacing={2}>       
                <Grid item xs={2.5}>
                    <SideNavigation />
                </Grid>
                <Grid style={{margin: '10px'}} item xs={9}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <h3 style={{fontSize: '24px',margin:'10px 0'}}>Setup Device</h3>
                        <p style={{color: '#fff',fontSize: 16,cursor:'pointer', borderRadius: '20px', padding:'10px 12px', display: 'flex',alignItems: 'center',backgroundColor: '#1C1B1F'}}>
                            <Add sx={{fontSize: 16, margin:'0 4px'}}/>
                            New Device
                        </p>
                    </Box>
                    {
                        devices.length<=0 && (
                            <Box sx={{position: 'relative'}}>
                                <Box sx={{
                                    position: 'absolute',
                                    top: '10vh',
                                    left: '20vw',
                                    // transform: 'translate(-50, -50%)'
                                }}>
                                    <Box component='img' src={FrameSVG}/>
                                    <h3 style={{fontSize: '40px', textAlign: 'center', margin:'1px 0'}}>
                                        Hi there!
                                    </h3>
                                    <p style={{color: '#888992',fontWeight: '600',textAlign: 'center', fontSize: 16}}>Let's create your first device.</p>
                                </Box>
                            </Box>
                        )
                    }
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        {
                            devices.map((device,id)=>(
                                <Stack key={id} p={1} sx={BoxStyle} alignItems={'center'} flexWrap='wrap'  direction='column' alignContent={'center'} spacing={2}>
                                    <Stack  width={'100%'} direction='row'  alignItems={'center'} justifyContent={'space-between'}>
                                        <h3 style={{fontSize: '20px',fontWeight: '500', }}>
                                            {device.name}
                                            <p style={{color: '#888992',fontWeight: 'lighter',textAlign: 'center', fontSize: 12}}>{device.id}</p>
                                        </h3>
                                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                                            <Android12Switch checked/>
                                            <MoreVert/>
                                        </Box>
                                    </Stack>
                                    <Box p={1} sx={{border: '1px solid #888992', borderRadius: 1, width: '100%'}}>
                                        <h3 style={{fontSize: '20px',fontWeight: '500', }}>
                                            Tank Information
                                        </h3>
                                        <Box p={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                            <Box>
                                                <h3 style={{fontSize: '20px',fontWeight: 'normal', }}>Capacity</h3>
                                                <p style={{fontSize: '20px',}}>Height</p>
                                            </Box>
                                            <Box>
                                                <h3 style={{fontSize: '20px',fontWeight: 'normal', }}>{device.liters}
                                                    <span>litres</span>
                                                </h3>
                                                <p style={{fontSize: '20px',}}>
                                                    2
                                                    <span>meters</span>
                                                </p>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box p={1} sx={{border: '1px solid #888992', borderRadius: 1, width: '100%'}}>
                                        <Stack  width={'100%'} direction='row'  alignItems={'center'} justifyContent={'space-between'}>
                                            <h3 style={{fontSize: '20px',fontWeight: '600', }}>
                                                Robodo SEN18
                                            </h3>
                                            <p style={{color: '#888992',fontWeight: 'lighter',textAlign: 'center', fontSize: 14}}>Water level sensor</p>
                                        </Stack>
                                        <Box sx={{justifyContent: 'space-between', display: 'flex', alignItems: 'center'}}>
                                            <h3 style={{fontSize: '18px',fontWeight: '600', }}>
                                                State
                                            </h3>
                                            <Android12Switch checked/>
                                        </Box>
                                        <Box sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center'}}>
                                            <h3 style={{fontSize: '18px',fontWeight: '600', }}>
                                                Notification
                                            </h3>
                                            <Android12Switch checked/>
                                        </Box>
                                    </Box>
                                </Stack>
                            ))
                        }
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default SettingsPage;