import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import NavigationIndex from "../Navigation";
import SideNavigation from "../SideNavigation";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { DevicesContext } from "../../context/devices.context";
function LayoutComponent() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const { isOpenNav } = useContext(DevicesContext);
  return (
    <Grid
      overflow={"hidden"}
      height={"100vh"}
      container
      sx={{
        background: "#F6F6F6",
        scrollbarWidth: ".5rem",
        "::-webkit-slider-thumb": { backgroundColor: "transparent" },
      }}
      spacing={2}
    >
      <Grid item xs={12} sx={{ zIndex: 1 }}>
        <NavigationIndex matches={matches} />
      </Grid>
      <Grid container spacing={2}>
        {isOpenNav && !matches && (
          <Box
            sx={{
              position: "absolute",
              height: "100vh",
              width: "110vw",
              bgcolor: "rgba(0,0,0,.25)",
            }}
          ></Box>
        )}
        {(matches || isOpenNav) && (
          <Grid
            sx={
              !matches
                ? {
                    zIndex: 6,
                    position: "absolute",
                    bgcolor: "#fff",
                    transition: 0.5,
                    width: "500px",
                    height: "95vh",
                    mt: 2,
                  }
                : {}
            }
            item
            xs={matches ? 2 : 9}
          >
            <SideNavigation matches={matches} />
          </Grid>
        )}
        <Grid
          style={{ marginTop: "18px" }}
          overflow={"auto"}
          height={"100vh"}
          md={9.9}
          item
          xs={matches ? 9.9 : 12}
        >
          <Outlet context={[matches]} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LayoutComponent;
