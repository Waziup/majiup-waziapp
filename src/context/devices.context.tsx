import axios, { AxiosResponse } from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";
import mqtt from "precompiled-mqtt";
// import toast from "react-hot-toast";
// import { User } from "@supabase/supabase-js";
import { formatDateToISO, formatTime } from "../utils/timeFormatter";
import { Analytics } from "@mui/icons-material";
import toast from "react-hot-toast";
// const brokerUrl = `mqtt://localhost`;
// const brokerUrl = `mqtt://192.168.0.104`;
const brokerUrl = `mqtt://wazigate.local`;

type Props = {
  children: ReactNode;
};

type Consumption = {
  x: any;
  y: number;
};

export type Sensor = {
  created: Date;
  id: string;
  kind: string;
  meta: SensorAlert;
  modified: Date;
  name: string;
  quantity: number;
  time: string;
  unit: string;
  value: 1 | 0;
};
export type Actuator = {
  created: Date;
  id: string;
  meta: unknown;
  modified: Date;
  name: string;
  time: Date | null;
  value: boolean;
};
export type Notification = {
  tank_name: string;
  id: any;
  message: string;
  read_status: boolean;
  time: Date;
  priority: string;
};

export type SensorAlert = {
  critical_min: number;
  critical_max: number;
  kind: string;
};

export type Profile = {
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  email: string;
  address: string;
};

export type MetaInformation = {
  receivenotifications: boolean;
  notifications: {
    messages: Notification[];
  };
  location: {
    cordinates: {
      longitude: number;
      latitude: number;
    };
    address: string;
  };
  settings: {
    height: number;
    offset: number;
    capacity: number;
  };
  profile: Profile;
};

export type UserProfile = {
  profile: Profile;
};

interface Device {
  actuators: Actuator[];
  capacity: number;
  created: Date;
  height: number;
  offset: number;
  id: string;
  length?: number;
  meta: MetaInformation;
  modified: string;
  name: string;
  notifications: { messages: Notification[] };
  radius: number;
  sensors: Sensor[];
  width?: number;
  analytics: Analytics;
}

interface Average {
  hourly: number;
  daily: number;
}

interface Trend {
  value: number;
  amountUsed: number;
  days: number;
  indicator: string;
}

export type Analytics = {
  average: Average;
  trend: Trend;
  durationLeft: number;
};

export interface X extends Device {
  consumption: Consumption[];
  isSelect: boolean;
  liters: number;
  temp: number;
  tds: string;
  on: boolean;
}

interface ContextValues {
  devices: X[];
  user: { token: string; name: string };
  setUser: (user: string, token: string) => void;
  toggleModal: () => void;
  isOpenNav?: boolean;
  setTanks: (devices: X[]) => void;
  selectedDevice: X | undefined;
  setSelectedDevice: (device: X) => void;
  reportRef: HTMLDivElement | null;
  setReportRef: (ref: HTMLDivElement) => void;
  loading: boolean;
  setLoadingFunc: (loading: boolean) => void;
  // fetchinHours: ()=>void,
  searchDevices: (name: string) => void;
  fetchInMinutes: () => void;
  profile?: Profile;
  loadingProfile?: boolean;
  connected?: boolean;
  updateProfile: (profileDetails: Profile) => void;
}
export const DevicesContext = createContext<ContextValues>({
  devices: [],
  user: { token: "", name: "" },
  setUser: () => {},
  toggleModal: () => {},
  isOpenNav: false,
  setTanks: () => {},
  selectedDevice: undefined,
  setSelectedDevice() {},
  reportRef: null,
  setReportRef: () => {},
  loading: true,
  setLoadingFunc: () => {},
  // fetchinHours: ()=>{console.log('');},
  fetchInMinutes: () => {},
  searchDevices: () => {},
  profile: {} as Profile,
  loadingProfile: true,
  connected: false,
  updateProfile: () => {},
});

//return an array of device data including level, temperature, quality, etc.
//extract the first row and add it as current waterTemp, waterQuality, liters, etc.
//add the rest of the rows as consumption data
function isActiveDevice(modifiedTime: any): boolean {
  const now = new Date();
  const modified = new Date(modifiedTime);
  const diff = now.getTime() - modified.getTime();
  const diffInMinutes = Math.floor(diff / 1000 / 60);
  return diffInMinutes < 7;
}

