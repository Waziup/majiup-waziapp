import { Grid } from '@mui/material';
import NavigationIndex from '../Navigation';
import SideNavigation from '../SideNavigation';
import { Outlet } from 'react-router-dom';
function LayoutComponent() {
    return (
        <Grid container style={{background: '#F6F6F6'}} spacing={2}>
            <Grid item  xs={12} >
                <NavigationIndex />
            </Grid>
            <Grid container spacing={2}>       
                <Grid item xs={2.5}>
                    <SideNavigation />
                </Grid>
                <Grid style={{margin: '10px'}} item xs={9}>
                    <Outlet />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default LayoutComponent;