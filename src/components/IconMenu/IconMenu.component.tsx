import {Menu,Divider, MenuItem,ListItemText, ListItemIcon} from '@mui/material'
import {Launch, Logout, AccountCircle} from '@mui/icons-material'
import { useContext } from 'react';
import { DevicesContext } from '../../context/devices.context';
import {Link, useNavigate} from 'react-router-dom';
import Fade from '@mui/material/Fade';
interface Props {
    isOpen: boolean;
    anchorEl: null | HTMLElement;
    handleClose: () => void;
}
export default function IconMenuComponent({isOpen, anchorEl, handleClose}:Props) {
    const {setUser} = useContext(DevicesContext)
    const navigate = useNavigate();
    const handleLogout = () => {
        setUser('','');
        navigate('/');
        handleClose();
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