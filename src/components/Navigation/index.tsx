import * as React from 'react';
import { Box } from '@mui/material';
import SearchComponent from './Search.component';
import {WaterDrop, NotificationsNone} from '@mui/icons-material';
import ArrowDropDownSVG from '../../assets/arrow_drop_down.svg';
import {useContext} from 'react';
import { DevicesContext } from '../../context/devices.context';
import IconMenuComponent from '../IconMenu/IconMenu.component';
import {redirect} from 'react-router-dom';
import AvatarComponent from '../AvatarComponent/Avatar.component';
type Props={
    matches: boolean
}
function NavigationIndex({matches}:Props) {
    const {user, toggleModal,devices} = useContext(DevicesContext);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    React.useEffect(() => {
        if(!user){
            setAnchorEl(null);
            redirect('/');
            return;
        }
    }, [user]);
    console.log('Matches is: ',matches)
    return (
        <Box  sx={{padding: '10px 0', bgcolor: '#fff', display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                
                <WaterDrop style={{fontSize: 'calc(20px + 1vw)', color: '#4592F6'}}/>
                <h1 style={{fontSize: 'calc(20px + 1vw)', fontWeight:'normal'}}>MajiUp</h1>
            </Box>
                <Box sx={matches?{width: '60%'}:{width:'60%'}}>
                    <SearchComponent/>
                </Box>
                {
                    !matches &&(
                        <h3 onClick={toggleModal} style={{marginRight:10, cursor: 'pointer'}}>&#x2630;</h3>
                    )
                }
            {
                matches &&(
                    <>
                        <Box onClick={isOpen?handleClose:handleClick} sx={{display: 'flex',width:'20%',height:'100%', cursor:'pointer', ":hover":{bgcolor:'#f5f5f5'}, alignItems: 'center', justifyContent: 'space-around', }}>
                            <Box sx={{position:'relative'}} >
                                <NotificationsNone sx={{fontWeight:'light',color:'#000'}} />
                                <h3 style={{fontSize: '15px', fontWeight:'bold', position:'absolute', top:-6,right:3 ,backgroundColor:'#fff'}}>{devices.reduce((acc,device)=>acc+device.notification.length,0)}</h3>
                            </Box>
                            <Box mr={2} sx={{display: 'flex',width:'100%', cursor:'pointer',  alignItems: 'center', justifyContent: 'space-evenly', height:'100%'}}>
                                <AvatarComponent name={user.name} src='"https://mui.com/static/images/avatar/1.jpg"' />
                                <h3 style={{fontSize: 'calc(12px + .2vw)', fontWeight:'normal'}}>{user.name}</h3>
                                <Box component='img' src={ArrowDropDownSVG} />
                            </Box>
                        </Box>
                        <IconMenuComponent
                            anchorEl={anchorEl}
                            isOpen={isOpen}
                            handleClose={handleClose}
                        />
                    </>
                )
            }
                
        </Box>
    );
}

export default NavigationIndex;