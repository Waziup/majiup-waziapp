import {Menu,Divider, MenuItem,ListItemText, ListItemIcon} from '@mui/material'
import {Launch, Logout, AccountCircle} from '@mui/icons-material'
interface Props {
    isOpen: boolean;
    anchorEl: null | HTMLElement;
    handleClose: () => void;
}
export default function IconMenuComponent({isOpen, anchorEl, handleClose}:Props) {
    return (
        <Menu anchorEl={anchorEl}  sx={{ width: 400, maxWidth: '100%', borderRadius:0 }} open={isOpen}>
            <MenuItem onClick={handleClose}>
                <ListItemIcon color='#000'>
                    <AccountCircle fontSize="small" />
                </ListItemIcon>
                <ListItemText>John Doe</ListItemText>
                
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Launch fontSize="small" />
                </ListItemIcon>
                <ListItemText>Wazigate</ListItemText>
                
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
            </MenuItem>
        </Menu>
    );
}