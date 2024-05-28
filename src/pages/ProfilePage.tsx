import { Box, Button, Modal } from "@mui/material";
import { DevicesContext, Profile } from "../context/devices.context";
import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/imgs/logo.png";
import { IoPersonOutline } from "react-icons/io5";

import axios, { AxiosResponse } from "axios";

import {
  ButtonStyle,
  cancelButtonStyle,
  fColumn,
  fRow,
  inputbox,
  ModalContainer,
} from "./SettingsPage";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";

export default function ProfilePage() {
  const { profile, loadingProfile } = useContext(DevicesContext);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [profileChanged, setProfileChanged] = useState<boolean>(false);

  const BoxStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "start",
    flexDirection: "column",
    minHeight: "50dvh",
    width: "40rem",
    maxWidth: "40rem",
    borderRadius: "4px",
    boxShadow: "0 0 4px gray",
    padding: "1rem",
    position: "relative",
  };

  const ProfileBox: React.CSSProperties = {
    backgroundColor: "#fff",
    borderRadius: "50%",
    display: "flex",
    border: "solid 1px gray",
  };

  const iconSize = 25;

  const DefaultProfile: Profile = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    username: "",
    address: "",
  };

  const [updatedProfileInfo, setUpdatedProfileInfo] = useState<{
    profile: Profile;
  }>({
    profile: profile ?? DefaultProfile,
  });

  //   console.log(updatedProfileInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((profile as undefined) !== updatedProfileInfo) {
      setProfileChanged(true);
    } else {
      setProfileChanged(false);
    }

    const newProfile = {
      ...updatedProfileInfo.profile,
      [e.target.name]: e.target.value,
    };

    setUpdatedProfileInfo({
      profile: newProfile,
    });
  };

  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const sendUpdateReq = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/gateway-profile`,
        updatedProfileInfo,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if ((sendUpdateReq.status = 200)) {
        setModalOpen(false);
      }
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    if (profile) {
      setUpdatedProfileInfo({ profile });
    }
  }, [profile]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        minHeight: "50dvh",
        marginTop: "5%",
      }}
    >
      <Modal
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              ...ModalContainer,
              minHeight: "fit-content",
              minWidth: "fit-content",
            }}
          >
            <h2>Edit Profile</h2>
            <Box mt={2}>
              <form onSubmit={updateProfile}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(18rem, 1fr))",
                    gap: "1rem",
                  }}
                >
                  <Box mb={2}>
                    <label htmlFor="">First Name</label>
                    <input
                      name="first_name"
                      type="text"
                      defaultValue={profile?.first_name}
                      style={{ ...inputbox }}
                      placeholder="First name"
                      onChange={handleChange}
                    />
                  </Box>
                  <Box mb={2}>
                    <label htmlFor="">Last Name</label>
                    <input
                      name="last_name"
                      type="text"
                      defaultValue={profile?.last_name}
                      style={inputbox}
                      placeholder="Last name"
                      onChange={handleChange}
                    />
                  </Box>
                  <Box mb={2}>
                    <label htmlFor="">Username</label>
                    <input
                      name="username"
                      type="text"
                      defaultValue={profile?.username}
                      style={inputbox}
                      placeholder="Username"
                      onChange={handleChange}
                    />
                  </Box>
                  <Box mb={2}>
                    <label htmlFor="">Phone</label>
                    <input
                      name="phone"
                      type="text"
                      defaultValue={profile?.phone}
                      style={inputbox}
                      placeholder="Phone"
                      onChange={handleChange}
                    />
                  </Box>
                  <Box mb={2}>
                    <label htmlFor="">Email</label>
                    <input
                      name="email"
                      type="email"
                      defaultValue={profile?.email}
                      style={inputbox}
                      placeholder="Email"
                      onChange={handleChange}
                    />
                  </Box>
                  <Box mb={2}>
                    <label htmlFor="">Address</label>
                    <input
                      name="address"
                      type="text"
                      defaultValue={profile?.address}
                      style={inputbox}
                      placeholder="Address"
                      onChange={handleChange}
                    />
                  </Box>
                </Box>
                <Box mt={4} sx={{ ...fRow }}>
                  <button
                    style={{
                      ...cancelButtonStyle,
                      minWidth: "fit-content",
                      maxWidth: "10rem",
                      padding: "0.8rem",
                    }}
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>

                  {profileChanged && (
                    <button
                      style={{
                        ...ButtonStyle,
                        minWidth: "fit-content",
                        maxWidth: "10rem",
                        padding: "0.8rem",
                      }}
                    >
                      Submit
                    </button>
                  )}
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Modal>
      {loadingProfile ? (
        <p>Loading...</p>
      ) : (
        <Box sx={BoxStyle}>
          <Box sx={{ position: "absolute", right: "2%", cursor: "pointer" }}>
            <BiDotsVerticalRounded
              size={25}
              onClick={() => setModalOpen(true)}
            />
          </Box>
          <Box sx={{ ...fRow, alignItems: "center" }}>
            <Box sx={ProfileBox}>
              <img
                style={{ width: "5rem", aspectRatio: 1, padding: "0.5rem" }}
                src={logo}
                alt="Profile logo"
              />
            </Box>
            <Box
              sx={{
                ...fColumn,
                alignItems: "start",
                gap: "4px",
              }}
            >
              <Box sx={{ ...fRow }}>
                <Box sx={fRow}>
                  <p>{profile?.first_name}</p>
                  <p>{profile?.last_name}</p>
                </Box>
              </Box>
              <Box>
                <p>@{profile?.username}</p>
              </Box>
            </Box>
          </Box>
          <Box sx={{ ...fColumn, marginTop: "2rem", gap: "1rem" }}>
            <Box sx={{ ...fRow, alignItems: "center" }}>
              <FaLocationDot size={iconSize} color="#29ABE2" />
              <p>{profile?.address}</p>
            </Box>
            <Box sx={{ ...fRow, alignItems: "center" }}>
              <MdMarkEmailRead size={iconSize} color="#29ABE2" />
              <p>{profile?.email}</p>
            </Box>
            <Box sx={{ ...fRow, alignItems: "center" }}>
              <FaPhoneAlt size={iconSize} color="#29ABE2" />
              <p>{profile?.phone}</p>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
