import {Stack,Box, styled, Switch, Typography} from '@mui/material';
import {FireHydrantAlt, WaterDrop, DeviceThermostatSharp, AutoAwesome, DeviceThermostat, Opacity } from "@mui/icons-material";
import WatertankComponent from '../WaterTank/Watertank.component';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useContext, useEffect, useState } from 'react';
import MapComponent from '../MapComponent/Map.component';
import FrameSVG from '../../assets/not-found.svg';
import { Actuator, DevicesContext, X, } from '../../context/devices.context';
import axios from 'axios';

type Consumption = {
    x: number,
    y: number,
}
import Chart from 'react-apexcharts';
import { postNewNotificationMessage } from '../../utils/consumptionHelper';

type Props={
    owner: string,
    liters: number,
    waterTemp: number,
    waterQuality: string,
    on: boolean,
	consumption: Consumption[],
    actuator?: Actuator[],
    height: number,
    capacity: number,
    toggleActuator?: (id: string) => Promise<boolean>,
    id: string,
    receiveNotifications: boolean,    
}

export const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
	bgcolor: '#FF5C00',
	
	'.MuiSwitch-checked':{
		bgcolor: '#FF5C00'
	},
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },'&:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.secondary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&:after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
}));
const BoxStyle: React.CSSProperties={borderRadius: "10px", margin: "10px 0",position: 'relative'}

