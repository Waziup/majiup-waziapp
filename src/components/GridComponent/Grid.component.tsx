import { Box, Grid } from "@mui/material";
import SideNavigation from "../SideNavigation";
import NavigationIndex from "../Navigation";
import ItemCardComponent from "../ItemCard/ItemCard.component";
import { useContext, useState } from "react";import TankDetailComponent from "../TankDetail/TankDetail.component";
import {useTheme, useMediaQuery} from "@mui/material";
import { useNavigate, } from "react-router-dom";
import { X as Device } from "../../context/devices.context";
const BoxStyle={ 
    bgcolor: "#fff", 
    borderRadius: "10px",
    margin: "10px 0",
}

import './Grid.styles.css'
import { DevicesContext } from "../../context/devices.context";
function getLitres(capacity: number, height: number,level: number): number{
    return (level/height)*capacity;
}
function GridComponent() {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { isOpenNav, devices,setTanks, setSelectedDevice, selectedDevice } = useContext(DevicesContext)
    const navigate = useNavigate();
    
    const handleSelectedTank = (tank: Device) => {
        const newTanks = devices.map((item: Device) => {
            
            if(item.name === tank.name){
                item.isSelect = true;
            }else{
                item.isSelect = false;
            }
            return item;
        })
        if(!matches){
            setTanks(newTanks);
            navigate(`/devices/${tank.id}`,{
                state: tank,
                
            });
            return;
        }
        setTanks(newTanks);
        // setSelectedTank(tank);
        setSelectedDevice(tank);
    }
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    console.log('Devices Loaded: ',devices)
    return (
        
        <Grid container style={{background: '#F6F6F6'}} spacing={2}>
            <Grid item xs={12}>
                <NavigationIndex matches={matches} />
            </Grid>
            <Grid container spacing={2}>
                {isOpenNav && !matches &&(
                    <Box sx={{position:'absolute', height:'100vh', width:'110vw',bgcolor:'rgba(0,0,0,.25)'}}></Box>
                )}
                {
                    (matches || isOpenNav)&&(
                        <Grid sx={!matches?{zIndex:6,position:'absolute', bgcolor:'#fff',transition:.5, width:'500px', height: '95vh', mt:2}:{}} item xs={matches?2.5:9}>
                            <SideNavigation matches={matches} />
                        </Grid>
                    )
                }   
                {/* <Grid item xs={2.5}>
                    <SideNavigation />
                </Grid> */}
                
                <Grid ml={!matches ?3:0} mr={!matches?2:0} item xs={matches?6:12}>
                    {
                        devices.map((tank,i: number) => (
                            <Box key={i} onClick={()=>handleSelectedTank(tank)} sx={[BoxStyle,tank.isSelect?{bgcolor: '#FFE6D9'}:{bgcolor: '#fff'}]}>
                                <ItemCardComponent
                                    isOn={tank.on??false}
                                    amount={getLitres(tank.capacity,tank.height,tank.sensors[1].value)}
                                    owner={tank.name}
                                    litresPercent={getLitres(tank.capacity,tank.height,tank.sensors[1].value)}
                                    handleClose={handleClose}
                                    handleOpen={handleOpen}
                                    open={open}
                                    temp={tank.sensors[0].value}
                                />
                            </Box>
                        ))
                    }
                </Grid>
                {
                    matches&&(
                        <Grid item xs={3.4}>
                            {
                                // selectedTank &&(
                                //     <TankDetailComponent
                                //         waterLevel={selectedTank.amount??50}
                                //         owner={selectedTank.name}
                                //         waterTemp={selectedTank.waterTemp}
                                //         waterQuality={selectedTank.waterQuality}
                                //         liters={selectedTank.liters}
                                //         on={selectedTank.on??false}
                                //     />
                                // )
                                selectedDevice &&(
                                    <TankDetailComponent
                                        // waterLevel={selectedDevice.amount??50}
                                        owner={selectedDevice.name}
                                        waterTemp={selectedDevice.sensors[0].value}
                                        waterQuality={'Turbidity'}
                                        liters={getLitres(selectedDevice.capacity,selectedDevice.height,selectedDevice.sensors[1].value)}
                                        on={selectedDevice.on??false}
                                        consumption={selectedDevice.consumption}
                                    />
                                )
                            }
                            {/* <Stack sx={BoxStyle} alignItems={'center'}  direction='column' alignContent={'center'} spacing={2}>
                                <h3 style={{display: 'inline-block'}}>NGO Tank</h3>
                                <Box sx={{display: 'flex',marginTop:'10px', justifyContent: 'space-between',alignItems: 'center', cursor: 'pointer', transition: '.5s', borderRadius: '5px', width: '90%',boxShadow: '1px 2px 1px rgba(0, 0, 0, 0.15)',}}>
                                    <p style={{display: 'inline-block'}}>Water Pump Control</p>
                                    <Android12Switch />
                                </Box>
                                <Box alt="water Tank." sx={{width: '200px'}} component="img" src={WaterTank}/>
                                <Stack spacing={2} alignItems={'center'} flexWrap={'wrap'} direction="row">
                                    <Box sx={{padding: '6px 10px',borderRadius: '10px', boxShadow: '1px 1px 4px  rgba(0, 0, 0, 0.15)'}}>
                                        <p style={{fontSize: '12px',}}>
                                            <WaterDrop style={{fontSize: 25, display: 'inline-block', color: '#4592F6'}}/>
                                            Water Amount
                                        </p>
                                        <p style={{fontSize: '24px',}}>341 Ltr</p>
                                    </Box>
                                    <Box sx={{padding: '6px 20px',borderRadius: '10px', boxShadow: '1px 1px 4px  rgba(0, 0, 0, 0.15)'}}>
                                        <p style={{fontSize: '12px',}}>
                                            <DeviceThermostatSharp style={{fontSize: 18, display: 'inline-block', color: '#1C1B1F'}}/>
                                            Temperature
                                        </p>
                                        <p style={{fontSize: '24px',}}>32&#8451;</p>
                                    </Box>
                                    <Box sx={{padding: '6px 20px',borderRadius: '10px', boxShadow: '1px 1px 4px  rgba(0, 0, 0, 0.15)'}}>
                                        <p style={{fontSize: '12px',}}>
                                            <AutoAwesome style={{fontSize: 25, display: 'inline-block', }}/>
                                            Water Quality
                                        </p>
                                        <p style={{fontSize: '24px',}}>341 Ltr</p>
                                    </Box>
                                    <Box sx={{padding: '6px 20px',borderRadius: '10px', boxShadow: '1px 1px 4px  rgba(0, 0, 0, 0.15)'}}>
                                        <p style={{fontSize: '12px',}}>
                                            <WaterDrop style={{fontSize: 25, display: 'inline-block', color: '#2C2D38'}}/>
                                            Water Leakage
                                        </p>
                                        <p style={{fontSize: '24px',}}>No</p>
                                    </Box>
                                </Stack>
                                <Box sx={{display: 'flex',marginTop:'10px', justifyContent: 'space-between',alignItems: 'center', cursor: 'pointer', transition: '.5s', borderRadius: '5px', width: '90%',boxShadow: '1px 2px 1px rgba(0, 0, 0, 0.15)',}}>
                                    <p style={{display: 'inline-block'}}>Notification</p>
                                    <Android12Switch/>
                                </Box>
                                <Box sx={{ display: 'flex',flexDirection: 'column', alignItems:'flex-start', cursor: 'pointer', transition: '.5s',  }}>
                                    <p style={{fontSize: '16px',fontWeight: 'bold', textAlign: 'center'}}>WATER CONSUMPTION</p>
                                    <LineChart
                                        width={400}
                                        height={300}
                                        data={data}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            bottom: 5
                                        }}
                                        >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis  />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="time"
                                            stroke="#1A73E8"
                                            activeDot={{ r: 1 }}
                                        />
                                        
                                    </LineChart>
                                </Box>
                            </Stack> */}
                        </Grid>
                    )
                }
            </Grid>
        </Grid>
        
    );
}
export default GridComponent;
