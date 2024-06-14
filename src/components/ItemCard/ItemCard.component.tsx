import { Box, Stack } from "@mui/material";
type Props = {
  name: string;
  amount: number;
  litresPercent: number;
  handleOpen: () => void;
  open: boolean;
  handleClose: () => void;
  temp: number;
  isOn: boolean;
  modified: any;
};
import TankSVG from "../../assets/tank.svg";
import { useNavigate } from "react-router-dom";
import { TbAlertHexagon } from "react-icons/tb";
import { getLastSeen } from "../../utils/timeFormatter";
const COMMON_P = {
  fontSize: "16px",
  paddingTop: "16px",
};
function ItemCardComponent({ name, modified, amount, isOn }: Props) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/settings");
  };

  const lastSeen = getLastSeen(modified);

  // const lastSeen = getLastSeen();

  // Determine the appropriate time unit to display

  return (
    <Box
      sx={{
        ":hover": {
          bgcolor: "#FFE6D9",
          // boxShadow: "0 4px 26px rgba(0, 0, 0, 0.25)",
        },
        cursor: "pointer",
        transition: ".5s",
        borderRadius: "5px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
        }}
      >
        <Stack direction={"row"}>
          <Box
            component={"img"}
            src={TankSVG}
            sx={{
              width: "16px",
              height: "38.33px",
              marginRight: "10px",
            }}
          />
          {
            <Box>
              <h3 style={{ fontSize: "20px", fontWeight: "normal" }}>{name}</h3>
              {amount ? (
                <p style={COMMON_P}>Quantity</p>
              ) : (
                <p style={{ ...COMMON_P, color: "orange", fontSize: "90%" }}>
                  Click to set up
                </p>
              )}
              {/* <p style={COMMON_P}>Days to refill</p> */}
              {/* <p style={COMMON_P} >Temperature:</p> */}
            </Box>
          }
        </Stack>
        <Box>
          <h3
            style={
              isOn
                ? { fontSize: "16px", color: "#85ea2d" }
                : { fontSize: "16px", color: "#888992" }
            }
          >
            {lastSeen ? (
              isOn ? (
                "Active"
              ) : (
                `${lastSeen}`
              )
            ) : (
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
                onClick={handleNavigate}
              >
                <TbAlertHexagon size={23} color="#E46B26" />
                <h3
                  style={{
                    fontSize: "14px",
                    color: "#E46B26",
                    cursor: "pointer",
                  }}
                >
                  Finish Setup
                </h3>
              </Box>
            )}
          </h3>
          {lastSeen && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignSelf: "flex-end",
              }}
            >
              <p
                style={{
                  float: "inline-end",
                  paddingTop: "16px",
                  fontSize: "18px",
                  alignSelf: "flex-end",
                }}
              >
                {amount} Litres
              </p>
              {/* <p
                style={{
                  float: "inline-end",
                  paddingTop: "16px",
                  fontSize: "18px",
                  alignSelf: "flex-end",
                }}
              >
                8 Days
              </p> */}
            </Box>
          )}
          {/* <p style={{fontSize: '14px', color: '#E46B26'}}>{amount}</p> */}
          {/* <p style={{fontSize: '14px', color: '#E46B26'}}>{temp}&#8451;</p> */}
        </Box>
      </Box>
    </Box>
  );
}

export default ItemCardComponent;
