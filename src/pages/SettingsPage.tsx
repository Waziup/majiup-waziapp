import { Delete, SaveAlt } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Modal,
  Stack,
  SxProps,
  Theme,
} from "@mui/material";
import FrameSVG from "../assets/frame.svg";
import React, { useContext, useState } from "react";
import {
  DevicesContext,
  MetaInformation,
  Sensor,
} from "../context/devices.context";
import { Android12Switch } from "../components/TankDetail/TankDetail.component";
import { useOutletContext } from "react-router-dom";
import { X as Device } from "../context/devices.context";
import axios from "axios";
import { TbAlertHexagon } from "react-icons/tb";
import { MdModeEdit, MdSensors } from "react-icons/md";
// import { IoPersonOutline } from "react-icons/io5";
// import { ImSwitch } from "react-icons/im";
import { Profile } from "../context/devices.context";
import { SensorAlert } from "../context/devices.context";
// import { CiPhone } from "react-icons/ci";
// import { GoPerson } from "react-icons/go";
import { FaLocationDot } from "react-icons/fa6";
import toast from "react-hot-toast";

// import { useNavigate, } from 'react-router-dom';
/*
josee Musya10:30AM
1. Edit name
2. Edit Meta values, Height, Capacity, Max Alert, Min Alert
3. Generate notifications on current water quantity reaching min or max alert
4. Validation of meta fields (ParseFloata)
5. Decimal point overflow
6. /meta -> Body {notification
*/
const BoxStyle: SxProps<Theme> = {
  bgcolor: "#fff",
  borderRadius: "10px",
  mt: 1,
  overflowY: "auto",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
};
export const ModalContainer: SxProps<Theme> = {
  bgcolor: "#fff",
  padding: 2,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  alignContent: "center",
  borderRadius: "4px",
  //
};
const InputLabel = {
  fontSize: "16px",
  margin: "10px 0",
  display: "flex",
  gap: "0.5rem",
};
const SensorContainer: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
  gap: "1.5rem",
};
const boldText: React.CSSProperties = {
  fontSize: "16px",
  margin: "10px 0",
};
export const inputbox: React.CSSProperties = {
  height: "100%",
  padding: "5px 15px",
  outline: "none",
  border: "1px solid #ccc",
  background: "#F6F6F6",
  width: "100%",
  borderRadius: "20px",
};

// const inputbox1: React.CSSProperties = {
//   height: "100%",
//   padding: "5px 3px",
//   outline: "none",
//   fontSize: "13px",
//   borderBottom: "1px solid #888",
//   // background: '#F6F6F6',
//   // width: '50%',
//   margin: "0 10px",
// };
export const ButtonStyle: React.CSSProperties = {
  borderRadius: "20px",
  padding: "8px 0px",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "10px 5px",
  width: "60%",
  backgroundColor: "#FF5C00",
  color: "#fff",
  border: "none",
  outline: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
export const cancelButtonStyle = {
  borderRadius: "20px",
  padding: "10px 20px",
  fontSize: "16px",
  margin: "10px 5px",
  width: "60%",
  backgroundColor: "#Fff",
  color: "#888992",
  border: "1px solid #888992",
  outline: "none",
  cursor: "pointer",
};

export const fRow: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  gap: "0.5rem",
};
export const fColumn: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  gap: "0.5rem",
};

