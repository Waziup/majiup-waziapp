import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Settings, Language, InsertChart,Dashboard, NotificationsNone,} from '@mui/icons-material';
import { NavLink, } from 'react-router-dom';
import { useContext } from 'react';
import { DevicesContext } from '../../context/devices.context';
import IconMenuComponent from '../IconMenu/IconMenu.component';
import ArrowDropDownSVG from '../../assets/arrow_drop_down.svg';
import React from 'react';
import {redirect} from 'react-router-dom';
import AvatarComponent from '../AvatarComponent/Avatar.component';
const LinkStyle={
    textDecoration: 'none', 
    width: '100%',
    borderTopRightRadius: '25px',
    borderBottomRightRadius: '25px',
}
type FuncProps={
    isActive: boolean,
    isPending: boolean
}
type Props={
    matches: boolean
}
export default function SideNavigation({matches}: Props) {
    const stylingFunc =({isActive, }: FuncProps)=>{
        return{
            backgroundColor: isActive? '#E46B26':'inherit',
            ...LinkStyle,
            color: isActive? 'white':'#1C1B1F'
        }
    }
    const {toggleModal, user,devices} = useContext(DevicesContext)
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
    // console.log('Matches in side nav', matches)
    return (
        <Box sx={{ width: '100%', height: '100vh', 
                maxWidth: 360, 
                color: 'white', 
                display: 'flex', flexDirection: 'column', 
                justifyContent: 'flex-start',
            }}>
        
            <nav aria-label="main mailbox folders">
                <List>
                    <ListItem onClick={toggleModal}>
                        {/* // eslint-disable-next-line @typescript-eslint/no-unused-vars */}  
                        <NavLink style={stylingFunc} replace  to="/dashboard">
                            <ListItemButton>
                                <ListItemIcon>
                                    <Dashboard sx={{color: 'inherit'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Dashboards" />
                                <h4 style={{ borderRadius: '2px', fontWeight: 'bolder', padding:'0 2%', background: '#fff', color: '#E46B26'}}>3</h4>
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                    <ListItem onClick={toggleModal}>
                        <NavLink style={stylingFunc} replace  to="/analytics">
                            <ListItemButton>
                                <ListItemIcon>
                                    <InsertChart />
                                </ListItemIcon>
                                <ListItemText primary="Analytics" />
                                
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                    <ListItem onClick={toggleModal}>
                        <NavLink style={stylingFunc} replace  to="/settings">
                            <ListItemButton color='initial'>
                                <ListItemIcon color='initial'>
                                    <Settings sx={{color: 'inherit'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Settings" />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                    <ListItem onClick={toggleModal}>
                        <NavLink style={stylingFunc} replace color={'inherit'} to="/community">
                            <ListItemButton>
                                <ListItemIcon>
                                    <Language sx={{color: 'inherit'}}/>
                                </ListItemIcon>
                                <ListItemText  primary="Community" />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                    {
                        !matches &&(
                            <>
                                <ListItem>
                                    <Box ml={2} onClick={isOpen?handleClose:handleClick} sx={{display: 'flex',alignItems:'center', cursor:'pointer', ":hover":{bgcolor:'#f5f5f5'}, }}>
                                        <Box sx={{position:'relative'}} >
                                            <NotificationsNone sx={{fontWeight:'light',color:'#000'}} />
                                            <h3 style={{fontSize: '15px', fontWeight:'bold', position:'absolute', top:-6,right:3 ,backgroundColor:'#fff'}}>{devices.reduce((acc,device)=>acc+device.notifications.length,0)??0}</h3>
                                        </Box>
                                        <Box mr={2} sx={{display: 'flex',width:'100%', cursor:'pointer',  alignItems: 'center', justifyContent: 'space-evenly', height:'100%'}}>
                                            <AvatarComponent name={user.name} src='"https://mui.com/static/images/avatar/1.jpg"' />
                                            
                                            <h3 style={{fontSize: 'calc(12px + .2vw)', fontWeight:'normal'}}>{user.name}</h3>
                                            <Box component='img' src={ArrowDropDownSVG} />
                                        </Box>
                                    </Box>
                                </ListItem>
                                {/* <ListItem>
                                    <Box ml={2} onClick={isOpen?handleClose:handleClick}  sx={{display: 'flex', cursor:'pointer',  alignItems: 'center', height:'100%', borderBottom:'1px solid #000', }}>
                                        <h3 style={{fontSize: 'calc(12px + .2vw)',color:'black', fontWeight:'normal'}}>Oliver</h3>
                                        <Box component='img' src={ArrowDropDownSVG} />
                                    </Box>
                                </ListItem> */}
                                <IconMenuComponent
                                    anchorEl={anchorEl}
                                    isOpen={isOpen}
                                    handleClose={handleClose}
                                />
                            </>
                        )
                    }
                </List>
            </nav>
        </Box>
    );
}