import { Box, CircularProgress, Grid } from "@mui/material";
// import SideNavigation from "../SideNavigation";
// import NavigationIndex from "../Navigation";
import ItemCardComponent from "../ItemCard/ItemCard.component";
import { useContext, useState } from "react";
import TankDetailComponent from "../TankDetail/TankDetail.component";
import { useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { X as Device, client, Sensor } from "../../context/devices.context";
import "./Grid.styles.css";
import { DevicesContext } from "../../context/devices.context";
import FrameSVG from "../../assets/frame.svg";
import //   DeviceThermostatSharp,
// MoreVert,
// WaterDrop,
"@mui/icons-material";
// import WatertankComponent from "../WaterTank/Watertank.component";
import axios from "axios";
import {
  getLiters,
  // postNewNotificationMessage,
} from "../../utils/consumptionHelper";
// import Copilot from "../copilot/copilot.component";
import { formatTime, getLastSeen } from "../../utils/timeFormatter";
// import { TbAlertHexagon } from "react-icons/tb";
const BoxStyle = {
  bgcolor: "#fff",
  borderRadius: "10px",
  margin: "10px 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "inherit",
  width: "100%",
};
// const TankDetails = {
//   padding: "14px 24px",
//   margin: "7px 0px",
//   width: "inherit",
//   borderRadius: "10px",
//   // boxShadow: "1px 1px 4px  rgba(0, 0, 0, 0.15)",
//   display: "flex",
//   justifyContent: "space-between",
// };

function GridComponent() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    // isOpenNav,
    loading,
    devices,
    setTanks,
    setSelectedDevice,
    selectedDevice,
  } = useContext(DevicesContext);
  const navigate = useNavigate();

  client.on("message", (topic, message) => {
    const topicArr = topic.split("/");
    // console.log('message received', topicArr.includes('sensors'), message.toString())
    if (topicArr.includes("sensors") && devices.length > 0) {
      // const arr = topic.split('/');
      // console.log(filteredDevices);
      const val: { value: string } = JSON.parse(message.toString());
      const device = devices.find(
        (device: Device) => device.id === topicArr[1]
      );
      if (device) {
        const sensorV = device.sensors.find(
          (sensor: Sensor) => sensor.id === topicArr[3]
        );
        if (
          sensorV &&
          sensorV.meta.kind.toLowerCase().includes("WaterLevel".toLowerCase())
        ) {
          const liters = getLiters(
            val.value,
            device.meta.settings.height,
            device.meta.settings.capacity
          );
          device.liters = liters;
          device.on = true;
          const date = formatTime(new Date());

          device.consumption.push({
            x: date,
            y: liters,
          });

          setTanks([...devices]);

          const maxSensor = sensorV.meta.critical_max;
          const minSensor = sensorV.meta.critical_min;
          // const pumpStatus = device.actuators[0].value;

          // Generate notifiction for extreme water levels
          if (liters >= maxSensor) {
            // If pump is on
            // const pumpStatus = device.actuators[0].value;
            // if (pumpStatus === true) {
            //   postNewNotificationMessage(
            //     device.id,
            //     devices,
            //     `Tank almost full, turning pump OFF`,
            //     "HIGH"
            //   );
            //   toogleActuatorHandler(device.id);
            //   return;
            // }
          } else if (liters <= minSensor) {
            // If pump is off
            // if (pumpStatus === false) {
            //   postNewNotificationMessage(
            //     device.id,
            //     devices,
            //     `Tank almost empty, turning pump ON`,
            //     "HIGH"
            //   );
            //   toogleActuatorHandler(device.id);
            //   return;
            // }
          }
        }
        //  else if (
        //   sensorV &&
        //   sensorV.meta.kind
        //     .toLowerCase()
        //     .includes("WaterPollutantSensor".toLowerCase())
        // ) {
        //   device.on = true;
        //   setTanks([...devices]);
        //   const maxSensor = sensorV.meta.critical_max;

        //   if (parseInt(message.toString()) >= maxSensor) {
        //     postNewNotificationMessage(
        //       device.id,
        //       devices,
        //       `Poor water quality detected`,
        //       "HIGH"
        //     );
        //     return;
        //   }
        // } else if (
        //   sensorV &&
        //   sensorV.meta.kind
        //     .toLowerCase()
        //     .includes("WaterThermometer".toLowerCase())
        // ) {
        //   // console.log('Water thermometer');
        //   device.temp = parseInt(message.toString());
        //   // device.modified = new Date().toISOString();
        //   device.on = true;

        //   setTanks([...devices]);

        //   const maxSensor = sensorV.meta.critical_max;
        //   const minSensor = sensorV.meta.critical_min;

        //   if (parseInt(message.toString()) >= maxSensor) {
        //     postNewNotificationMessage(
        //       device.id,
        //       devices,
        //       `Extreme hot temperatures`,
        //       "HIGH"
        //     );
        //     return;
        //   } else if (parseInt(message.toString()) <= minSensor) {
        //     postNewNotificationMessage(
        //       device.id,
        //       devices,
        //       `Extreme cold temperatures`,
        //       "HIGH"
        //     );
        //     return;
        //   }
        // }
        else {
          device.on = true;
          return;
        }
        return;
      }
    } else if (topic.toLowerCase().includes("meta")) {
      const device = devices.find(
        (device: Device) => device.id === topic.split("/")[1]
      );
      if (device) {
        const metaField = {
          ...device.meta,
          ...JSON.parse(message.toString()),
        };
        device.meta = metaField;
        setTanks([...devices]);
      }
      // navigate('/dashboard');
    } else if (topic.toLowerCase().includes("actuators")) {
      const device = devices.find(
        (device: Device) => device.id === topic.split("/")[1]
      );
      const pumpStatus = message.toString();
      if (device) {
        // device.on = true;
        device.actuators[0].value = Boolean(pumpStatus);
        setTanks([...devices]);
      }
    }
  });
  const handleSelectedTank = (tank: Device) => {
    const newTanks = devices.map((item: Device) => {
      if (item.name === tank.name) {
        item.isSelect = true;
      } else {
        item.isSelect = false;
      }
      return item;
    });
    if (!matches) {
      setTanks(newTanks);
      navigate(`/devices/${tank.id}`, {
        state: tank,
      });
      return;
    }
    setTanks(newTanks);
    // setSelectedTank(tank);
    setSelectedDevice(tank);
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  async function toogleActuatorHandler(id: string): Promise<boolean> {
    let currentValue: boolean;
    const tank = devices.find((item: Device) => item.id === id);
    if (tank) {
      currentValue = tank.actuators[0].value === true ? false : true;
      await axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/tanks/${id}/pumps/state`,
          {
            value: currentValue,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return true;
        });
    }
    return false;
  }

  return loading ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  ) : (
    <Grid
      // overflow={"hidden"}
      height={"100dvh"}
      container
      style={{ background: "#F6F6F6" }}
      spacing={2}
    >
      <Grid container spacing={2}>
        <Grid
          style={{
            position: "relative",
            display: "flex",
            marginLeft: `${matches ? "0" : "2rem"}`,
            gap: `${matches ? "0" : "1rem"}`,
            marginTop: "1rem",
            alignItems: "center",
            flexDirection: "column",
          }}
          item
          xs={12}
          md={3}
        >
          {devices.length <= 0 && loading ? (
            <Box
              sx={{
                position: "relative",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "15px",
                    textAlign: "center",
                    margin: "10px 0",
                  }}
                >
                  Hi there, No tanks found!
                </h3>
                <Box component="img" src={FrameSVG} />
                <p
                  style={{
                    color: "#888992",
                    fontWeight: "600",
                    textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  No tanks found, create one.
                </p>
              </Box>
            </Box>
          ) : (
            devices.map((tank, i: number) =>
              matches ? (
                <Box
                  key={i}
                  onClick={() => handleSelectedTank(tank)}
                  sx={[
                    BoxStyle,
                    tank.isSelect
                      ? { bgcolor: "#FFE6D9" }
                      : { bgcolor: "#fff" },
                  ]}
                >
                  <ItemCardComponent
                    isOn={tank.on}
                    amount={tank.liters}
                    name={tank.name ?? "Tank"}
                    litresPercent={(tank.liters / tank.capacity) * 100}
                    handleClose={handleClose}
                    handleOpen={handleOpen}
                    open={open}
                    temp={tank.temp}
                    modified={
                      tank.sensors?.find((sensor: Sensor) =>
                        sensor.meta.kind.toLowerCase().includes("waterlevel")
                      )?.time
                    }
                  />
                </Box>
              ) : (
                <Box
                  key={i}
                  onClick={() => handleSelectedTank(tank)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    // bgcolor: tank.isSelect ? "#FFE6D9" : "#fff",
                    boxShadow: "1px 1px 4px  rgba(0, 0, 0, 0.15)",
                    cursor: "pointer",
                    position: "relative",
                    width: "95%",
                    paddingBottom: `${!tank.consumption && "1rem"}`,
                    borderRadius: "4px",
                    gap: "4px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      width: "100%",
                      transition: ".5s",
                      padding: 1,
                      backgroundColor: "#fff",
                    }}
                  >
                    <p
                      style={{
                        display: "inline-flex",
                        padding: 2,
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {tank.name ?? "Tank"}
                    </p>
                    {/* <h3
                      style={
                        tank.on
                          ? { fontSize: "16px", color: "#85ea2d" }
                          : { fontSize: "16px", color: "#888992" }
                      }
                    >
                      {tank.on ? "Active" : "Inactive"}
                    </h3> */}
                    {!tank.on && tank.consumption && (
                      <small>
                        Last seen{" "}
                        {getLastSeen(
                          tank?.sensors?.find(
                            (sensor) => sensor.meta.kind === "WaterLevel"
                          )?.modified
                        )}
                      </small>
                    )}
                    <div
                      style={{
                        width: "8px",
                        aspectRatio: 1,
                        backgroundColor: tank.on ? "#85ea2d" : "orangered",
                        zIndex: 1,
                        borderRadius: "50%",
                      }}
                    ></div>
                  </Box>
                  {tank.consumption ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        float: "",
                        padding: 1,
                        paddingTop: 0,
                      }}
                    >
                      <Box>
                        <h1
                          style={{
                            fontWeight: 400,
                            color: `${
                              tank.sensors &&
                              Math.round((tank.liters / tank.capacity) * 100) <=
                                tank?.sensors?.find(
                                  (sensor) => sensor.meta.kind === "WaterLevel"
                                )?.meta.critical_min
                                ? "orange"
                                : ""
                            }`,
                          }}
                        >
                          {Math.round((tank.liters / tank.capacity) * 100)}%
                        </h1>
                        <small>{tank.liters} Liters</small>
                      </Box>
                      <Box>
                        <h1 style={{ fontWeight: 400 }}>
                          {(tank.analytics?.average?.daily).toFixed(0)} Ltrs
                        </h1>
                        <small>Average daily usage</small>
                      </Box>
                      <Box
                        sx={{
                          color: `${
                            tank?.analytics?.durationLeft &&
                            tank?.analytics?.durationLeft < 3
                              ? "orange"
                              : ""
                          }`,
                        }}
                      >
                        <h1
                          style={{
                            fontWeight: 400,
                          }}
                        >
                          {tank?.analytics.durationLeft.toFixed(0)}{" "}
                        </h1>
                        <small>
                          {tank?.analytics?.durationLeft &&
                          tank?.analytics?.durationLeft > 1
                            ? "Days left"
                            : "Day left"}
                        </small>
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                        gap: "8px",
                        padding: 1,
                      }}
                    >
                      <article style={{ color: "orangered" }}>
                        Tank setup incomplete
                      </article>
                    </Box>
                  )}
                  {/* {matches ? (
                    <WatertankComponent
                      percentage={Math.round(
                        (tank.liters / tank.capacity) * 100
                      )}
                      waterQuality={tank.tds}
                      consumption={selectedDevice?.consumption}
                    />
                  ) : (
                    <Box></Box>
                  )} */}
                </Box>
              )
            )
          )}
        </Grid>
        {matches && (
          <Grid
            // overflow={"auto"}
            // height={"100dvh"}
            item
            style={{
              position: "relative",
            }}
            xs={9}
          >
            {selectedDevice && (
              <TankDetailComponent
                id={selectedDevice.id}
                owner={selectedDevice.name ?? "Tank"}
                waterTemp={selectedDevice.temp}
                waterQuality={selectedDevice.tds}
                liters={selectedDevice.liters}
                on={selectedDevice.on ?? false}
                consumption={selectedDevice.consumption}
                actuator={selectedDevice.actuators}
                height={selectedDevice.height}
                capacity={selectedDevice.capacity}
                toggleActuator={toogleActuatorHandler}
                receiveNotifications={selectedDevice.meta.receivenotifications}
              />
            )}
          </Grid>
        )}
      </Grid>
      {/* <Copilot /> */}
    </Grid>
  );
}
export default GridComponent;