function SettingsPage() {
  const { devices, setTanks, loading } = useContext(DevicesContext);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedDevice, setSelectedDevice] = useState<Device>();
  const [matches] = useOutletContext<[matches: boolean]>();
  const [deviceUpdated, setDeviceUpdated] = useState<boolean>(false);

  // const navigate = useNavigate();
  const DefaultAlerts: SensorAlert = {
    critical_min: 0,
    critical_max: 0,
    kind: "",
  };

  const Alt = {
    location: {
      cordinates: { latitude: 0, longitude: 0 },
      address: "",
    },
    notifications: selectedDevice?.notifications
      ? selectedDevice?.notifications
      : { messages: [] },
    receivenotifications: selectedDevice?.meta.receivenotifications ?? false,
    settings: selectedDevice?.meta.settings ?? {
      capacity: 0,
      radius: 0,
      height: 0,
      offset: 0,
      length: 0,
      width: 0,
      maxalert: 0,
      minalert: 0,
    },
    profile: {} as Profile,
  };
  const [changedMetaInfo, setChangedMetaInfo] = useState<{
    name: string;
    waterlevelSensorAlert: SensorAlert;
    metaData: MetaInformation;
  }>({
    name: selectedDevice?.name ?? "",
    waterlevelSensorAlert:
      selectedDevice?.sensors?.find(
        (sensor: Sensor) => sensor.meta.kind === "WaterLevel"
      )?.meta ?? DefaultAlerts,
    metaData: selectedDevice?.meta ?? Alt,
  });

  const handleSelectedTank = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    device: Device
  ) => {
    e.preventDefault();

    setSelectedDevice(device);
    setChangedMetaInfo({
      name: device.name,
      metaData: device.meta,
      waterlevelSensorAlert:
        device.sensors?.find(
          (sensor: Sensor) => sensor.meta.kind === "WaterLevel"
        )?.meta ?? DefaultAlerts,
    });
    setIsOpenModal(true);
  };
  const deleteAlert = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    const rs = confirm(
      `Are you sure you want to remove ${selectedDevice?.name}?`
    );
    if (rs) {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/tanks/${id}`);
      setTanks(devices.filter((device: Device) => device.id !== id));
      setIsOpenModal(false);
      setDeviceUpdated(false);
      setSelectedDevice(undefined);
      // navigate('/dashboard');
      //refresh the page
    }
  };
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (
      changedMetaInfo.metaData !== selectedDevice?.meta ||
      changedMetaInfo.name !== selectedDevice.name ||
      changedMetaInfo.waterlevelSensorAlert !==
        selectedDevice.sensors?.find(
          (sensor: Sensor) => sensor.kind === "WaterLevel"
        )?.meta
    ) {
      setDeviceUpdated(true);
    } else {
      setDeviceUpdated(false);
    }

    if (e.target.name === "name") {
      setChangedMetaInfo({
        ...changedMetaInfo,
        name: e.target.value,
      });
      return;
    } else if (e.target.name === "max_alert") {
      e.target.value &&
        setChangedMetaInfo({
          ...changedMetaInfo,
          waterlevelSensorAlert: {
            ...changedMetaInfo.waterlevelSensorAlert,
            critical_max: parseInt(e.target.value),
          },
        });
    } else if (e.target.name === "min_alert") {
      e.target.value &&
        setChangedMetaInfo({
          ...changedMetaInfo,
          waterlevelSensorAlert: {
            ...changedMetaInfo.waterlevelSensorAlert,
            critical_min: parseInt(e.target.value),
          },
        });
    } else {
      setChangedMetaInfo({
        ...changedMetaInfo,
        metaData: {
          ...changedMetaInfo.metaData,
          location: {
            ...changedMetaInfo.metaData.location,
            cordinates: {
              ...changedMetaInfo.metaData.location.cordinates,
              [e.target.name]: e.target.value,
            },
            [e.target.name]: e.target.value,
          },
          settings: {
            ...changedMetaInfo.metaData.settings,
            [e.target.name]: e.target.value,
          },
          profile: {
            ...changedMetaInfo.metaData.profile,
            [e.target.name]: e.target.value,
          },
        },
      });
    }
  }
  async function handeleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const promises: any = [];
    // const rs = confirm(
    //   `Are you sure you want to save changes to ${changedMetaInfo.name}?`
    // );

    if (true) {
      if (selectedDevice?.name !== changedMetaInfo.name) {
        try {
          const nameUpdate = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/tanks/${
              selectedDevice?.id
            }/name`,
            changedMetaInfo.name,
            {
              headers: {
                "Content-Type": "text/plain",
              },
            }
          );

          if (nameUpdate.status !== 200) {
            toast.error("Failed to change tank name");
          }
          promises.push(nameUpdate);
        } catch (err) {
          console.error(err);
          toast.error("Error occured changing tank name");
        }
      }

      if (
        selectedDevice?.sensors?.find(
          (sensor) => sensor.meta.kind === "WaterLevel"
        )?.meta !== changedMetaInfo.waterlevelSensorAlert &&
        selectedDevice &&
        selectedDevice?.sensors?.some?.(
          (sensor: Sensor) => sensor.meta.kind === "WaterLevel"
        )
      ) {
        try {
          const sensorUpdate = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/tanks/${
              selectedDevice.id
            }/tank-sensors/waterlevel/alerts`,
            changedMetaInfo.waterlevelSensorAlert
          );
          promises.push(sensorUpdate);

          if (sensorUpdate.status !== 200) {
            toast.error("Error updating tank alerts");
          }
        } catch (err) {
          toast.error("Error updating tank alerts");
        }
      }

      try {
        const responseMetaData = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/tanks/${
            selectedDevice?.id
          }/profile`,
          {
            ...changedMetaInfo.metaData,
            location: {
              cordinates: {
                latitude: changedMetaInfo.metaData.location.cordinates.latitude,
                longitude:
                  changedMetaInfo.metaData.location.cordinates.longitude,
              },
              address: changedMetaInfo.metaData.location.address,
            },
            settings: {
              capacity: parseFloat(
                changedMetaInfo.metaData.settings.capacity.toString()
              ),
              height: parseFloat(
                changedMetaInfo.metaData.settings.height.toString()
              ),
              offset: parseFloat(
                changedMetaInfo.metaData.settings.offset.toString()
              ),
            },
            receivenotifications: changedMetaInfo.metaData.receivenotifications,
            notifications: { ...selectedDevice?.meta.notifications },
            profile: changedMetaInfo.metaData.profile,
          }
        );

        if (responseMetaData.status !== 200) {
          toast.error("Failed to update tank details");
        }
        promises.push(responseMetaData);
      } catch (err) {
        toast.error("Error while updating tank");
      }

      Promise.all(promises)
        .then(() => {
          const device = devices.find(
            (device) => device.id === selectedDevice?.id
          );
          const waterlevelSensorPresent = device?.sensors?.find(
            (sensor) => sensor.meta.kind === "WaterLevel"
          ) as Sensor;

          if (device) {
            device.meta = changedMetaInfo.metaData;
            device.name = changedMetaInfo.name;
            if (waterlevelSensorPresent) {
              waterlevelSensorPresent.meta =
                changedMetaInfo.waterlevelSensorAlert;
            }

            setTanks([...devices]);
            setSelectedDevice(undefined);
            setIsOpenModal(false);
            toast.success(`${device.name} has been updated`);
          } else {
            setIsOpenModal(false);
            setSelectedDevice(undefined);
          }
        })
        .catch(() => {
          setIsOpenModal(false);
          setSelectedDevice(undefined);
        })
        .finally(() => setDeviceUpdated(false));
    }
  }
  function handleToggle(e: React.ChangeEvent<HTMLInputElement>) {
    setChangedMetaInfo({
      ...changedMetaInfo,
      metaData: {
        ...changedMetaInfo.metaData,
        receivenotifications: e.target.checked,
      },
    });
  }
  return (
    <Box pl={3} pr={1}>
      <Modal
        open={isOpenModal}
        onClose={() => setIsOpenModal(!isOpenModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={
            matches
              ? { ...ModalContainer }
              : {
                  ...ModalContainer,
                  maxHeight: "60vh",
                  overflowY: "scroll",
                  minWidth: "95vw",
                }
          }
        >
          <h1 style={boldText}>Edit Tank</h1>
          <form
            onSubmit={handeleSubmit}
            style={{ width: "90%", alignItems: "center" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                // justifyContent: "space-evenly",
              }}
            >
              <Box mb={2}>
                <h4 style={InputLabel}>
                  Tank Name{" "}
                  {!changedMetaInfo.name && (
                    <span style={{ color: "red" }}>*</span>
                  )}
                </h4>
                <input
                  name={"name"}
                  onChange={handleChange}
                  value={changedMetaInfo.name}
                  required
                  style={inputbox}
                  className="input_box"
                  type={"text"}
                  placeholder={"Enter Device Name"}
                />
              </Box>
              <Box mb={2}>
                <h4 style={InputLabel}>
                  Tank ID{" "}
                  {!selectedDevice?.id && (
                    <span style={{ color: "red" }}>*</span>
                  )}
                </h4>
                <input
                  name={"id"}
                  readOnly={true}
                  value={selectedDevice?.id}
                  required
                  style={inputbox}
                  className="input_box"
                  type={"text"}
                  placeholder={"Device ID"}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <Box>
                <h4 style={InputLabel}>
                  Tank Capacity{" "}
                  <small>
                    (Liters){" "}
                    {!changedMetaInfo.metaData.settings.capacity && (
                      <span style={{ color: "red" }}>*</span>
                    )}
                  </small>
                </h4>
                <input
                  name={"capacity"}
                  onChange={handleChange}
                  value={changedMetaInfo.metaData.settings.capacity}
                  required
                  style={inputbox}
                  className="input_box"
                  type={"text"}
                  placeholder={"Enter Capacity"}
                />
              </Box>
              <Box>
                <h4 style={InputLabel}>
                  Tank Height <small>(mm)</small>
                  {!changedMetaInfo.metaData.settings.height && (
                    <span style={{ color: "red" }}>*</span>
                  )}
                </h4>
                <input
                  name={"height"}
                  onChange={handleChange}
                  value={changedMetaInfo.metaData.settings.height}
                  required
                  style={inputbox}
                  className="input_box"
                  type={"text"}
                  placeholder={"Enter Height"}
                />
              </Box>
              <Box>
                <h4 style={InputLabel}>
                  Tank Offset <small>(mm)</small>
                  {!changedMetaInfo.metaData.settings.offset && (
                    <span style={{ color: "red" }}>*</span>
                  )}
                </h4>
                <input
                  name={"offset"}
                  onChange={handleChange}
                  value={changedMetaInfo.metaData.settings.offset}
                  required
                  style={inputbox}
                  className="input_box"
                  type={"text"}
                  placeholder={"Enter offset"}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
              mt={2}
            >
              <Box>
                <h4 style={InputLabel}>
                  Water filled alert <small>(%)</small>
                  {!changedMetaInfo.waterlevelSensorAlert.critical_max && (
                    <span style={{ color: "red" }}>*</span>
                  )}
                </h4>
                <input
                  onChange={handleChange}
                  name={"max_alert"}
                  // value={changedMetaInfo.waterlevelSensorAlert?.critical_max}
                  required
                  defaultValue={
                    changedMetaInfo.waterlevelSensorAlert.critical_max
                  }
                  style={inputbox}
                  className="input_box"
                  type="number"
                  max={100}
                  disabled={
                    !selectedDevice?.sensors?.some?.(
                      (sensor: Sensor) => sensor.meta.kind === "WaterLevel"
                    )
                  }
                  title={
                    `${selectedDevice?.sensors?.some?.(
                      (sensor: Sensor) => sensor.meta.kind === "WaterLevel"
                    )}` && "No water level sensor!"
                  }
                  // placeholder={"Enter MaxAlert"}
                />
              </Box>
              <Box>
                <h4 style={InputLabel}>
                  Water low alert <small>(%)</small>
                  {!changedMetaInfo.waterlevelSensorAlert.critical_min && (
                    <span style={{ color: "red" }}>*</span>
                  )}
                </h4>
                <input
                  onChange={handleChange}
                  name={"min_alert"}
                  // min={0}
                  max={100}
                  // value={changedMetaInfo.waterlevelSensorAlert?.critical_min}
                  required
                  style={inputbox}
                  defaultValue={
                    changedMetaInfo.waterlevelSensorAlert.critical_min
                  }
                  className="input_box"
                  type="number"
                  placeholder={"Enter Minimum Alert"}
                  disabled={
                    !selectedDevice?.sensors?.some?.(
                      (sensor: Sensor) => sensor.meta.kind === "WaterLevel"
                    )
                  }
                  title={
                    `${selectedDevice?.sensors?.some?.(
                      (sensor: Sensor) => sensor.meta.kind === "WaterLevel"
                    )}` && "No water level sensor!"
                  }
                />
              </Box>
            </Box>
            <Box
              mt={2}
              mb={2}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <h4 style={InputLabel}>Notifications</h4>
              <Android12Switch
                onChange={handleToggle}
                name={"receivenotifications"}
                checked={changedMetaInfo.metaData.receivenotifications}
              />
            </Box>
            <Box mb={2}>
              <h4 style={InputLabel}>
                Address{" "}
                {changedMetaInfo.metaData.location.address && (
                  <span style={{ color: "red" }}>*</span>
                )}
              </h4>
              <input
                name={"address"}
                style={inputbox}
                type="text"
                onChange={handleChange}
                defaultValue={changedMetaInfo.metaData.location.address}
                placeholder="Address"
                required
              />
            </Box>
            <Box>
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <strong>Tank User Profile</strong>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  gap: "1rem",
                  flexDirection: "row",
                  mt: 1,
                  mb: 2,
                }}
              >
                <input
                  name={"first_name"}
                  style={inputbox}
                  type="text"
                  onChange={handleChange}
                  // value={changedMetaInfo.metaData.profile.first_name}
                  defaultValue={changedMetaInfo.metaData.profile.first_name}
                  placeholder="First name"
                />
                <input
                  name={"last_name"}
                  style={inputbox}
                  type="text"
                  onChange={handleChange}
                  // value={changedMetaInfo.metaData.profile.last_name}
                  defaultValue={changedMetaInfo.metaData.profile.last_name}
                  placeholder="Last name"
                />
                <input
                  name={"username"}
                  style={inputbox}
                  type="text"
                  onChange={handleChange}
                  // value={changedMetaInfo.metaData.profile.last_name}
                  defaultValue={changedMetaInfo.metaData.profile.username}
                  placeholder="Username"
                />
                <input
                  name={"phone"}
                  style={inputbox}
                  type="text"
                  onChange={handleChange}
                  // value={changedMetaInfo.metaData.profile.phone}
                  defaultValue={changedMetaInfo.metaData.profile.phone}
                  placeholder="Phone"
                />
              </Box>
            </Box>

            {/* <h4 style={InputLabel}>Sensors</h4>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "space-evenly",
              }}
            >
              {selectedDevice?.sensors
                .filter((sensor) => sensor.meta.kind === "WaterLevel")
                ?.map((sensor, id) => (
                  <p key={id} style={inputbox1} className="input_box">
                    {sensor.name}
                  </p>
                ))}
            </Box>
            <h4 style={InputLabel}>Actuators</h4>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {selectedDevice?.actuators?.map((actuator, id) => (
                <p key={id} style={inputbox1} className="input_box">
                  {actuator.name}
                </p>
              ))}
            </Box> */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {deviceUpdated && (
                <>
                  <button type="submit" style={ButtonStyle} className="button">
                    <SaveAlt sx={{ cursor: "pointer" }} />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => setIsOpenModal(!isOpenModal)}
                    style={cancelButtonStyle}
                  >
                    Cancel
                  </button>
                </>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <h4 style={InputLabel}>Remove tank?</h4>
              <button
                onClick={(e) =>
                  deleteAlert(e, selectedDevice?.id ? selectedDevice.id : "")
                }
                style={{ ...ButtonStyle, backgroundColor: "red", width: "40%" }}
                className="button"
              >
                <Delete sx={{ cursor: "pointer" }} />
                <span>Delete</span>
              </button>
            </Box>
          </form>
        </Box>
      </Modal>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {devices.length <= 0 && !loading && (
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: "10vh",
                  left: "20vw",
                }}
              >
                <Box component="img" src={FrameSVG} />
                <h3
                  style={{
                    fontSize: "40px",
                    textAlign: "center",
                    margin: "1px 0",
                  }}
                >
                  Hi there!
                </h3>
                <p
                  style={{
                    color: "#888992",
                    textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  Let's create your first device.
                </p>
              </Box>
            </Box>
          )}
          <Box sx={matches ? { ...SensorContainer } : { ...SensorContainer }}>
            {devices.map((device, id) => (
              <Stack
                key={id}
                p={1}
                sx={BoxStyle}
                alignItems={"start"}
                flexWrap="wrap"
                direction="column"
                alignContent={"center"}
                spacing={2}
                maxWidth="22rem"
              >
                <Stack
                  width={"100%"}
                  direction="row"
                  justifyContent={"space-between"}
                >
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "black",
                      lineHeight: 1.5,
                    }}
                  >
                    {device.name}
                    <p
                      style={{
                        color: "#888992",
                        fontWeight: "lighter",
                        textAlign: "center",
                        fontSize: 12,
                      }}
                    >
                      {device.id}
                    </p>
                  </h3>
                  <Box sx={{ display: "flex" }}>
                    {/* <Android12Switch checked={device.on}/> */}
                    <MdModeEdit
                      size={23}
                      style={{ cursor: "pointer" }}
                      onClick={(e: any) => handleSelectedTank(e, device)}
                    />
                  </Box>
                </Stack>
                <Box
                  p={1}
                  sx={{
                    borderRadius: 1,
                    width: "100%",
                    backgroundColor: "#fafafa",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      lineHeight: 1.8,
                    }}
                  >
                    <Box>
                      <article>Capacity </article>
                      <article>Height</article>
                    </Box>
                    <Box>
                      <article>
                        {device.meta?.settings.capacity}
                        <span> Liters</span>
                      </article>
                      <p>
                        {device.height}
                        <span> mm</span>
                      </p>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <FaLocationDot size={20} />
                    <strong style={{ color: "#E46B26" }}>Location</strong>
                  </Box>
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      flexDirection: "column",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      width: "100%",
                      position: "inherit",
                      gap: 1,
                      backgroundColor: "#fafafa",
                      flexWrap: "wrap",
                    }}
                  >
                    {device.meta?.location.address ? (
                      <small>{device.meta?.location.address}</small>
                    ) : (
                      <small style={{ color: "orange" }}>
                        Add location for this tank!
                      </small>
                    )}
                    {/* <Box sx={fRow}>
                    <GoPerson />
                    <small>
                      {device.meta.profile.first_name +
                        " " +
                        device.meta.profile.last_name}
                    </small>
                  </Box>
                  <Box sx={fRow}>
                    <CiPhone />
                    <small>{device.meta.profile.phone}</small>
                  </Box> */}
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <MdSensors size={23} />
                    <strong style={{ color: "#E46B26" }}>Sensors</strong>
                  </Box>
                  {!device?.sensors?.some?.(
                    (sensor: Sensor) => sensor.meta.kind === "WaterLevel"
                  ) ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <TbAlertHexagon size={23} />
                      <small style={{ color: "orange" }}>
                        No majiup sensors detected
                      </small>
                    </Box>
                  ) : null}

                  {device?.sensors
                    ?.filter(
                      (sensor: Sensor) => sensor.meta.kind === "WaterLevel"
                    )
                    ?.map((sensor, idx) => (
                      <Box key={idx} width={"100%"} lineHeight={1.8}>
                        <Box>
                          <small>{sensor.name}</small>
                          {sensor.meta.critical_max === 0 &&
                            sensor.meta.critical_min === 0 && (
                              <small style={{ color: "orange" }}>
                                {" - "}
                                {sensor.name} alerts not configured properly
                              </small>
                            )}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            backgroundColor: "#fafafa",
                            padding: "0.5rem",
                            borderRadius: "4px",
                          }}
                        >
                          <small>
                            Max Alert: {sensor.meta?.critical_max}%{" "}
                          </small>
                          <small>Min Alert: {sensor.meta?.critical_min}%</small>
                          {sensor.meta?.kind === "WaterLevel" && (
                            <small></small>
                          )}
                          {sensor.meta?.kind === "WaterThermometer" && (
                            <small>Deg</small>
                          )}
                          {sensor.meta?.kind === "WaterPollutantSensor" && (
                            <small>PPM</small>
                          )}
                        </Box>
                      </Box>
                    ))}
                </Box>
                {/* <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              {device.actuators?.length > 0 ? (
                ""
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TbAlertHexagon size={23} />
                  <small style={{ color: "orange" }}>No pumps connected</small>
                </Box>
              )}
              {device.actuators?.map((actuator, idx) => (
                <Stack
                  key={idx}
                  width={"100%"}
                  direction="row"
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <h3 style={{ fontSize: "13px", fontWeight: "200" }}>
                    {actuator.name}
                  </h3>
                </Stack>
              ))}
            </Box> */}
              </Stack>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

export default SettingsPage;
