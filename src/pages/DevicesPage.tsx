import { useLocation } from "react-router-dom";
import TankDetailComponent from "../components/TankDetail/TankDetail.component";
import { Box } from "@mui/material";
import { DevicesContext } from "../context/devices.context";
import { useContext } from "react";
import { X as Device } from "../context/devices.context";
import axios from "axios";

function DevicesPage() {
  const { devices } = useContext(DevicesContext);
  const data = useLocation();
  const tdsValue = data.state.tds;
  async function toogleActuatorHandler(id: string) {
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
        .catch(() => {
          return true;
        });
    }
    return false;
  }
  return (
    <Box
      pl={3}
      pr={1}
      sx={
        {
          // minHeight: "105vh",
        }
      }
    >
      {/*   */}
      <TankDetailComponent
        liters={data.state.liters}
        on={data.state.on}
        owner={data.state.name}
        waterQuality={tdsValue}
        waterTemp={data.state.temp}
        actuator={data.state.actuators}
        consumption={data.state.consumption}
        height={data.state.height}
        capacity={data.state.capacity}
        id={data.state.id}
        toggleActuator={toogleActuatorHandler}
        receiveNotifications={data.state.meta.receiveNotifications ?? false}
      />
    </Box>
  );
}

export default DevicesPage;
