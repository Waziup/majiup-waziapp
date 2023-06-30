import { Box, Grid } from "@mui/material";
import SideNavigation from "../SideNavigation";
import NavigationIndex from "../Navigation";
import ItemCardComponent from "../ItemCard/ItemCard.component";
import { useContext, useState } from "react";
import TankDetailComponent from "../TankDetail/TankDetail.component";
import {useTheme, useMediaQuery} from "@mui/material";
import { useNavigate, } from "react-router-dom";
import { X as Device } from "../../context/devices.context";

import './Grid.styles.css'
import { DevicesContext } from "../../context/devices.context";

const BoxStyle={ 
    bgcolor: "#fff", 
    borderRadius: "10px",
    margin: "10px 0",
}

function GridComponent() {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { isOpenNav, devices,setTanks, setSelectedDevice, selectedDevice } = useContext(DevicesContext)
    const navigate = useNavigate();        
    
    const handleSelectedTank = (tank: Device) => {
        console.log(tank);
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
     
    function mqttSubscription(devices: Device []){                  
        var reconnectTimeout = 2000;        
        var mqtt = new window['Paho'].MQTT.Client("api.waziup.io", Number(443), "/websocket", "clientjs");
        console.log(mqtt)
        var options = {
            useSSL: true,
            timeout: 5,
            onSuccess: onConnect,
            onFailure: onFailure
        };

        mqtt.connect(options)     
        mqtt.onMessageArrived = onMessageArrived;               

        function onConnect() {
            console.log("Connected!")            
            return devices.map((device)=>{                
                const deviceId = device.id
                const deviceUrl = "devices/"+deviceId            
                mqtt.subscribe(deviceUrl+"/#")
                // getData('https://api.waziup.io/api/v2/'+sensorUrl,sensor.name)                                    
    
            })        
        }

        function onFailure(message: string) {
            console.log("Failed: ", message);
            setTimeout(window['MQTTconnect'], reconnectTimeout);
        }

        function onMessageArrived(msg) {
            console.log("----------->")
            // const val = (JSON.parse(msg.payloadString))  
            // console.log("Received -> ",val)                                
        }
    }
     
    mqttSubscription(devices);

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
                                    isOn={tank.on}
                                    amount={tank.liters}
                                    name={tank.name}
                                    litresPercent={tank.liters}
                                    handleClose={handleClose}
                                    handleOpen={handleOpen}
                                    open={open}
                                    temp={tank.temp}
                                />
                            </Box>
                        ))
                    }
                </Grid>
                {
                    matches&&(
                        <Grid item xs={3.4}>
                            {
                                selectedDevice &&(
                                    <TankDetailComponent
                                        // waterLevel={selectedDevice.amount??50}
                                        owner={selectedDevice.name}
                                        waterTemp={selectedDevice.temp}
                                        waterQuality={'Turbidity'}
                                        liters={selectedDevice.liters}
                                        on={selectedDevice.on??false}
                                        consumption={selectedDevice.consumption}
                                    />
                                )
                            }                            
                        </Grid>
                    )
                }
            </Grid>
        </Grid>        
    );
}

export default GridComponent;
