import NavigationIndex from '../components/Navigation';
import SideNavigation from '../components/SideNavigation';
import { Grid } from '@mui/material';
function InvoicesPage() {
    return (
        <Grid container spacing={2}>
            <Grid style={{height: '100vh', background: '#040273'}} item xs={2.5}>
                <SideNavigation/>
            </Grid>
            <Grid item xs={9}>
                <NavigationIndex/>
                <Grid>
                    <h1>Invoices Page</h1>
                </Grid>
            </Grid> 
        </Grid>
    );
}

export default InvoicesPage;