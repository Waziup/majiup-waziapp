import { Box, Grid, } from "@mui/material";
import SideNavigation from "../SideNavigation";
import NavigationIndex from "../Navigation";
import { useState } from "react";
import ItemCardComponent from "../ItemCard/ItemCard.component";
function GridComponent() {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Grid container spacing={2}>
            <Grid className="side_nav_container" item  xs={2.5} >
                <SideNavigation />
            </Grid>
            <Grid item xs={9}>
                <NavigationIndex />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box sx={{ bgcolor: "#fff", borderRadius: "10px" }}>
                            <ItemCardComponent
                                amount={75}
                                owner="NGO Tank"
                                litresPercent={75}
                                handleClose={handleClose}
                                handleOpen={handleOpen}
                                open={open}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ bgcolor: "#fff", borderRadius: "10px" }}>
                            <ItemCardComponent
                                amount={50}
                                owner="KISUMU Polytechnic"
                                litresPercent={50}
                                handleClose={handleClose}
                                handleOpen={handleOpen}
                                open={open}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default GridComponent;
