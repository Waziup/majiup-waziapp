import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { SettingsAccessibilityOutlined, Home } from '@mui/icons-material';
import { Logout } from '@mui/icons-material';
import { Report, WaterDrop, Money, Settings, Notes } from '@mui/icons-material';
import { Link } from '@mui/material';
export default function SideNavigation() {
  return (
    <Box sx={{ width: '100%', height: '110%', 
            maxWidth: 360, 
            color: 'white', 
            display: 'flex', flexDirection: 'column', 
            justifyContent: 'space-around',
            marginLeft: '2vw',
         }}>
        <Box>
            <Box sx={{ display:'flex', alignItems:'center', width: '100%', color: 'white' }}>
                <h1>MajiUp</h1>
                <WaterDrop style={{fontSize: 40}}/>
            </Box>
        </Box>
        <nav aria-label="main mailbox folders">
            <List>
                <ListItem disablePadding>
                    <Link style={{textDecoration: 'none', width: '80%'}} color={'inherit'} href="/dashboard">
                        <ListItemButton>
                            <ListItemIcon>
                                <Home sx={{color: 'white'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Dashboards" />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link style={{textDecoration: 'none',width: '80%'}} color={'inherit'} href="/reports">
                        <ListItemButton>
                            <ListItemIcon>
                                <Report sx={{color: 'white'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Reports" />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link style={{textDecoration: 'none',width: '80%'}} color={'inherit'} href="/products">
                        <ListItemButton>
                            <ListItemIcon>
                                <SettingsAccessibilityOutlined sx={{color: 'white'}} />
                            </ListItemIcon>
                            <ListItemText primary="Products" />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link style={{textDecoration: 'none',width: '80%'}} color={'inherit'} href="/billings">
                        <ListItemButton>
                            <ListItemIcon>
                                <Money sx={{color: 'white'}} />
                            </ListItemIcon>
                            <ListItemText primary="Billings" />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link style={{textDecoration: 'none',width: '80%'}} color={'inherit'} href="/invoices">
                        <ListItemButton>
                            <ListItemIcon>
                                <Notes sx={{color: 'white'}} />
                            </ListItemIcon>
                            <ListItemText primary="Invoices" />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link style={{textDecoration: 'none',width: '80%'}} color={'inherit'} href="/settings">
                        <ListItemButton>
                            <ListItemIcon>
                                <Settings sx={{color: 'white'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
        </nav>
        <Box>
            <Divider sx={{bgcolor: 'white'}} />
            <nav aria-label="secondary mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Logout sx={{color: 'white'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    </Box>
  );
}