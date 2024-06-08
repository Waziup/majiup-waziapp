import { Box, Grid, Stack } from "@mui/material";
import SideNavigation from "../SideNavigation";
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
import {
  //   DeviceThermostatSharp,
  MoreVert,
  WaterDrop,
} from "@mui/icons-material";
import WatertankComponent from "../WaterTank/Watertank.component";
import axios from "axios";
import {
  getLiters,
  // postNewNotificationMessage,
} from "../../utils/consumptionHelper";
import Copilot from "../copilot/copilot.component";
import { formatTime } from "../../utils/timeFormatter";
import { TbAlertHexagon } from "react-icons/tb";

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
const TankDetails = {
  padding: "14px 24px",
  margin: "7px 0px",
  width: "inherit",
  borderRadius: "10px",
  // boxShadow: "1px 1px 4px  rgba(0, 0, 0, 0.15)",
  display: "flex",
  gap: "2rem",
  justifyContent: "space-between",
  flexWrap: "wrap",
};

function GridComponent() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    isOpenNav,
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
  if (loading) {
    return (
      <Grid container style={{ background: "#F6F6F6" }} spacing={2}>
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
              xs={matches ? 2.5 : 9}
            >
              <SideNavigation matches={matches} />
            </Grid>
          )}
          <Grid
            ml={!matches ? 3 : 0}
            mr={!matches ? 2 : 0}
            item
            xs={matches ? 6 : 12}
          >
            <article>Loading...</article>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  return (
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
          {devices.length <= 0 ? (
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
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      padding: "10px",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      width: "90%",
                      transition: ".5s",
                    }}
                  >
                    <p
                      style={{
                        display: "inline-flex",
                        padding: 2,
                        alignItems: "center",
                      }}
                    >
                      {tank.name ?? "Tank"}
                    </p>
                    <h3
                      style={
                        tank.on
                          ? { fontSize: "16px", color: "#85ea2d" }
                          : { fontSize: "16px", color: "#888992" }
                      }
                    >
                      {tank.on ? "Active" : "Inactive"}
                    </h3>
                    <MoreVert sx={{ fontSize: 25, color: "#4592F6" }} />
                  </Box>
                  <WatertankComponent
                    percentage={Math.round((tank.liters / tank.capacity) * 100)}
                    waterQuality={tank.tds}
                    consumption={selectedDevice?.consumption}
                  />
                  {tank.consumption && (
                    <Box sx={TankDetails}>
                      <p
                        style={{
                          fontSize: "16px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <WaterDrop style={{ fontSize: 18, color: "#4592F6" }} />
                        Water Amount
                      </p>
                      <p style={{ fontSize: "24px" }}>{tank.liters} Liters</p>
                    </Box>
                  )}
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
