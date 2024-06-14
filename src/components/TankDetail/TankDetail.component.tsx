import {
  Box,
  CircularProgress,
  styled,
  Switch,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  FireHydrantAlt,
  // WaterDrop,
  // DeviceThermostatSharp,
  // AutoAwesome,
  // DeviceThermostat,
  // Opacity,
} from "@mui/icons-material";
import WatertankComponent from "../WaterTank/Watertank.component";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import { useContext, useEffect, useState } from "react";
// import MapComponent from "../MapComponent/Map.component";
import FrameSVG from "../../assets/not-found.svg";
import { Actuator, DevicesContext, X } from "../../context/devices.context";
// import axios from "axios";
import { PiWarningOctagonLight } from "react-icons/pi";
import { FaTruckDroplet } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import Chart from "react-apexcharts";
import { postNewNotificationMessage } from "../../utils/consumptionHelper";

import supabase from "../../config/supabaseClient";
// import { formatTime } from "../../utils/timeFormatter";
import toast from "react-hot-toast";
import { ImArrowUp } from "react-icons/im";
import { ImArrowDown } from "react-icons/im";
import { Visibility } from "@mui/icons-material";
import { convertDays } from "../../utils/timeFormatter";

type Consumption = {
  x: number;
  y: number;
};

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
  position: "relative",
};

// const TankDetails: React.CSSProperties = {
//   padding: "20px",
//   margin: "7px 0",
//   width: "100%",
//   borderRadius: "10px",
//   // boxShadow: "1px 1px 4px  rgba(0, 0, 0, 0.15)",
//   display: "flex",
//   justifyContent: "space-between",
// };

