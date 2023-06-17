import {Menu,Divider, MenuItem,ListItemText, ListItemIcon} from '@mui/material'
import {Launch, Logout, AccountCircle} from '@mui/icons-material'
import { useContext } from 'react';
import { DevicesContext } from '../../context/devices.context';
interface Props {
    isOpen: boolean;
    anchorEl: null | HTMLElement;
    handleClose: () => void;
}
export default function IconMenuComponent({isOpen, anchorEl, handleClose}:Props) {
    const {setUser, user} = useContext(DevicesContext)
    const handleLogout = () => {
        setUser('')
        handleClose();
    }
    return (
        <Menu anchorEl={anchorEl}  sx={{ width: 400, maxWidth: '100%', borderRadius:0 }} open={isOpen}>
            <MenuItem onClick={handleClose}>
                <ListItemIcon color='#000'>
                    <AccountCircle fontSize="small" />
                </ListItemIcon>
                <ListItemText>{user}</ListItemText>
                
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Launch fontSize="small" />
                </ListItemIcon>
                <ListItemText>Wazigate</ListItemText>
                
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