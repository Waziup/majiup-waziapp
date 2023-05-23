import {Stack,Box, styled, Switch} from '@mui/material';
import WaterTank from '../../assets/waterTank.png'
import {FireHydrantAlt, WaterDrop, DeviceThermostatSharp, AutoAwesome } from "@mui/icons-material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
type Props={
    owner: string,
    liters: number,
    waterTemp: number,
    waterLevel: number,
    waterQuality: string,
    on: boolean
}
const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&:before': {
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
}
const data = [
    {
      name: '12AM',
      time: 400,
      amt: 2400,
    },
    {
      name: '2AM',
      uv: 3000,
      time: 1398,
      amt: 2210,
    },
    {
      name: '4AM',
      uv: 2000,
      time: 9800,
      amt: 2290,
    },
    {
      name: '6AM',
      uv: 2780,
      time: 3908,
      amt: 2000,
    },
    {
      name: '8AM',
      uv: 1890,
      time: 4800,
      amt: 2181,
    },
    {
      name: '10AM',
      uv: 2390,
      time: 3800,
      amt: 2500,
    },
    {
      name: '12PM',
      uv: 3490,
      time: 4300,
      amt: 2100,
    },
];
function TankDetailComponent({owner,waterTemp,waterQuality,liters,}:Props) {
    return (
        <Stack sx={BoxStyle} alignItems={'center'}  direction='column' alignContent={'center'} spacing={2}>
            <h3 style={{display: 'inline-block'}}>{owner}</h3>
            <Box sx={{display: 'flex',marginTop:'10px', justifyContent: 'space-between',alignItems: 'center', cursor: 'pointer', transition: '.5s', borderRadius: '5px', width: '90%',boxShadow: '1px 2px 1px rgba(0, 0, 0, 0.15)',}}>
                <p style={{display: 'inline-flex'}}>
                    <FireHydrantAlt style={{fontSize: 25, color: '#4592F6'}}/>Water Pump Control
				</p>
                <Android12Switch checked />
            </Box>
            <Box alt="water Tank." sx={{width: '200px'}} component="img" src={WaterTank}/>
            <Stack spacing={2} alignItems={'center'} flexWrap={'wrap'} direction="row">
                <Box sx={{padding: '6px 10px',borderRadius: '10px', boxShadow: '1px 1px 4px  rgba(0, 0, 0, 0.15)'}}>
                    <p style={{fontSize: '12px',}}>
                        <WaterDrop style={{fontSize: 25, display: 'inline-block', color: '#4592F6'}}/>
                        Water Amount
                    </p>
                    <p style={{fontSize: '24px',}}>{liters} Ltr</p>
                </Box>
                <Box sx={{padding: '6px 20px',borderRadius: '10px', boxShadow: '1px 1px 4px  rgba(0, 0, 0, 0.15)'}}>
                    <p style={{fontSize: '12px',}}>
                        <DeviceThermostatSharp style={{fontSize: 18, display: 'inline-block', color: '#1C1B1F'}}/>
                        Temperature
                    </p>
                    <p style={{fontSize: '24px',}}>{waterTemp}&#8451;</p>
                </Box>
                <Box sx={{padding: '6px 20px',borderRadius: '10px', boxShadow: '1px 1px 4px  rgba(0, 0, 0, 0.15)'}}>
                    <p style={{fontSize: '12px',}}>
                        <AutoAwesome style={{fontSize: 25, display: 'inline-block', }}/>
                        Water Quality
                    </p>
                    <p style={{fontSize: '24px',}}>{waterQuality}</p>
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
                <Android12Switch checked/>
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
                        // left: 35,
                        bottom: 5
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis  />
                    {/* <Tooltip /> */}
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="time"
                        stroke="#1A73E8"
                        activeDot={{ r: 1 }}
                    />
                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
            </Box>
        </Stack>
    );
}

export default TankDetailComponent;