function subscriberFn(client: mqtt.MqttClient, topic: string) {
  client.subscribe(topic, (err) => {
    if (err) {
      // toast.error("Failed to connect!");
      console.log(err);
    }
  });
}

export const client: mqtt.MqttClient = mqtt.connect(brokerUrl);

export const DevicesProvider = ({ children }: Props) => {
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const [devices, setDevices] = useState<X[]>([]);
  const [profile, setProfile] = useState<Profile>();
  const [filteredDevices, setFilteredDevices] = useState<X[]>(devices);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTank, setSelectedTank] = useState<X>();
  const [connected, setConnected] = useState<boolean>();
  const [user, setLoggedUser] = useState<{ name: string; token: string }>({
    name: "",
    token: "",
  });
  const [isOpenNav, setIsOpenNav] = useState<boolean>(false);
  const toggleModal = () => setIsOpenNav(!isOpenNav);
  const setTanks = (devices: X[]) => setDevices(devices);
  const [reportRef, setReportRefFunch] = useState<HTMLDivElement | null>(null);

  const updateProfile = (profileDetails: Profile) => {
    setProfile(profileDetails);
  };
  const getWifiStatus = async () => {
    try {
      const getStatus = await axios.get(
        "http://wazigate.local/apps/waziup.wazigate-system/internet",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (getStatus.status === 200) {
        const wifiStatus: boolean = await getStatus.data;
        setConnected(wifiStatus);
      } else {
        setConnected(false);
      }
    } catch (err) {
    } finally {
    }
  };

  const setReportRef = (ref: HTMLDivElement) => {
    if (ref !== null) {
      setReportRefFunch(ref);
    }
  };
  const setLoadingFunc = (loading: boolean) => {
    if (loading) {
    }
    // setLoading(!loading);
  };

  const getUserProfile = async () => {
    try {
      const requestProfile: AxiosResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/gateway-profile`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (requestProfile.status === 200) {
        const userProfile: UserProfile = await requestProfile.data;
        setProfile(userProfile.profile);
        return userProfile;
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } finally {
      setLoadingProfile(false);
    }
  };

  type AnalyticsParams = {
    tankID: string;
    from: string;
    to: string;
  };

  const getAnalytics = async ({
    tankID,
    from,
    to,
  }: AnalyticsParams): Promise<Analytics | undefined> => {
    try {
      const req: AxiosResponse = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/tanks/${tankID}/analytics?from=${from}&to=${to}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (req.status === 200) {
        const analytics: Analytics = req.data;
        return analytics;
      }
    } catch (err) {
      console.error(err);
    }
  };

  function fetchInMinutes() {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/tanks`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        const tankValues: any = response.data.map(async (device: Device) => {
          if (device.sensors) {
            const toTime = new Date();
            const fromTime = new Date(toTime);
            fromTime.setHours(fromTime.getHours() - 168);

            const sensorResponse = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/tanks/${
                device.id
              }/tank-sensors/waterlevel/values?from=${formatDateToISO(
                fromTime
              )}&to=${formatDateToISO(toTime)}`,
              {
                headers: {
                  Accept: "application/json",
                },
              }
            );

            const plotVals: any = sensorResponse.data?.waterLevels?.map(
              (val: { timestamp: any; liters: any }) => {
                const date: string = formatTime(new Date(val.timestamp));
                return {
                  x: date,
                  y: val.liters,
                };
              }
            );

            const to = new Date();
            const from = new Date(to);
            from.setHours(from.getHours() - 1);

            // console.log(formatDateToISO(from), formatDateToISO(to));

            const analytics: Analytics | undefined = await getAnalytics({
              tankID: device.id,
              from: formatDateToISO(from),
              to: formatDateToISO(to),
            });

            return { plotVals, analytics };
          }
        });

        const tankData = await Promise.all(tankValues);

        return {
          tankData: tankData,
          res: response.data,
        };
      })
      .then(({ res, tankData }) => {
        setDevices(
          res.map(function (device: X, index: number) {
            // subscriberFn(client, `devices/${device.id}/meta/#`);
            subscriberFn(client, `devices/${device.id}/sensors/#`);
            // subscriberFn(client, `devices/${device.id}/actuators/#`);

            const sensor = device.sensors?.find((sensor: Sensor) =>
              sensor.meta.kind.toLowerCase().includes("waterlevel")
            );
            const modified = sensor?.time;

            // getAnalytics(device.id).then((analytics) => {
            //   console.table(analytics);
            //   setDevices((prev) => {
            //     return {
            //       ...prev,
            //       analytics: analytics,
            //     };
            //   });
            // });

            return {
              ...device,
              capacity: device.meta?.settings.capacity,
              height: Math.round(device.meta?.settings.height),
              offset: device.meta?.settings.offset,
              consumption: tankData[index]?.plotVals,
              liters: device.sensors?.find((sensor: Sensor) =>
                sensor.meta.kind.toLowerCase().includes("waterlevel")
              )?.value,
              tds: device.sensors?.find((sensor: Sensor) =>
                sensor.meta.kind.toLowerCase().includes("waterpollutantsensor")
              )?.value,
              temp: device.sensors?.find((sensor: Sensor) =>
                sensor.meta.kind.toLowerCase().includes("waterthermometer")
              )?.value,
              isSelect: false,
              on: isActiveDevice(modified),
              notifications: device.meta?.notifications.messages,
              analytics: tankData[index]?.analytics,
            };
          })
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  // function fetchinHours(){
  //     axios.get(`${import.meta.env.VITE_BACKEND_URL}/tanks`,{
  //         headers:{
  //             'Accept': 'application/json',
  //             'Content-Type':'application/json'
  //         }
  //     })
  //     .then(async (response)=>{
  //         const devicePromises = response.data.map(async (device:Device) => {
  //             const sensorResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tanks/${device.id}/tank-sensors/waterlevel/values`, {
  //                 headers: {
  //                     'Accept': 'application/json',
  //                 }
  //             });
  //             return sensorResponse.data.map((sensor:Sensor) => {
  //                 const date = new Date(sensor.time);
  //                 return {
  //                     y: sensor.value,
  //                     x: date.getHours(),
  //                 };
  //             });
  //         });
  //         const consumption = await Promise.all(devicePromises);

  //         return {
  //             consumption: consumption[0] as Consumption[],
  //             res: response.data,
  //         };
  //     })
  //     .then(({res,consumption})=>{
  //         setDevices(res.map(function(device: X){

  //             return{
  //                 ...device,
  //                 capacity: device.meta.settings.capacity,
  //                 height: device.meta.settings.height,
  //                 consumption: consumption,
  //                 liters: device.sensors.find((sensor: Sensor)=>sensor.meta.kind.toLowerCase().includes('waterlevel'))?.value,
  //                 tds: device.sensors.find((sensor: Sensor)=>sensor.meta.kind.toLowerCase().includes('waterpollutantsensor'))?.value,
  //                 temp: device.sensors.find((sensor: Sensor)=>sensor.meta.kind.toLowerCase().includes('waterthermometer'))?.value,
  //                 isSelect: false,
  //                 notification: device.meta.notifications,
  //                 on: isActiveDevice(device.modified),
  //             }

  //         }));
  //         setLoading(false);
  //     })
  //     .catch((err)=>{
  //         console.log(err);
  //     })
  // }
  client.on("connect", () => {
    console.log("MQTT Connected");
    toast.success("Connected!");
  });

  client.on("error", () => {
    toast.error("Disconnected!");
  });

  client.on("disconnect", () => {
    client.reconnect();
    toast.error("Disconnected!");
  });

  useEffect(() => {
    fetchInMinutes();
    setFilteredDevices(devices);
    getUserProfile();
    getWifiStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function searchDevices(name: string) {
    if (name.length === 0) {
      setFilteredDevices(devices);
      return;
    }
    const filtered = devices.filter((device: X) =>
      device.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredDevices(filtered);
  }
  useEffect(() => {
    if (devices !== undefined && selectedTank === undefined) {
      setSelectedTank(devices[0]);
    }
  }, [devices, selectedTank]);
  const setSelectedDevice = (device: X) => setSelectedTank(device);
  const setUser = (userName: string, token: string) =>
    setLoggedUser({ name: userName, token });
  const value = {
    devices: filteredDevices.length === 0 ? devices : filteredDevices,
    user,
    setUser,
    isOpenNav,
    toggleModal,
    setTanks,
    selectedDevice: selectedTank,
    setSelectedDevice,
    reportRef,
    setReportRef,
    loading,
    setLoadingFunc,
    // fetchinHours,
    fetchInMinutes,
    searchDevices,
    profile,
    loadingProfile,
    connected,
    updateProfile,
  };
  return (
    <DevicesContext.Provider value={value}>{children}</DevicesContext.Provider>
  );
};
