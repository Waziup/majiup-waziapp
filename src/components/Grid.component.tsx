import {Box, Grid} from '@mui/material'
import SideNavigation from './SideNavigation';
import NavigationIndex from './Navigation';
const ItemCard = () => {
    return (
        <Box>
            <h1>Oliver</h1>
        </Box>
    );
};

function GridComponent() {
    return (
        <Grid container  spacing={2}>
            <Grid style={{height: '100vh', background: 'rgb(0, 30, 60)'}} item xs={2.5}>
                <SideNavigation/>
            </Grid>
            <Grid item xs={9} >
                <NavigationIndex/>
                <Grid container  spacing={2}>
                    <Grid item xs={6}>
                        <Box sx={{bgcolor: '#ccc'}}>
                            <ItemCard/>
                            <ItemCard/>
                            <ItemCard/>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{bgcolor: '#ccc'}}>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default GridComponent;