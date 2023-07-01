/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Stack,Box, styled, Switch} from '@mui/material';
import {FireHydrantAlt, WaterDrop, DeviceThermostatSharp, AutoAwesome, DeviceThermostat, Opacity } from "@mui/icons-material";
import WatertankComponent from '../WaterTank/Watertank.component';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import MapComponent from '../MapComponent/Map.component';
import CanvasJSReact from '@canvasjs/react-charts';
import FrameSVG from '../../assets/frame.svg';
import { Actuator } from '../../context/devices.context';
type Props={
    owner: string,
    liters: number,
    waterTemp: number,
    waterQuality: string,
    on: boolean,
	consumption: any[],
    actuator?: Actuator[]
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
const BoxStyle={ 
    bgcolor: "#fff", 
    borderRadius: "10px",
    margin: "10px 0",
	position: 'relative'
}
const TankDetails={padding: '6px 20px',margin: '7px 0', width: '45%',borderRadius: '10px', boxShadow: '1px 1px 4px  rgba(0, 0, 0, 0.15)'}


function TankDetailComponent({owner,waterTemp,waterQuality,liters,consumption, actuator}:Props) {
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [toggleHot, setToggleHot] = useState(false);
	// const CanvasJS = CanvasJSReact.CanvasJS;
	const CanvasJSChart = CanvasJSReact.CanvasJSChart
	const options = {
		// animationEnabled: true,
		// exportEnabled: true,
		// theme: "light2", // "light1", "dark1", "dark2"
		title:{
			// text: "Bounce Rate by Week of Year"
		},
		toolTip:{
			// shared: true,
		},
		axisY: {
			// title: "Bounce Rate",
			// suffix: "%"
			interval: 2
		},
		axisX: {
			// title: "Week of Year",
			suffix: "AM",
			interval: 2
		},
		data: [{
			type: "line",
			yValueFormatString: "#,##0.0#\"%\"",
			// toolTipContent: "Week {x}: {y}%",
			dataPoints: consumption
		}]
	}
    console.log('Water quality ', waterQuality,consumption,actuator)
    return (
        <Stack sx={BoxStyle} alignItems={'center'}  direction='column' alignContent={'center'} spacing={2}>
            {
                (consumption.length || waterQuality && waterTemp) ?(
                    <>
                    <h3 style={{display: 'inline-block'}}>{owner}</h3>
                    <Box sx={{display: 'flex',marginTop:'10px', justifyContent: 'space-between',alignItems: 'center', cursor: 'pointer', transition: '.5s', borderRadius: '5px', width: '90%',boxShadow: '3px 1px 2px rgba(0, 0, 0, 0.15)',}}>
                        <p style={{display: 'inline-flex',padding: 2, alignItems: 'center'}}>
                            <FireHydrantAlt  sx={{fontSize: 25, color: '#4592F6'}}/>
                            {actuator[0].name??'Water Pump Control'}
                        </p>
                        <Android12Switch onClick={()=>setIsChecked(!isChecked)} checked={isChecked} sx={{color:'#FF5C00'}}  />
                    </Box>
                    <WatertankComponent waterQuality={waterQuality} percentage={Math.round((liters/500)*100)} />
                    <Stack direction={'row'} flexWrap={'wrap'} alignItems={'center'} justifyContent={'space-between'} sx={{marginTop:'10px',width: '80%',}}>
                        <Box sx={TankDetails}>
                            <p style={{fontSize: '12px',display: 'inline-flex', alignItems:'center'}}>
                                <WaterDrop style={{fontSize: 12,  color: '#4592F6'}}/>
                                Water Amount
                            </p>
                            <p style={{fontSize: '24px',}}>{liters} Ltr</p>
                        </Box>
                        <Box sx={TankDetails}>
                            <p style={{fontSize: '12px',display: 'inline-flex', alignItems:'center'}}>
                                <DeviceThermostatSharp style={{fontSize: 12, display: 'inline-block', color: '#1C1B1F'}}/>
                                Temperature
                            </p>
                            <p style={{fontSize: '24px',}}>{waterTemp}&#8451;</p>
                        </Box>
                        <Box sx={TankDetails}>
                            <p style={{fontSize: '12px',display: 'inline-flex', alignItems:'center'}}>
                                <AutoAwesome style={{fontSize: 12, display: 'inline-block', }}/>
                                Water Quality
                            </p>
                            {
                                waterQuality.includes('Excellent') &&(
                                    <p style={{fontSize: '24px',color:'#85ea2d' }}>{waterQuality}</p>
                                )
                            }
                            {
                                waterQuality.includes('Poor') &&(
                                    <p style={{fontSize: '24px',color:'#c5221f' }}>{waterQuality}</p>
                                )
                            }
                            {
                                waterQuality.includes('Good') &&(
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
                        {/* <p style={{display: 'inline-block'}}>Notification</p>
                        <Android12Switch checked/> */}
                        <p style={{fontSize: '14px',display: 'inline-flex', alignItems:'center'}}>
                            <NotificationsIcon style={{fontSize: 14,  }}/>
                            Notification
                        </p>
                        <Android12Switch checked/>
                    </Box>
                    <Box sx={{ display: 'flex',flexDirection: 'column', alignItems:'center',  transition: '.5s',  }}>
                        <Box sx={{ display: 'flex',flexDirection: 'row', alignItems:'center', justifyContent:'space-between',  transition: '.5s',width:'75%'  }}>
                            <p style={{fontSize: 16,fontWeight: '600', textAlign: 'center'}}>WATER {toggleHot?'TEMPERATURE':'CONSUMPTION'}</p>
                            <Box onClick={()=>setToggleHot(!toggleHot)} pt={.3} bgcolor={'#E8E8E8'} sx={{borderRadius:'20px', width: '20%', textAlign:'center'}} >
                                <Opacity style={!toggleHot? { cursor: 'pointer', color:'#fff',borderRadius:'50%', backgroundColor:'#4592F6' }:{ cursor: 'pointer', color:'#888992',borderRadius:'50%', }}/>
                                <DeviceThermostat style={toggleHot?{ color:'#fff',cursor: 'pointer', borderRadius:'50%',backgroundColor:'#FF5C00'}:{ color:'#888992',cursor: 'pointer', }}/>
                            </Box>
                        </Box>
                        <CanvasJSChart style={{innerHeighteight:'200px'}}  options = {options}/>
                        
                        <MapComponent />
                    </Box>
                </>)
                :(
                    <Box sx={{position: 'relative'}}>
                        <Box sx={{
                            marginTop: '10px'
                        }}>
                            <h3 style={{fontSize: '15px', textAlign: 'center', margin:'10px 0'}}>
                                {owner}
                            </h3>
                            <Box component='img' src={FrameSVG}/>
                            
                            <p style={{color: '#888992',fontWeight: '600',textAlign: 'center', fontSize: 16}}>No readings detected for this device.</p>
                        </Box>
                    </Box>
                )
            }
        </Stack>
    );
}

export default TankDetailComponent;