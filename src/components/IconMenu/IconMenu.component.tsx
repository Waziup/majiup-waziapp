import {
  Menu,
  Divider,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Box,
} from "@mui/material";
import { Launch, Logout, AccountCircle } from "@mui/icons-material";
import { useContext } from "react";
import { DevicesContext } from "../../context/devices.context";
import { Link, useNavigate } from "react-router-dom";
import Fade from "@mui/material/Fade";
import { Message } from "@mui/icons-material";
// import { markMessageAsRead } from '../../utils/consumptionHelper';
import { NotificationsNone } from "@mui/icons-material";
interface Props {
  isOpen: boolean;
  anchorEl: null | HTMLElement;
  handleClose: () => void;
}
export default function IconMenuComponent({
  isOpen,
  anchorEl,
  handleClose,
}: Props) {
  const { setUser, devices } = useContext(DevicesContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser("", "");
    navigate("/");
    handleClose();
  };
  // async function handleReadNotification(deviceId: string,messageId: string){
  //     const response = await markMessageAsRead(deviceId,devices,messageId);
  //     console.log('Response for read message', response)
  // }
  return (
    <Menu
      TransitionComponent={Fade}
      onClose={handleClose}
      anchorEl={anchorEl}
      MenuListProps={{
        "aria-labelledby": "fade-button",
      }}
      sx={{ width: 400, maxWidth: "100%", borderRadius: 0 }}
      open={isOpen}
    >
      {/* <MenuItem onClick={handleClose}>
        <ListItemIcon color="#000">
          <AccountCircle fontSize="small" />
        </ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </MenuItem> */}
      <MenuItem onClick={handleClose}>
        <Link
          style={{ textDecoration: "none", display: "flex" }}
          target="_blank"
          to="http://wazigate.local/"
        >
          <ListItemIcon>
            <Launch fontSize="small" />
          </ListItemIcon>
          <ListItemText>Wazigate</ListItemText>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <ListItemIcon>
            <Message fontSize="small" />
          </ListItemIcon>
          <ListItemText>Notifications</ListItemText>
        </div>
      </MenuItem>
      <div
        style={{
          fontSize: 14,
          borderTop: "1px solid black",
          minWidth: "20rem",
          maxWidth: "20rem",
          padding: "2px",
          wordSpacing: "2px",
          maxHeight: 350,
          overflowY: "scroll",
        }}
      >
        {devices.length > 0 ? (
          devices.map((dev) => {
            if (dev.notifications) {
              const notifications = [
                ...dev.meta.notifications.messages,
              ].reverse();

              return notifications.map((notification, i) => {
                // const date = notification.time
                const dateObj = new Date(notification.time);
                const currentDate = new Date();

                // Define an array of month names
                const monthNames = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ];

                // Format the time as HH:mm
                const formattedTime = dateObj.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                });

                // Calculate the time difference in milliseconds
                const timeDifference =
                  currentDate.getTime() - dateObj.getTime();

                // Function to check if the difference is greater than a month
                function isGreaterThanAMonth(timeDiff: any) {
                  const millisecondsPerMonth = 30 * 24 * 60 * 60 * 1000;
                  return timeDiff > millisecondsPerMonth;
                }

                // Function to check if the difference is greater than a year
                function isGreaterThanAYear(timeDiff: any) {
                  const millisecondsPerYear = 365 * 24 * 60 * 60 * 1000;
                  return timeDiff > millisecondsPerYear;
                }

                // Format the date with or without the year
                let formattedDate;
                if (isGreaterThanAYear(timeDifference)) {
                  formattedDate = `
                                    ${monthNames[dateObj.getMonth()]}
                                    ${dateObj.getFullYear()}
                                `;
                } else if (isGreaterThanAMonth(timeDifference)) {
                  formattedDate = `
                                    ${monthNames[dateObj.getMonth()]}
                                `;
                } else {
                  formattedDate = `
                                    ${dateObj.toLocaleString("en-US", {
                                      weekday: "short",
                                    })}
                                    ${monthNames[dateObj.getMonth()]}
                                `;
                }

                // Combine the time and date
                const formattedDateTime = `${formattedTime}, ${formattedDate}`;

                return (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      minWidth: "100%",
                      overflow: "hidden",
                      borderBottom: "solid 1px gray",
                    }}
                  >
                    <NotificationsNone sx={{ color: "#E46B26" }} />
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        padding: "9px",
                        justifyContent: "space-between",
                        alignItems: "centre",
                        lineHeight: 1.6,
                        marginBottom: "2px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "5px",
                        }}
                      >
                        <strong>{notification.tank_name}</strong>
                        <article>{formattedDateTime}</article>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "5px",
                        }}
                      >
                        <article>{notification.message}</article>
                        {/* {
                                                    !notification.read_status?
                                                    <article style={{color:'#E46B26', cursor:'pointer', fontSize:12, width:'fit-content'}}>Mark as Read</article>:''
                                                } */}
                      </div>
                    </Box>
                  </Box>
                  // <Box key={i} sx={{display: 'flex',padding: '9px', justifyContent: 'space-between', alignItems: 'centre'}}>
                  //     <span key={i} style={{marginRight: 5}}>{not.message}</span>
                  //     {
                  //         !not.read_status&&(
                  //             <span onClick={()=>handleReadNotification(dev.id,not.id)} style={{marginLeft: 5,cursor: 'pointer', color: 'blue'}}>{not.read_status?'':'MARK AS READ'}</span>
                  //         )
                  //     }
                  // </Box>
                );
              });
            }
            return null;
          })
        ) : (
          <p>No notifications</p>
        )}
      </div>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );
}
