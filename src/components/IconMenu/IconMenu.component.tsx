import {Menu,Divider, MenuItem,ListItemText, ListItemIcon, Box} from '@mui/material'
import {Launch, Logout, AccountCircle} from '@mui/icons-material'
import { useContext } from 'react';
import { DevicesContext } from '../../context/devices.context';
import {Link, useNavigate} from 'react-router-dom';
import Fade from '@mui/material/Fade';
import { Message } from '@mui/icons-material';
import { markMessageAsRead } from '../../utils/consumptionHelper';
interface Props {
    isOpen: boolean;
    anchorEl: null | HTMLElement;
    handleClose: () => void;
}
export default function IconMenuComponent({isOpen, anchorEl, handleClose}:Props) {
    const {setUser, devices} = useContext(DevicesContext)
    const navigate = useNavigate();
    const handleLogout = () => {
        setUser('','');
        navigate('/');
        handleClose();
    }
    async function handleReadNotification(deviceId: string,messageId: string){
        const response = await markMessageAsRead(deviceId,devices,messageId);
        console.log('Response for read message', response)
    }
    return (
        <Menu 
            TransitionComponent={Fade} 
            onClose={handleClose} 
            anchorEl={anchorEl}
            MenuListProps={{
                'aria-labelledby': 'fade-button',
            }}
            sx={{ width: 400, maxWidth: '100%', borderRadius:0 }} 
            open={isOpen}>
            <MenuItem onClick={handleClose}>
                <ListItemIcon color='#000'>
                    <AccountCircle fontSize="small" />
                </ListItemIcon>
                <ListItemText>Admin</ListItemText>
                
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Link style={{textDecoration: 'none', display: 'flex'}} target='_blank' to='http://wazigate.local/'>
                    <ListItemIcon>
                        <Launch fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Wazigate</ListItemText>
                </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <ListItemIcon>
                        <Message fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Notifications</ListItemText>
                </div>
            </MenuItem>
            <div style={{fontSize: 12,borderTop: '1px solid black', width: 200, padding: '10px' }}>
                {
                    devices.length >0? devices.map((dev)=>{
                        if(dev.notifications){
                            return dev.meta.notifications.messages.map((not, i)=>{
                                return (
                                    <Box key={i} sx={{display: 'flex',padding: '9px', justifyContent: 'space-between', alignItems: 'centre'}}>
                                        <span key={i} style={{marginRight: 5}}>{not.message}</span>
                                        {
                                            !not.read_status&&(
                                                <span onClick={()=>handleReadNotification(dev.id,not.id)} style={{marginLeft: 5,cursor: 'pointer', fontSize: 10, color: 'blue'}}>{not.read_status?'':'MARK AS READ'}</span>
                                            )
                                        }
                                    </Box>
                                )
                            })
                        }
                        return null;
                    }):(
                        <p>No notifications</p>
                    )
                }
            </div>
            <Divider />
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
            </MenuItem>
        </Menu>
    );
}