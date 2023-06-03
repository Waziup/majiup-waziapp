import { Box, Grid } from "@mui/material";
import SideNavigation from "../SideNavigation";
import NavigationIndex from "../Navigation";
import ItemCardComponent from "../ItemCard/ItemCard.component";
import { useState } from "react";import TankDetailComponent from "../TankDetail/TankDetail.component";

const BoxStyle={ 
    bgcolor: "#fff", 
    borderRadius: "10px",
    margin: "10px 0",
}
type Tank = {
    name: string,
    amount?: number,
    waterTemp: number,
    waterQuality: string,
    liters: number,
    on?: boolean,
    isSelect?: boolean,
}
import './Grid.styles.css'
function GridComponent() {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [tanks, setTanks] = useState<Tank[]>([
        {
            name: 'NGO Tank',
            waterTemp: 75,
            waterQuality: 'Good',
            liters: 300,
            on: true,
            isSelect: true,
        },
        {
            name: 'Home Tank',
            waterTemp: 50,
            waterQuality: 'Good',
            liters: 490,
            on: false,
            isSelect: false,
        },
        {
            name: 'Cattle Tank',
            waterTemp: 44,
            waterQuality: 'Good',
            liters: 290,
            on: true,
            isSelect: false,
        },
        {
            name: 'Restaurant Tank',
            waterTemp: 24,
            waterQuality: 'Turbidity',
            liters: 500,
            on: true,
            isSelect: false,
        },
    ]);
    const [selectedTank, setSelectedTank] = useState<Tank>(tanks[0])
    const handleSelectedTank = ( tank: Tank) => {
        const newTanks = tanks.map((item: Tank) => {
            if(item.name === tank.name){
                item.isSelect = true;
            }else{
                item.isSelect = false;
            }
            return item;
        })
        setTanks(newTanks);
        setSelectedTank(tank);
    }
    return (
        <Grid container style={{background: '#F6F6F6'}} spacing={2}>
            <Grid item  xs={12} >
        <Grid container spacing={2}>
            <Grid sx={{height: "635px",background: "#040273"}} className="side_nav_container" item  xs={2.5} >
                <SideNavigation />
            </Grid>
            <Grid item xs={9}>
                <NavigationIndex />
            </Grid>
            <Grid container spacing={2}>       
                <Grid item xs={2.5}>
                    <SideNavigation />
                </Grid>
                <Grid item xs={6}>
                    {
                        tanks.map((tank: Tank,i: number) => (
                            <Box key={i} onClick={()=>handleSelectedTank(tank)} sx={[BoxStyle,tank.isSelect?{bgcolor: '#FFE6D9'}:{bgcolor: '#fff'}]}>
                                <ItemCardComponent
                                    isOn={tank.on|| false}
                                    amount={tank.liters}
                                    owner={tank.name}
                                    litresPercent={tank.liters}
                                    handleClose={handleClose}
                                    handleOpen={handleOpen}
                                    open={open}
                                    temp={tank.waterTemp}
                                />
                            </Box>
                        ))
                    }
                </Grid>
                <Grid item xs={3.4}>
                    {
                        selectedTank &&(
                            <TankDetailComponent
                                waterLevel={selectedTank.amount??50}
                                owner={selectedTank.name}
                                waterTemp={selectedTank.waterTemp}
                                waterQuality={selectedTank.waterQuality}
                                liters={selectedTank.liters}
                                on={selectedTank.on??false}
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
            </Grid>
        </Grid>
    );
}
export default GridComponent;
