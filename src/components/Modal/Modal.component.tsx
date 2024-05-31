import "./Modals.styles.css";
// import {WaterDrop, } from '@mui/icons-material';
import { Modal } from "@mui/material";
import "./Modals.styles.css";
import { useContext } from "react";
import { DevicesContext } from "../../context/devices.context";
type ModalComponentProps = {
  open: boolean;
  handleClose: () => void;
  ref?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
};

// import { } 'react-icon'

// import TankSVG from "../../assets/tank_sett.svg";
import RoundTankSVG from "../../assets/round_tank.svg";
// import FireHydrantSVG from "../../assets/fire_hydrant.svg";
// import FireHydrantSVG1 from "../../assets/fire_hydrant1.svg";
const ImageStyle = { height: 40, width: 40 };
function ModalComponent({ open, handleClose, children }: ModalComponentProps) {
  const styles = {
    modalContainer: {
      backgroundColor: "#fff",
      padding: 2,
    },
    rowContainer: {
      display: "flex",
      alignItems: "center",
    },
    headerText: { fontSize: "20px", fontWeight: "normal" },
    infoContainer: {
      border: "1px solid #000",
      height: "fit-content",
      borderRadius: "10px",
      display: "flex",
      margin: "10px 5px",
      padding: "5px",
      alignItems: "center",
      width: "fit-content",
      gap: "4px",
      alignContent: "center",
      letterSpacing: "1px",
    },
    titleBold: {
      display: "flex",
    },
  };
  const { devices, setReportRef } = useContext(DevicesContext);
  // const notifications=0;
  // const notifications = devices.reduce((acc,dev)=> dev.notifications.length>0?(acc+dev.notifications.length):0,0);
  const totalLiters = devices.reduce((acc, dev) => acc + dev.liters, 0);
  const divEl = document.querySelector("#divEl");
  if (divEl !== null) {
    setReportRef(divEl as HTMLDivElement);
  }
  const { profile } = useContext(DevicesContext);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            border: "none",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            maxWidth: "80%",
            alignContent: "center",
            height: "80dvh",
            overflowY: "auto",
          }}
        >
          <div
            id="divEl"
            style={{
              lineHeight: 2,
            }}
          >
            {/* <div style={{display: 'flex', alignItems: 'center'}}>
							<WaterDrop style={{fontSize: '20px', color: '#4592F6'}}/>
							<h1  style={{...styles.headerText}}>MajiUp</h1>
						</div> */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p style={{ fontSize: "16px", fontWeight: "bold" }}>Report</p>
              <p style={{ fontSize: "16px", fontWeight: "normal" }}>
                {new Date().toDateString()}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #000",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>Name:</p>
                <p style={{ fontSize: "16px", fontWeight: "normal" }}>
                  &nbsp; {profile?.first_name} {profile?.last_name}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>Address:</p>
                <p style={{ fontSize: "14px", fontWeight: "normal" }}>
                  &nbsp; {profile?.address}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>Phone:</p>
                <p style={{ fontSize: "14px", fontWeight: "normal" }}>
                  &nbsp; +{profile?.phone}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>Email:</p>
                <p style={{ fontSize: "16px", fontWeight: "normal" }}>
                  &nbsp; {profile?.email}
                </p>
              </div>
            </div>
            <div style={{ padding: "1vw" }}>
              <strong>Overview</strong>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {/* <div style={styles.infoContainer}>
                  <img src={TankSVG} style={ImageStyle} />
                  <div style={{ lineHeight: 1 }}>
                    <article style={styles.titleBold}>
                      {devices.length} Tanks
                    </article>
                    <article style={{ fontSize: "16px", color: "#14AE5D" }}>
                      Good condition
                    </article>
                  </div>
                </div> */}
                {/* <div style={styles.infoContainer}>
									<img src={NotificationSVG} style={ImageStyle} />
									<div>
										<p style={styles.titleBold} >
											<strong>{notifications}</strong>
										</p>
									</div>
								</div> */}
                <div style={styles.infoContainer}>
                  <img src={RoundTankSVG} style={ImageStyle} />
                  <div>
                    <article style={styles.titleBold}>
                      <strong>{totalLiters}</strong> &nbsp; Ltrs used
                    </article>
                  </div>
                </div>
                {/* <div style={styles.infoContainer}>
                  <img src={FireHydrantSVG} style={ImageStyle} />
                  <div>
                    <strong style={styles.titleBold}>53 hrs</strong>
                  </div>
                  <article>Running</article>
                </div> */}
                {/* <div style={styles.infoContainer}>
                  <img src={FireHydrantSVG1} style={ImageStyle} />
                  <article>Activated</article>
                  <div>
                    <strong style={styles.titleBold}>26 times</strong>
                  </div>
                </div> */}
              </div>
              {children}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default ModalComponent;
