import { Stack, Box, styled, Switch } from "@mui/material";
import {
  FireHydrantAlt,
  WaterDrop,
  // DeviceThermostatSharp,
  // AutoAwesome,
  // DeviceThermostat,
  Opacity,
} from "@mui/icons-material";
import WatertankComponent from "../WaterTank/Watertank.component";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useContext, useEffect, useState } from "react";
// import MapComponent from "../MapComponent/Map.component";
import FrameSVG from "../../assets/not-found.svg";
import { Actuator, DevicesContext, X } from "../../context/devices.context";
// import axios from "axios";
import { PiWarningOctagonLight } from "react-icons/pi";
import { FaTruckDroplet } from "react-icons/fa6";

type Consumption = {
  x: number;
  y: number;
};
import Chart from "react-apexcharts";
import { postNewNotificationMessage } from "../../utils/consumptionHelper";

import supabase from "../../config/supabaseClient";

type Props = {
  owner: string;
  liters: number;
  waterTemp: number;
  waterQuality: string;
  on: boolean;
  consumption: Consumption[];
  actuator?: Actuator[];
  height: number;
  capacity: number;
  toggleActuator?: (id: string) => Promise<boolean>;
  id: string;
  receiveNotifications: boolean;
};

export const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  bgcolor: "#FF5C00",

  ".MuiSwitch-checked": {
    bgcolor: "#FF5C00",
  },
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.secondary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const BoxStyle: React.CSSProperties = {
  borderRadius: "10px",
  margin: "10px 0",
  position: "relative",
};

const TankDetails: React.CSSProperties = {
  padding: "20px",
  margin: "7px 0",
  width: "100%",
  borderRadius: "10px",
  boxShadow: "1px 1px 4px  rgba(0, 0, 0, 0.15)",
  display: "flex",
  justifyContent: "space-around",
};

