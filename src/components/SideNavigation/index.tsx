import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Settings, Language, InsertChart,Dashboard } from '@mui/icons-material';
import { NavLink, } from 'react-router-dom';
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
export default function SideNavigation() {
    const stylingFunc =({isActive, }: FuncProps)=>{
        return{
            backgroundColor: isActive? '#E46B26':'inherit',
            ...LinkStyle,
            color: isActive? 'white':'#1C1B1F'
        }
    }
  return (
    <Box sx={{ width: '100%', height: '100vh', 
            maxWidth: 360, 
            color: 'white', 
            display: 'flex', flexDirection: 'column', 
            justifyContent: 'flex-start',
         }}>
    
        <nav aria-label="main mailbox folders">
            <List>
                <ListItem>
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
                <ListItem >
                    <NavLink style={stylingFunc} replace  to="/analytics">
                        <ListItemButton>
                            <ListItemIcon>
                                <InsertChart />
                            </ListItemIcon>
                            <ListItemText primary="Analytics" />
                            
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                <ListItem>
                    <NavLink style={stylingFunc} replace  to="/settings">
                        <ListItemButton color='initial'>
                            <ListItemIcon color='initial'>
                                <Settings sx={{color: 'inherit'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                <ListItem>
                    <NavLink style={stylingFunc} replace color={'inherit'} to="/community">
                        <ListItemButton>
                            <ListItemIcon>
                                <Language sx={{color: 'inherit'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Community" />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
            </List>
        </nav>
    </Box>
  );
}