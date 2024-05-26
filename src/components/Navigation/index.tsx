import * as React from "react";
import { Box } from "@mui/material";
import SearchComponent from "./Search.component";
import { WaterDrop, NotificationsNone, Search } from "@mui/icons-material";
import ArrowDropDownSVG from "../../assets/arrow_drop_down.svg";
import { useContext } from "react";
import { DevicesContext } from "../../context/devices.context";
import IconMenuComponent from "../IconMenu/IconMenu.component";
import { redirect } from "react-router-dom";
import AvatarComponent from "../AvatarComponent/Avatar.component";
import logo from "../../assets/imgs/logo.png";

type Props = {
  matches: boolean;
};
function NavigationIndex({ matches }: Props) {
  const { user, devices, toggleModal } = useContext(DevicesContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    if (!user) {
      setAnchorEl(null);
      redirect("/");
      return;
    }
  }, [user]);
  const totalNotifications =
    devices.length > 0
      ? devices.reduce((acc, dev) => {
          if (dev.notifications) {
            // console.log('notification',dev.notifications)
            return acc + dev.meta.notifications.messages.length;
          }
          return acc;
        }, 0)
      : 0;
  return (
    <Box
      sx={{
        padding: "10px 0",
        bgcolor: "#fff",
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Box>
          <img
            style={{ width: "3rem", aspectRatio: "1" }}
            src={logo}
            alt="Majiup Logo"
          />
        </Box>
        {/* <WaterDrop style={{ fontSize: "calc(20px + 1vw)", color: "#4592F6" }} /> */}
        <h1 style={{ fontSize: "calc(20px + 1vw)", fontWeight: "normal" }}>
          Majiup
        </h1>
      </Box>
      {matches && (
        <Box sx={matches ? { width: "60%" } : { width: "60%" }}>
          <SearchComponent />
        </Box>
      )}
      {!matches && (
        <Box sx={{ flexDirection: "row", display: "flex" }}>
          <Search
            style={{ color: "black", cursor: "pointer", marginRight: "10px" }}
          />
          <h3
            onClick={toggleModal}
            style={{ marginRight: 10, cursor: "pointer" }}
          >
            &#x2630;
          </h3>
        </Box>
      )}
      {matches && (
        <>
          <Box
            onClick={isOpen ? handleClose : handleClick}
            sx={{
              display: "flex",
              width: "20%",
              height: "100%",
              cursor: "pointer",
              ":hover": { bgcolor: "#f5f5f5" },
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <NotificationsNone
                sx={{ fontWeight: "light", fontSize: "28px", color: "#000" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                  bgcolor: "#4592F6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {totalNotifications}
              </Box>
            </Box>
            <Box
              mr={2}
              sx={{
                display: "flex",
                width: "100%",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "space-evenly",
                height: "100%",
              }}
            >
              <AvatarComponent
                name={user.name}
                src='"https://mui.com/static/images/avatar/1.jpg"'
              />
              <p style={{ fontSize: "15px", fontWeight: "normal" }}>Wazigate</p>
              <Box component="img" src={ArrowDropDownSVG} />
            </Box>
          </Box>
          <IconMenuComponent
            anchorEl={anchorEl}
            isOpen={isOpen}
            handleClose={handleClose}
          />
        </>
      )}
    </Box>
  );
}

export default NavigationIndex;
