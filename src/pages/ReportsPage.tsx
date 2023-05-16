import NavigationIndex from '../components/Navigation';
import SideNavigation from '../components/SideNavigation';
import { Grid } from '@mui/material';
function ReportsPage() {
    return (
        <Grid container spacing={2}>
            <Grid style={{height: '100vh', background: '#1A73E8'}} item xs={2.5}>
                <SideNavigation/>
            </Grid>
            <Grid item xs={9}>
                <NavigationIndex/>
                <Grid>
                    <h1>Reports Page</h1>
                </Grid>
            </Grid> 
        </Grid>
    );
}

export default ReportsPage;