function TankDetailComponent({
  id,
  capacity,
  // receiveNotifications,
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
  const [usage, setUsage] = useState<string>("d");

  const navigate = useNavigate();

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
          // stops: [0, 90, 100],
        },
      },
    },
  };

  async function switchActuator() {
    toast.error("This action is coming soon");
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
    if (navigator.onLine) {
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
          toast.success("Water refill order placed!");
        } else {
          console.log(error);
          toast.error("Failed to place order. Try again later!");
        }
      } catch (err) {
      } finally {
        setSendingReq(false);
      }
    } else {
      toast.error("Connect to internet and try again!");
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
        toast.success("Order cancelled!");
      }
    } catch (error) {
      toast.error("Failed to cancel. Try again.");
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

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      sx={
        consumption?.length
          ? {
              ...BoxStyle,
              // bgcolor: "#f6f6f6",
              display: "flex",
              flexDirection: "column",
              p: matches ? 2 : 0,
            }
          : {
              ...BoxStyle,
              bgcolor: "inherit",
            }
      }
      padding={2}
    >
      {consumption?.length ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: matches ? undefined : "center",
              alignItems: "center",
              gap: matches ? "2rem" : "0.5rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <strong style={{ padding: "0.5rem" }}>{device?.name}</strong>
              <WatertankComponent
                waterQuality={waterQuality}
                percentage={Math.round((liters / capacity) * 100)}
                consumption={device?.consumption}
                matches={matches}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                width: matches ? "fit-content" : "100%",
                minWidth: "40%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  // flexWrap: "wrap",
                  borderRadius: "4px",
                  boxShadow: "1px 1px 4px  rgba(0, 0, 0, 0.15)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    padding: 2,
                  }}
                  gap={2}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Current Quantity</p>
                    <p style={{ fontSize: "1rem" }}>{liters} Ltrs</p>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Average use</p>
                    <select
                      name=""
                      id=""
                      style={{
                        padding: "8px",
                        borderRadius: "4px",
                        backgroundColor: "#4592F6",
                        border: "none",
                        color: "#fff",
                        outline: "none",
                      }}
                      onChange={(e) => setUsage(e.target.value)}
                    >
                      <option value="d">Daily</option>
                      <option value="h">Hourly</option>
                    </select>
                    <p style={{ fontSize: "1rem" }}>
                      {" "}
                      {usage === "d" &&
                        device?.analytics?.average?.daily?.toFixed(0)}{" "}
                      {usage === "h" &&
                        device?.analytics?.average?.hourly?.toFixed(0)}{" "}
                      L/
                      {usage === "d" && "day"}
                      {usage === "h" && "hr"}
                    </p>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      transition: ".5s",
                      borderRadius: "8px",
                      width: "100%",
                    }}
                  >
                    <p>Trend</p>
                    {/* <input type="datetime-local" /> */}

                    <Box>
                      {device?.analytics?.trend?.value &&
                        (device?.analytics?.trend?.value > 0 ? (
                          <ImArrowUp color="green" />
                        ) : (
                          <ImArrowDown color="red" />
                        ))}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Tank Status</p>
                    {device?.on ? (
                      <p style={{ color: "green" }}>Active</p>
                    ) : (
                      <p style={{ color: "red" }}>Offline</p>
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#F6F6F6",
                    padding: 1.5,
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
                          padding: "0.4rem 0.7rem",
                          fontWeight: "bold",
                          borderRadius: "2rem",
                          fontSize: matches ? 16 : 14,
                          // cursor: "pointer",
                        }}
                      >
                        {/* <span> */}
                        <Box>
                          <FaTruckDroplet size={30} />
                        </Box>
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
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center",
                          }}
                        >
                          <CircularProgress size={20} />{" "}
                        </Box>
                      ) : (
                        <button
                          onClick={() => createRefill(device)}
                          style={{
                            backgroundColor: "#4592F6",
                            border: "none",
                            color: " #fff",
                            padding: "0.8rem",
                            fontWeight: "bold",

                            borderRadius: "2rem",
                            fontSize: matches ? 16 : 14,
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
                        {device?.analytics?.durationLeft &&
                          device?.analytics?.durationLeft < 3 && (
                            <Box>
                              <PiWarningOctagonLight color="orange" size={26} />
                            </Box>
                          )}
                        <p>
                          Refill in{" "}
                          {
                            convertDays(device?.analytics?.durationLeft ?? 0)
                              .duration
                          }{" "}
                          {
                            convertDays(device?.analytics?.durationLeft ?? 0)
                              .type
                          }
                        </p>
                      </Box>
                    </>
                  )}
                </Box>
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
                  width: "100%",
                  boxShadow: "0 1px 8px rgba(0, 0, 0, 0.15)",
                  pl: 1.25,
                  pr: 0.5,
                  pt: 1.25,
                  pb: 1.25,
                }}
              >
                <p
                  style={{
                    display: "inline-flex",
                    padding: 2,
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <FireHydrantAlt sx={{ fontSize: 25, color: "#4592F6" }} />
                  <p>Pump</p>
                  {actuator ? actuator[0]?.name : "Water Pump Control"}
                </p>
                <Android12Switch
                  onClick={switchActuator}
                  checked={pumpStatus}
                  sx={{ color: "#FF5C00" }}
                />
              </Box>
              <Box
                sx={{
                  marginTop: "10px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: ".5s",
                  borderRadius: "5px",
                  width: "100%",
                  overflow: "hidden",
                  boxShadow: "0 1px 8px rgba(0, 0, 0, 0.15)",
                }}
              >
                <h4
                  style={{
                    padding: "0.5rem 0.8rem",
                    backgroundColor: "#d4d4d4",
                  }}
                >
                  Device Health
                </h4>
                <Box
                  sx={{
                    padding: "0.5rem 0.8rem",
                    display: "flex",
                    gap: "0.5rem",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>Battery</p>
                    <p>76%</p>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>Charging</p>
                    <p>Yes</p>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <>
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
              {/* <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  transition: ".5s",
                }}
              > */}
              {matches ? (
                <Chart
                  onClick={() => navigate("/analytics")}
                  options={{
                    chart: {
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
                      tickAmount: matches ? 5 : 3,
                    },
                    fill: {
                      type: "gradient",
                      gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.5,
                        opacityTo: 0.5,
                      },
                    },
                  }}
                  series={apexChartOptions.series}
                  type="line"
                  height={matches ? 450 : 250}
                />
              ) : (
                <Box
                  onClick={() => navigate("/analytics")}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "0.8rem",
                  }}
                >
                  <p
                    style={{
                      color: "#fff",
                      fontSize: "12px",
                      cursor: "pointer",
                      borderRadius: "20px",
                      padding: "0.8rem",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#4592F6",
                    }}
                  >
                    <Visibility sx={{ fontSize: 12, margin: "0 4px" }} />
                    View Analytics
                  </p>
                </Box>
              )}
              {/* <MapComponent /> */}
              {/* </Box> */}
            </>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Box sx={{}}>
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
              No readings detected for {device?.name}
            </p>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default TankDetailComponent;