const TankDetails: React.CSSProperties={padding: '6px 20px',margin: '7px 0', width: '45%',borderRadius: '10px', boxShadow: '1px 1px 4px  rgba(0, 0, 0, 0.15)'}
// async function checkForAlert(id: string,height: number, devices: X[],maxalert?: number, minalert?: number, ): Promise<boolean>{
//     if(maxalert && minalert){
//         if(height > maxalert || height < minalert){
//             await postNewNotificationMessage(id,devices,`Tank ${id} is ${height > maxalert? 'full, turn off pump': 'Empty, turn on pump'}`)
//             return true;
//         }
//     }
//     return false;
// }
function TankDetailComponent({id,capacity, receiveNotifications, waterTemp,waterQuality, liters,consumption, actuator, toggleActuator}:Props) {
	const [toggleHot, setToggleHot] = useState(false);
    const [temperatureConsumption, setTemperatureConsumption] = useState<Consumption[]>([]);
    const [pumpStatus, setPumpStatus] = useState(false);
    const {devices} = useContext(DevicesContext);    
    const device = devices.find((device: X) => device.id === id);

    // const [isalert, setAlert] = useState(false);

    const apexChartOptions = {
        series: [{
            name: 'Consumption',
            data: temperatureConsumption?.map((item)=>item.y),
            type: "area"
        }],
        options: {
            chart: {
                height: 350,
                type: "rangeArea",
                zoom: {
                    enabled: true
                },
                toolbar: {
                    show: false
                }
            },
            colors: ['#FF0000'],
            
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: temperatureConsumption?.map((item)=>item.x),
            },
            fill: {
                type: "gradient",
                gradient: {
                  shadeIntensity: 1,
                  opacityFrom: 0.7,
                  opacityTo: 0.9,
                  stops: [0, 90, 100]
                }
            },
        },
    }
          
    async function switchActuator(){
        if(actuator && toggleActuator){
            await toggleActuator(id);
            const pumpUpdate = !pumpStatus
            setPumpStatus(pumpUpdate);
            if (pumpUpdate===true){
                postNewNotificationMessage(id, devices,`Pump turned ON! Tank, ${device?.name}`, "LOW")                                                                                  ;
                alert(`Pump turned ON! Tank, ${device?.name}`);
            } else if (pumpUpdate===false) {
                postNewNotificationMessage(id, devices,`Pump turned OFF! Tank, ${device?.name}`, "LOW")                                                                                  ;
                alert(`Pump turned OFF! Tank, ${device?.name}`);
            }
            
        }
    }

    // useEffect(()=>{
    //     const checPump = (async ()=>{
    //         const alert = await checkForAlert(id,height,devices,maxalert,minalert);
    //         setAlert(alert);
    //     })
    //     checPump();
    // },[devices,minalert,maxalert,height,id])

    useEffect(()=>{
        const actuatorValue = actuator!== undefined? actuator[0].value: false;
        return actuatorValue ===false? setPumpStatus(false): setPumpStatus(true);
    },[actuator])

    useEffect(()=>{
        setTemperatureConsumption(consumption);
        
    },[consumption]);

    async function runFetch(){
        const temperatureConsumptionVal =await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tanks/${id}/tank-sensors/water-temperature/values`,{
            headers:{
                'Accept': 'application/json',
            }
        })
        .then((response)=>{
            console.log(response.data)
            const plotVals = response.data.map((val: { time: any; value: any; })=>{
                const date = new Date(val.time)
                const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

                const dayOfWeek = daysOfWeek[date.getUTCDay()];

                const hours = String(date.getUTCHours()).padStart(2, '0');

                const minutes = String(date.getUTCMinutes()).padStart(2, '0');
                return {
                    x: (`${dayOfWeek}, ${hours}:${minutes}`),
                    y: val.value
                }
            })

            return plotVals
           
        })
        .catch((err)=>{
            alert(err);
        })

        setTemperatureConsumption(temperatureConsumptionVal);
    }
    useEffect(()=>{
        if(toggleHot){
            runFetch();
        }else{
            setTemperatureConsumption(consumption);
        }
    },[toggleHot])

    function handleToggleTeemp(){
        setToggleHot(!toggleHot);
    }
    
    return (
        <Stack sx={(consumption?.length || waterQuality && waterTemp)?{...BoxStyle,bgcolor: "#fff"}:{...BoxStyle, bgcolor:'inherit'}} alignItems={'center'}  direction='column' alignContent={'center'} spacing={2}>
            {
                (consumption?.length || waterQuality && waterTemp) ?(
                    <>
                    {/* <h3 style={{display: 'inline-block'}}>{owner}</h3> */}
                    {
                        // isalert?(
                        //     <Box sx={{display: 'flex',marginTop:'10px', justifyContent: 'space-between',alignItems: 'center', padding:'8px 3px', cursor: 'pointer', transition: '.5s', borderRadius: '5px', bgcolor:'#E7D66C', width: '90%',boxShadow: '3px 1px 2px rgba(0, 0, 0, 0.15)',}}>
                        //         <p style={{display: 'inline-flex',paddingLeft: '5px', color:'#B69E09', alignItems: 'center'}}>
                        //             ""
                        //         </p>
                        //         <p style={{color:'#B69E09'}} >&#10006;</p>
                        //     </Box>
                        // ):(null)
                    }
                    {
                        (actuator?.length as number)>0?(
                            <Box sx={{display: 'flex',marginTop:'10px', justifyContent: 'space-between',alignItems: 'center', cursor: 'pointer', transition: '.5s', borderRadius: '5px', width: '90%',boxShadow: '3px 1px 2px rgba(0, 0, 0, 0.15)',}}>
                                <p style={{display: 'inline-flex',padding: 2, alignItems: 'center'}}>
                                    <FireHydrantAlt  sx={{fontSize: 25, color: '#4592F6'}}/>
                                    {(actuator)?actuator[0].name: 'Water Pump Control'}
                                </p>
                                <Android12Switch onClick={switchActuator} checked={pumpStatus} sx={{color:'#FF5C00'}}  />
                            </Box>
                        ):(
                            <Typography>No actuator device.</Typography>
                        )
                    }
                    <WatertankComponent waterQuality={waterQuality} percentage={Math.round((liters/capacity)*100)} />
                    <Stack direction={'row'} flexWrap={'wrap'} alignItems={'center'} justifyContent={'space-between'} sx={{marginTop:'10px',width: '80%',}}>
                        <Box sx={TankDetails}>
                            <p style={{fontSize: '12px',display: 'inline-flex', alignItems:'center'}}>
                                <WaterDrop style={{fontSize: 10,  color: '#4592F6'}}/>
                                Current Amount
                            </p>
                            <p style={{fontSize: '24px'}}>{liters} Ltr</p>
                        </Box>
                        <Box sx={TankDetails}>
                            <p style={{fontSize: '12px',display: 'inline-flex', alignItems:'center'}}>
                                <DeviceThermostatSharp style={{fontSize: 12, display: 'inline-block', color: '#1C1B1F'}}/>
                                Temperature
                            </p>
                            <p style={{fontSize: '24px'}}>{Math.round(waterTemp)}&#8451;</p>
                        </Box>
                        <Box sx={TankDetails}>
                            <p style={{fontSize: '12px',display: 'inline-flex', alignItems:'center'}}>
                                <AutoAwesome style={{fontSize: 12, display: 'inline-block', }}/>
                                Water Quality
                            </p>
                            {
                                waterQuality?.toLowerCase().includes('excellent') &&(
                                    <p style={{fontSize: '24px',color:'#85ea2d' }}>{waterQuality}</p>
                                )
                            }
                            {
                                waterQuality?.includes('Poor') &&(
                                    <p style={{fontSize: '24px',color:'#c5221f' }}>{waterQuality}</p>
                                )
                            }
                            {
                                waterQuality?.includes('Good') &&(
                                    <p style={{fontSize: '24px',color:'#f35e19' }}>{waterQuality}</p>
                                )
                            }

                        </Box>
                        <Box sx={TankDetails}>
                            <p style={{fontSize: '12px',display: 'inline-flex', alignItems:'center'}}>
                                <WaterDrop style={{fontSize: 12, display: 'inline-block', color: '#2C2D38'}}/>
                                Water Leakage
                            </p>
                            <p style={{fontSize: '24px',}}>No</p>
                        </Box>
                    </Stack>
                    <Box sx={{display: 'flex',marginTop:'10px', justifyContent: 'space-between',alignItems: 'center', cursor: 'pointer', transition: '.5s', borderRadius: '5px', width: '90%',boxShadow: '1px 2px 1px rgba(0, 0, 0, 0.15)',}}>
                        <p style={{fontSize: '14px',display: 'inline-flex', alignItems:'center'}}>
                            <NotificationsIcon style={{fontSize: 14,  }}/>
                            Notification
                        </p>
                        <Android12Switch checked={receiveNotifications}/>
                    </Box>
                    <Box sx={{ display: 'flex',flexDirection: 'column', alignItems:'center',  transition: '.5s',  }}>
                        <Box sx={{ display: 'flex',flexDirection: 'row', alignItems:'center', justifyContent:'space-between',  transition: '.5s',width:'75%'  }}>
                            <p style={{fontSize: 16,fontWeight: '600', textAlign: 'center'}}>WATER {toggleHot?'TEMPERATURE':'CONSUMPTION'}</p>
                            <Box onClick={handleToggleTeemp} pt={.3} bgcolor={'#E8E8E8'} sx={{borderRadius:'20px', width: '20%', textAlign:'center'}} >
                                <Opacity style={!toggleHot? { cursor: 'pointer', color:'#fff',borderRadius:'50%', backgroundColor:'#4592F6' }:{ cursor: 'pointer', color:'#888992',borderRadius:'50%', }}/>
                                <DeviceThermostat style={toggleHot?{ color:'#fff',cursor: 'pointer', borderRadius:'50%',backgroundColor:'#FF5C00'}:{ color:'#888992',cursor: 'pointer', }}/>
                            </Box>
                        </Box>
                        {/* <CanvasJSChart style={{innerHeighteight:'200px'}}  options = {options}/> */}
                        <Chart
                            options={{
                                chart: {
                                    height: 350,
                                    type: "rangeArea",                                    
                                },
                                colors: [toggleHot? '#FF0000':'#4592F6'],
                                
                                dataLabels: {
                                    enabled: false
                                },
                                stroke: {
                                    curve: 'smooth',
                                    width:2,
                                },
                                xaxis: {
                                    categories: temperatureConsumption?.map((item)=>item.x),
                                },
                                fill: {
                                    type: "gradient",
                                    gradient: {
                                      shadeIntensity: 1,
                                      opacityFrom: 0.5,
                                      opacityTo: 0.5,
                                      stops: [0, 90, 100]
                                    }
                                },
                            }}
                            series={apexChartOptions.series}
                            type="line"
                            height={350}
                            width={380}
                        />
                        <Box id='#chart'>
                        </Box>
                        <MapComponent />
                    </Box>
                </>)
                :(
                    <Box sx={{position: 'relative'}}>
                        <Box sx={{marginTop: '10px'}}>
                            {/* <h3 style={{fontSize: '15px', textAlign: 'center', margin:'10px 0'}}>
                                {owner}
                            </h3> */}
                            <Box sx={{width: '100%'}} component='img' src={FrameSVG}/>
                            <p style={{color: 'red',fontWeight: '600',textAlign: 'center', fontSize: 16}}>No readings detected for this device!</p>
                        </Box>
                    </Box>
                )
            }
        </Stack>
    );
}

export default TankDetailComponent;