function TankDetailComponent({
  id,
  capacity,
  receiveNotifications,
  waterTemp,
  waterQuality,
  liters,
  consumption,
  actuator,
  toggleActuator,
}: Props) {
  // const [toggleHot, setToggleHot] = useState(false);
  const [temperatureConsumption, setTemperatureConsumption] = useState<
    Consumption[]
  >([]);
  const [pumpStatus, setPumpStatus] = useState(false);
  const { devices } = useContext(DevicesContext);
  const device = devices.find((device: X) => device.id === id);

  // console.log("Supabase: ", supabase);

  // const [isalert, setAlert] = useState(false);

  const apexChartOptions = {
    series: [
      {
        name: "Water Consumption",
        data: temperatureConsumption?.map((item) => item.y),
        type: "area",
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "rangeArea",
        zoom: {
          enabled: true,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#FF0000"],

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: temperatureConsumption?.map((item) => item.x),
        tickAmount: 10,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
        },
      },
    },
  };

  async function switchActuator() {
    if (actuator && toggleActuator) {
      await toggleActuator(id);
      const pumpUpdate = !pumpStatus;
      setPumpStatus(pumpUpdate);
      if (pumpUpdate === true) {
        postNewNotificationMessage(id, devices, `Pump turned ON!`, "LOW");
        alert(`Pump turned ON! Tank, ${device?.name}`);
      } else if (pumpUpdate === false) {
        postNewNotificationMessage(id, devices, `Pump turned OFF!`, "LOW");
        alert(`Pump turned OFF! Tank, ${device?.name}`);
      }
    }
  }

  // useEffect(()=>{
  //     const checPump = (async ()=>{
  //         const alert = await checkForAlert(id,height,devices,maxalert,minalert);
  //         setAlert(alert);
  //     })
  //     checPump();
  // },[devices,minalert,maxalert,height,id])

  useEffect(() => {
    const actuatorValue = actuator !== undefined ? actuator[0]?.value : false;
    return actuatorValue === false ? setPumpStatus(false) : setPumpStatus(true);
  }, [actuator]);

  useEffect(() => {
    setTemperatureConsumption(consumption);
  }, [consumption]);

  // async function runFetch() {
  //   const temperatureConsumptionVal = await axios
  //     .get(
  //       `${
  //         import.meta.env.VITE_BACKEND_URL
  //       }/tanks/${id}/tank-sensors/water-temperature/values`,
  //       {
  //         headers: {
  //           Accept: "application/json",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //       const plotVals = response.data.map((val: { time: any; value: any }) => {
  //         const date = new Date(val.time);
  //         const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  //         const dayOfWeek = daysOfWeek[date.getUTCDay()];

  //         const hours = String(date.getUTCHours()).padStart(2, "0");

  //         const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  //         return {
  //           x: `${dayOfWeek}, ${hours}:${minutes}`,
  //           y: val.value,
  //         };
  //       });

  //       return plotVals;
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });

  //   setTemperatureConsumption(temperatureConsumptionVal);
  // }
  // useEffect(() => {
  //   if (toggleHot) {
  //     runFetch();
  //   } else {
  //     setTemperatureConsumption(consumption);
  //   }
  // }, [toggleHot]);

  // function handleToggleTeemp() {
  //   setToggleHot(!toggleHot);
  // }

  const [sendingReq, setSendingReq] = useState(false);

  interface RefillType {
    amount?: number;
    amount_liters?: number;
    created_at?: any;
    id?: string;
    location?: {
      lat: number;
      lng: number;
    };
    owner?: any;
    status?: string;
    tank_capacity?: number;
    tank_id?: any;
    tank_info?: any;
    tank_name?: string;
    confirmed?: boolean;
    vendor?: any;
  }

  const createRefill = async (tankDetails: any) => {
    try {
      setSendingReq(true);
      const { data, error } = await supabase
        .from("refills")
        .insert({
          tank_id: tankDetails.id,
          tank_capacity: tankDetails.capacity,
          current_amount: tankDetails.liters,
          amount_liters: tankDetails.capacity - tankDetails.liters,
          tank_name: tankDetails.name,
          owner: "Josee",
          amount_ksh: tankDetails.capacity - tankDetails.liters * 0.4,
          location: {
            lat: -1.252535,
            lng: 36.686418,
          },
          status: "In Progress",
          confirmed: false,
          vendor: null,
        })
        .select()
        .single();
      if (data) {
        setRefill((prev) => {
          return {
            ...prev,
            status: data.status,
          };
        });
      } else {
        console.log(error);
      }
    } catch (err) {
    } finally {
      setSendingReq(false);
    }
  };

  const [refill, setRefill] = useState<RefillType>({});

  const getRefill = async (tankID: string) => {
    try {
      const { data } = await supabase
        .from("refills")
        .select("*")
        .eq("tank_id", tankID)
        .eq("status", "In Progress");
      if (data) {
        setRefill(data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const cancelRefill = async (id: any) => {
    try {
      const { data } = await supabase
        .from("refills")
        .update({
          status: "Cancelled",
        })
        .eq("id", id)
        .select()
        .single();

      if (data) {
        setRefill((prev) => {
          return {
            ...prev,
            status: data.status,
          };
        });
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const handleUpdates = (data: any) => {
    setRefill((prev) => {
      return {
        ...prev,
        status: data.status,
      };
    });
  };

  const listenToUpdateRefills = () => {
    supabase
      .channel("refills")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "refills",
        },
        (payload: any) => {
          handleUpdates(payload.new);
        }
      )
      .subscribe();
  };

  useEffect(() => {
    device && getRefill(device.id);
    listenToUpdateRefills();
  }, [device]);

  return (
    <Stack
      sx={
        consumption?.length || (waterQuality && waterTemp)
          ? { ...BoxStyle, bgcolor: "#fff" }
          : { ...BoxStyle, bgcolor: "inherit" }
      }
      alignItems={"center"}
      direction="column"
      alignContent={"center"}
      spacing={2}
    >
      <strong style={{ padding: "1rem" }}>{device?.name}</strong>
      {consumption?.length || (waterQuality && waterTemp) ? (
        <>
          {/* <h3 style={{display: 'inline-block'}}>{owner}</h3> */}
          {
            // isalert?(
            //     <Box sx={{display: 'flex',marginTop:'10px', justifyContent: 'space-between',alignItems: 'center', padding:'8px 3px', cursor: 'pointer', transition: '.5s', borderRadius: '5px', bgcolor:'#E7D66C', width: '90%',boxShadow: '3px 1px 2px rgba(0, 0, 0, 0.15)',}}>
            //         <p style={{display: 'inline-flex',paddingLeft: '5px', color:'#B69E09', alignItems: 'center'}}>
            //             ""
            //         </p>
            //         <p style={{color:'#B69E09'}} >&#10006;</p>
            //     </Box>
            // ):(null)
          }
          {(actuator?.length as number) > 0 && (
            <Box
              sx={{
                display: "flex",
                marginTop: "10px",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                transition: ".5s",
                borderRadius: "5px",
                width: "90%",
                boxShadow: "3px 1px 2px rgba(0, 0, 0, 0.15)",
              }}
            >
              <p
                style={{
                  display: "inline-flex",
                  padding: 2,
                  alignItems: "center",
                }}
              >
                <FireHydrantAlt sx={{ fontSize: 25, color: "#4592F6" }} />
                {actuator ? actuator[0].name : "Water Pump Control"}
              </p>
              <Android12Switch
                onClick={switchActuator}
                checked={pumpStatus}
                sx={{ color: "#FF5C00" }}
              />
            </Box>
          )}
          <WatertankComponent
            waterQuality={waterQuality}
            percentage={Math.round((liters / capacity) * 100)}
          />
          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ marginTop: "10px", width: "80%" }}
          >
            <Box sx={TankDetails}>
              <p
                style={{
                  fontSize: "16px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <WaterDrop style={{ fontSize: 28, color: "#4592F6" }} />
                Current Amount
              </p>
              <p style={{ fontSize: "24px" }}>{liters} Ltr</p>
            </Box>
            {/* <Box sx={T/ankDetails}>
              <p
                style={{
                  fontSize: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <DeviceThermostatSharp
                  style={{
                    fontSize: 12,
                    display: "inline-block",
                    color: "#1C1B1F",
                  }}
                />
                Temperature
              </p>
              <p style={{ fontSize: "24px" }}>{Math.round(waterTemp)}&#8451;</p>
            </Box> */}
            {/* <Box sx={TankDetails}>
              <p
                style={{
                  fontSize: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <AutoAwesome
                  style={{ fontSize: 12, display: "inline-block" }}
                />
                Water Quality
              </p>
              {waterQuality?.toLowerCase().includes("excellent") && (
                <p style={{ fontSize: "24px", color: "#85ea2d" }}>
                  {waterQuality}
                </p>
              )}
              {waterQuality?.includes("Poor") && (
                <p style={{ fontSize: "24px", color: "#c5221f" }}>
                  {waterQuality}
                </p>
              )}
              {waterQuality?.includes("Good") && (
                <p style={{ fontSize: "24px", color: "#f35e19" }}>
                  {waterQuality}
                </p>
              )}
            </Box>
            <Box sx={TankDetails}>
              <p
                style={{
                  fontSize: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <WaterDrop
                  style={{
                    fontSize: 12,
                    display: "inline-block",
                    color: "#2C2D38",
                  }}
                />
                Water Leakage
              </p>
              <p style={{ fontSize: "24px" }}>No</p>
            </Box> */}
          </Stack>
          <Box
            style={{
              width: "100%",
              padding: "0 2rem",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              justifyContent: "space-around",
            }}
          >
            {refill?.status === "In Progress" ? (
              <>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    backgroundColor: "#FF5C00 ",
                    border: "none",
                    color: " #fff",
                    padding: "0.5rem 0.8rem",
                    fontWeight: "bold",
                    borderRadius: "2rem",
                    fontSize: 16,
                    // cursor: "pointer",
                  }}
                >
                  {/* <span> */}
                  <FaTruckDroplet size={30} />
                  {/* </span> */}
                  Request in Progress
                </button>
                <button
                  onClick={() => cancelRefill(refill.id)}
                  style={{
                    backgroundColor: "gray",
                    border: "none",
                    color: " #fff",
                    padding: "0.8rem",
                    fontWeight: "bold",
                    borderRadius: "2rem",
                    fontSize: 16,
                    cursor: "pointer",
                    width: "6rem",
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {sendingReq ? (
                  <p style={{ color: "orangegb" }}>Sending order...</p>
                ) : (
                  <button
                    onClick={() => createRefill(device)}
                    style={{
                      backgroundColor: "#1976D2",
                      border: "none",
                      color: " #fff",
                      padding: "0.8rem",
                      fontWeight: "bold",
                      borderRadius: "2rem",
                      fontSize: 16,
                      cursor: "pointer",
                    }}
                  >
                    Request Refill
                  </button>
                )}

                <Box
                  style={{
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  <PiWarningOctagonLight color="orange" size={26} />
                  <p>Refill in 8 days</p>
                </Box>
              </>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              marginTop: "10px",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              transition: ".5s",
              borderRadius: "5px",
              width: "90%",
              boxShadow: "1px 2px 1px rgba(0, 0, 0, 0.15)",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <NotificationsIcon style={{ fontSize: 14 }} />
              Notification
            </p>
            <Android12Switch checked={receiveNotifications} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: ".5s",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                transition: ".5s",
                width: "75%",
              }}
            >
              <p
                style={{ fontSize: 16, fontWeight: "600", textAlign: "center" }}
              >
                WATER CONSUMPTION
              </p>
              <Box
                // onClick={handleToggleTeemp}
                pt={0.3}
                bgcolor={"#E8E8E8"}
                sx={{ borderRadius: "20px", width: "20%", textAlign: "center" }}
              >
                <Opacity
                  style={{
                    cursor: "pointer",
                    color: "#fff",
                    borderRadius: "50%",
                    backgroundColor: "#4592F6",
                  }}
                />
                {/* <DeviceThermostat
                  style={
                    toggleHot
                      ? {
                          color: "#fff",
                          cursor: "pointer",
                          borderRadius: "50%",
                          backgroundColor: "#FF5C00",
                        }
                      : { color: "#888992", cursor: "pointer" }
                  }
                /> */}
              </Box>
            </Box>
            <Chart
              options={{
                chart: {
                  height: 350,
                  type: "rangeArea",
                },
                colors: ["#4592F6"],

                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: "smooth",
                  width: 2,
                },
                xaxis: {
                  categories: temperatureConsumption?.map((item) => item.x),
                  tickAmount: 5,
                },
                fill: {
                  type: "gradient",
                  gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.5,
                    stops: [0, 90, 100],
                  },
                },
              }}
              series={apexChartOptions.series}
              type="line"
              height={300}
              width={450}
            />
            {/* <MapComponent /> */}
          </Box>
        </>
      ) : (
        <Box sx={{ position: "relative" }}>
          <Box sx={{ marginTop: "10px" }}>
            {/* <h3 style={{fontSize: '15px', textAlign: 'center', margin:'10px 0'}}>
                                {owner}
                            </h3> */}
            <Box sx={{ width: "100%" }} component="img" src={FrameSVG} />
            <p
              style={{
                color: "red",
                fontWeight: "600",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              No readings detected for this tank!
            </p>
          </Box>
        </Box>
      )}
    </Stack>
  );
}

export default TankDetailComponent;
