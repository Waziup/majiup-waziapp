import { Box, Stack } from '@mui/material';
type Props = {
    name: string,
    amount: number,
    litresPercent: number,
    handleOpen: ()=>void,
    open: boolean,
    handleClose: ()=>void,
    temp: number,
    isOn: boolean,
    modified: any
}
import TankSVG from '../../assets/tank.svg'
import { useNavigate } from 'react-router-dom';
import { TbAlertHexagon } from 'react-icons/tb';
const COMMON_P={
    fontSize: '14px',
    paddingTop: '10px',
}
function ItemCardComponent({name,modified, amount,temp,isOn,}: Props) {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/settings')
    }

    const getLastSeen = () => {     
        const date = new Date(modified);
        const now = new Date();
        const timeDifference = now.getTime() - date.getTime();
        // Define time intervals in milliseconds
        const minute = 60 * 1000;
        const hour = minute * 60;
        const day = hour * 24;
        const week = day * 7;
        const month = day * 30;
        const year = day * 365;
       

        if (timeDifference < minute) {
            const secondsAgo = Math.floor(timeDifference / 1000);
            return `${secondsAgo} ${secondsAgo === 1 ? 'secs' : 'secs'} ago`;
        } else if (timeDifference < hour) {
            const minutesAgo = Math.floor(timeDifference / minute);
            return `${minutesAgo} ${minutesAgo === 1 ? 'min' : 'mins'} ago`;
        } else if (timeDifference < day) {
            const hoursAgo = Math.floor(timeDifference / hour);
            return `${hoursAgo} ${hoursAgo === 1 ? 'hrs' : 'hrs'} ago`;
        } else if (timeDifference < week) {
            const daysAgo = Math.floor(timeDifference / day);
            return `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
        } else if (timeDifference < month) {
            const weeksAgo = Math.floor(timeDifference / week);
            return `${weeksAgo} ${weeksAgo === 1 ? 'week' : 'weeks'} ago`;
        } else if (timeDifference < year) {
            const monthsAgo = Math.floor(timeDifference / month);
            return `${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} ago`;
        } else if (timeDifference > year) {
            const yearsAgo = Math.floor(timeDifference / year);
            return `${yearsAgo} ${yearsAgo === 1 ? 'year' : 'years'} ago`;
        } else {
            return false
        }   
    }   
    
    const lastSeen = getLastSeen();
   
  // Determine the appropriate time unit to display
  

    return (
        
        <Box  sx={{ ":hover":{bgcolor:'#FFE6D9'},cursor: 'pointer', transition: '.5s', borderRadius: '5px', width: '100%',boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px'}}>
                <Stack direction={'row'}>
                    <Box component={'img'} 
                        src={TankSVG} 
                        sx={{
                            width: '16px', 
                            height: '38.33px',
                            marginRight: '10px',
                        }}
                    />
                    {
                    (
                        <Box>
                            <h3 style={{fontSize: '20px',fontWeight: 'normal', }}>{name}</h3>
                            <p style={COMMON_P}>Quantity</p>
                            <p style={COMMON_P} >Temperature:</p>
                        </Box>
                    )                        
                    }
                    
                </Stack>
                <Box>
                    <h3 style={
                        isOn?{fontSize: '16px', color: '#85ea2d'}:{fontSize: '16px', color: '#888992'}
                    }>{
                        lastSeen? (isOn?'Active':`${lastSeen}`):
                        <Box sx={{display:'flex', alignItems:'center', gap:1}}>
                            <TbAlertHexagon size={23} color='#E46B26'/>
                            <h3 style={{fontSize:'14px', color:'#E46B26', cursor:'pointer'}} onClick={handleNavigate}>Finish Setup</h3>
                        </Box>                        
                    }</h3>
                    {
                    (
                        lastSeen &&
                        <>
                            <p style={COMMON_P}>{amount} Ltrs</p>
                            <p style={COMMON_P}>{temp}&#8451;</p>
                        </>
                    )
                    }
                    {/* <p style={{fontSize: '14px', color: '#E46B26'}}>{amount}</p> */}
                    {/* <p style={{fontSize: '14px', color: '#E46B26'}}>{temp}&#8451;</p> */}
                </Box>
            </Box>
        </Box>
    );
}

export default ItemCardComponent;