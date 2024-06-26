/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useRef,
  useContext,
  useLayoutEffect,
  useEffect,
} from "react";
import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
// import { ApexAxisChartSeries,ApexCharts, ApexNonAxisChartSeries } from 'apexcharts';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import StickyHeadTable from '../components/TableComponent/Table.component';
// import DownloadSVG from '../assets/download.svg';
import ModalComponent from "../components/Modal/Modal.component";
// import jsPDF from 'jspdf';
import { Analytics, DevicesContext, Time } from "../context/devices.context";
// import CanvasJSReact from '@canvasjs/react-charts';
import Chart from "react-apexcharts";
// import { X as Device } from '../context/devices.context';
// import html2canvas from 'html2canvas';
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const date = new Date();
const todaysDate = `${
  months[date.getMonth()]
}, ${date.getDate()}, ${date.getFullYear()}`;
import { getConsumption } from "../utils/consumptionHelper";
// const ReportsActiveText={
//     cursor: 'pointer',
//     color: '#2C2D38',
//     padding: '0 .4vw',
//     fontSize: '13px'
// }
type SelectedTankInfo = {
  name: string;
  litres: number;
  id: string;
  analytics?: Analytics;
  consumption: {
    x: number;
    y: number;
  }[];
};
// const ReportsText={cursor: 'pointer',color: '#9291A5',padding: '0 .4vw',fontSize: '13px' }
export type Consumption = {
  time: string;
  liters: number;
  waterLevel: number;
  waterQuality: string;
  waterTemperature: number;
};

const dateStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const dateInput: React.CSSProperties = {
  padding: "6px",
  borderRadius: "2rem",
  outline: "none",
  border: "none",
  backgroundColor: "#4592F6",
  color: "#fff",
};
function BillingsPage() {
  const { devices, loading, fetchData } = useContext(DevicesContext);

  const [fromTo, setFromTo] = useState<Time>({});

  const [selectedTank, setSelectedTank] = useState<SelectedTankInfo>({
    name: "",
    litres: 0,
    analytics: {
      average: {
        daily: 0,
        hourly: 0,
      },
      durationLeft: 0,
      trend: {
        amountUsed: 0,
        days: 0,
        indicator: "",
        value: 0,
      },
    },
    id: "",
    consumption: [],
  });
  const [selectedTableTank, setSelectedTableTank] = useState<{
    consumption: Consumption[];
  }>({ consumption: [] });
  // const [optionsToRender, setOptionsToRender] = useState({});

  const [apexOptionsToRender, setApexOptionsToRender] = useState<
    { options: any; series: any } | { options: any; series: any }
  >({ options: {}, series: [] });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const reportTemplateRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  // const handleGeneratePdf = () => {
  //     setIsOpenModal(!isOpenModal)
  //     setIsOpenModal(!isOpenModal)
  //     document.body.appendChild(reportRef as HTMLDivElement);
  //     html2canvas(reportRef as HTMLDivElement)
  //     .then((canvas) => {
  //         const imgData = canvas.toDataURL('image/png');
  //         const pdf = new jsPDF();
  //         pdf.addImage(imgData, 'JPEG', 15, 4, 180, 160);
  //         pdf.save("download.pdf");
  //         document.body.removeChild(reportRef as HTMLDivElement);
  //     })
  //     .catch((err) => alert(err));
  // };
  // async function handleSelectedTableTank(event: React.ChangeEvent<HTMLSelectElement>) {
  //     const selectedTableTank1 = devices.filter((device: Device) => device.id === event.target.value)[0];
  //     if (selectedTableTank1) {
  //         const responseData =await getConsumption(selectedTableTank1.id, selectedTableTank1.capacity, selectedTableTank1.height);
  //         setSelectedTableTank({
  //             consumption: (responseData as Consumption[])
  //         });
  //     }
  // }
  useLayoutEffect(() => {
    setSelectedTank({
      ...selectedTank,
      id: "All",
    });
  }, []);
  useEffect(() => {
    if (devices.length >= 1) {
      const getData = async () => {
        const responseData = await getConsumption(
          devices[0].id,
          devices[0].height,
          devices[0].capacity
        );

        setSelectedTableTank({
          consumption: responseData as Consumption[],
        });
      };
      getData();
      if (selectedTank.id === "All") {
        setSelectedTank({
          ...selectedTank,
          consumption: devices[0].consumption ?? [],
          litres: devices.reduce((acc, curr) => {
            if (curr.analytics) {
              return acc + (curr.analytics.trend.amountUsed || 0); // Ensure the value is a number
            }
            return acc;
          }, 0),
        });
        setApexOptionsToRender((prev) => {
          return {
            ...prev,
            series: [
              ...devices.map((d) => ({
                name: d.name,
                data: d.consumption
                  ? d?.consumption.map((device4) => device4.y)
                  : [],
              })),
            ],
            options: {
              chart: {
                height: matches ? 500 : 380,
                type: "rangeArea",
              },
              // colors:['#4592F6','#00e396',"orange","black","purple"],
              dataLabels: {
                enabled: false,
              },

              stroke: {
                curve: "smooth",
                width: 2,
              },
              title: {
                text: "Water Consumption",
                align: "left",
              },
              yaxis: {
                min: 0,
                // max: deviceFound?.meta.settings.capacity,
              },
              xaxis: {
                categories: devices[0]?.consumption
                  ? devices[0]?.consumption.map((d) => d.x)
                  : [],
                tickAmount: matches ? 4 : 4,
              },
            },
          };
        });
        return;
      }
      const deviceFound = devices.find((dxy) => dxy.id === selectedTank.id);
      if (deviceFound) {
        setSelectedTank({
          id: deviceFound.id,
          consumption: deviceFound.consumption,
          name: deviceFound.name,
          litres: deviceFound.liters,
          analytics: deviceFound.analytics,
        });
        setApexOptionsToRender((prev) => {
          return {
            ...prev,
            series: [
              {
                name: deviceFound.name,
                data: deviceFound.consumption
                  ? deviceFound.consumption.map((x) => x.y)
                  : [],
              },
            ],
            options: {
              chart: {
                height: matches ? 500 : 380,
                type: "rangeArea",
              },
              // colors: ["#4592F6"],
              yaxis: {
                min: 0,
                max: deviceFound?.meta.settings.capacity,
              },
              xaxis: {
                categories: deviceFound?.consumption
                  ? deviceFound?.consumption.map((d) => d.x)
                  : [],
                tickAmount: matches ? 4 : 4,
              },
              stroke: {
                curve: "smooth",
                width: 2,
              },
            },
          };
        });
        return;
      }
    }
  }, [devices.length]);
  useEffect(() => {
    if (selectedTank.id === "All") {
      setSelectedTank({
        id: "All",
        name: "All",
        consumption: [],
        // litres: devices.reduce((acc, curr) => acc + curr.liters, 0),
        litres: devices.reduce((acc, curr) => {
          if (curr.analytics) {
            return acc + (curr.analytics.trend.amountUsed || 0); // Ensure the value is a number
          }
          return acc;
        }, 0),
      });
      setApexOptionsToRender((prev) => {
        return {
          ...prev,

          series: [
            ...devices.map((d) => ({
              name: d.name,
              data: d.consumption
                ? d?.consumption.map((device4) => device4.y)
                : [],
            })),
          ],
          options: {
            chart: {
              height: matches ? 500 : 380,
              type: "area",
            },
            //   colors: ["#4592F6", "#00e396"],
            dataLabels: {
              enabled: false,
            },

            stroke: {
              curve: "smooth",
              width: 2,
            },

            title: {
              // text: 'Water Consumption',
              align: "left",
            },
            yaxis: {
              min: 0,
              // max: deviceFound?.meta.settings.capacity,
            },
            xaxis: {
              categories: devices[0]?.consumption
                ? devices[0]?.consumption.map((d) => d.x)
                : [],
              tickAmount: matches ? 4 : 4,
            },
          },
        };
      });
      return;
    }
    const deviceFound = devices.find((dxy) => dxy.id === selectedTank.id);
    if (deviceFound) {
      setSelectedTank({
        id: deviceFound.id,
        consumption: deviceFound.consumption,
        name: deviceFound.name,
        litres: deviceFound.analytics?.trend.amountUsed,
        analytics: deviceFound.analytics,
      });
      setApexOptionsToRender((prev) => {
        return {
          ...prev,

          series: [
            {
              name: deviceFound.name,
              data: deviceFound.consumption
                ? deviceFound.consumption.map((x) => x.y)
                : [],
            },
          ],
          options: {
            chart: {
              height: matches ? 500 : 380,
              type: "rangeArea",
            },
            //   colors: ["#4592F6"],
            xaxis: {
              categories: deviceFound?.consumption
                ? deviceFound?.consumption.map((d) => d.x)
                : [],
              tickAmount: matches ? 4 : 4,
            },
            yaxis: {
              min: 0,
              max: deviceFound?.meta.settings.capacity,
            },
            stroke: {
              curve: "smooth",
              width: 2,
            },
          },
        };
      });
      return;
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTank.id]);
  // const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  // function handleToggle(event: React.ChangeEvent<HTMLSelectElement>) {
  //   if (event.target.value === "minutes") {
  //     fetchInMinutes();
  //   } else {
  //     // fetchinHours();
  //   }
  // }
  if (!devices && !selectedTableTank.consumption) {
    return <article>Loading</article>;
  }

  const refetchData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "from") {
      setFromTo((prev) => {
        return {
          ...prev,
          from: new Date(e.target.value + "+03:00"),
        };
      });
    } else if (e.target.name === "to") {
      setFromTo((prev) => {
        return {
          ...prev,
          to: new Date(e.target.value + "+03:00"),
        };
      });
    }

    if (fromTo.to && fromTo.to) {
      // if (difference )
      // toast.error("Duration should be more than 1 hour");
      fetchData({ from: fromTo.from, to: fromTo.to });
      // setSelectedTank({
      //   ...selectedTank,
      //   id: "All",
      // });
    }
  };

  return (
    <Box pl={3} pr={1}>
      <ModalComponent
        handleClose={() => {
          setIsOpenModal(!isOpenModal);
        }}
        open={isOpenModal}
      >
        <div>
          <h3 style={{ fontSize: "16px", margin: "10px 0" }}>
            Consumption Chart
          </h3>
          <div
            style={{
              border: "1px solid black",
              padding: "8px 10px",
              borderRadius: "4px",
            }}
          >
            <p style={{ color: "#9291A5", margin: "10px 0" }}>
              Water Consumption, {new Date().toDateString()}
            </p>
            {/* <article style={{margin:'10px 0', fontSize:'small'}}>{isNaN(selectedTank.litres)?0:selectedTank.litres} {selectedTank.id==='All'?'totallitres consumed':'Litres'} </article> */}
            {/* <CanvasJSChart options={optionsToRender}/> */}
            <Chart
              options={apexOptionsToRender.options}
              series={apexOptionsToRender.series}
              type={"area"}
              height={matches ? 500 : 380}
            />
          </div>
        </div>
        {/* {
                    selectedTableTank.consumption?(
                        <>
                            <h4 style={{margin:'10px'}}>Data History</h4>
                            <StickyHeadTable 
                                rows1={selectedTableTank.consumption}
                            />
                        </>
                    ):''
                } */}
      </ModalComponent>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            ref={reportTemplateRef}
            sx={{
              display: "flex",
              gap: matches ? "2rem" : "0.5rem",
              flexWrap: "wrap",
              alignItems: "center",
              mb: "8px",
            }}
          >
            <Box
              sx={{
                border: "1px solid #ccc",
                padding: "5px 0",
                minWidth: "200px",
                width: "20%",
                borderRadius: "2rem",
                overflow: "hidden",
                borderColor: "#4592F6",
                position: "relative",
                zIndex: 1,
              }}
            >
              <label
                style={{
                  background: "#4592F6",
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: "#fff",
                  padding: "5px 7px",
                  // position: "absolute",
                  top: 0,
                  // borderTopLeftRadius: "inherit",
                  // borderBottomLeftRadius: "inherit",
                  // height: "100%",
                }}
                htmlFor="devs"
              >
                Tank
              </label>
              <select
                onChange={(event) => {
                  setSelectedTank({ ...selectedTank, id: event.target.value });
                }}
                style={{
                  border: "none",
                  outline: "none",
                  width: "65%",
                  background: "none",
                  color: "#4592F6",
                  right: "50%",
                }}
                name="tanks"
                id="tanks"
              >
                <option value="All">All</option>
                {devices.map((device, idx) => (
                  <option key={idx} value={device.id}>
                    {device.name}
                  </option>
                ))}
              </select>
            </Box>
            <Box sx={dateStyle}>
              <label style={{ width: "2.5rem" }} htmlFor="from">
                From
              </label>
              <input
                style={dateInput}
                name="from"
                id="from"
                type="datetime-local"
                onChange={(e): void => refetchData(e)}
              />
            </Box>
            <Box sx={dateStyle}>
              <label style={{ width: "2.5rem" }} htmlFor="to">
                To
              </label>
              <input
                // defaultValue={formatTime(new Date())}
                style={dateInput}
                name="to"
                id="to"
                type="datetime-local"
                onChange={(e): void => refetchData(e)}
              />
            </Box>
          </Box>
          <Box
            p={2}
            sx={{ width: "100%", bgcolor: "#fff", borderRadius: "8px" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                bgcolor: "#fff",
                borderRadius: "5px",
                marginTop: "10px",
              }}
            >
              <p style={{ color: "#9291A5", fontSize: "12px" }}>
                Water Consumption, {todaysDate}
              </p>
              <Box
                p={1}
                sx={{
                  display: "flex",
                  bgcolor: "#F3F8FF",
                  borderRadius: "5px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              ></Box>
            </Box>
            <br />
            <strong>
              {!isNaN(selectedTank.litres) && selectedTank?.litres.toFixed(0)}
              {" Litres used "}
              {selectedTank.id === "All" && " - All tanks"}
            </strong>
            {selectedTank.consumption ? (
              <Chart
                options={apexOptionsToRender.options}
                series={apexOptionsToRender.series}
                type={"area"}
                height={matches ? 500 : 380}
              />
            ) : (
              <Box
                sx={{
                  paddingTop: "2rem",
                }}
              >
                <p style={{ color: "orange" }}>No information for this tank!</p>
              </Box>
            )}
          </Box>
        </>
      )}
      {/* <Box sx={{padding: '10px 15px',margin: '10px 0',width: '100%', bgcolor: "#fff",borderRadius: "5px",}}>
                <article>Report</article>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, atque aliquid. Consectetur architecto recusandae voluptatibus libero aperiam, molestias esse, dolores minima sed porro voluptatum facere possimus laboriosam iusto voluptatem! Dolorem.
                </div>
            </Box> */}
      {/* <Box sx={{padding: '10px 15px',margin: '10px 0',width: '100%', bgcolor: "#fff",borderRadius: "5px",}}>
                <Box sx={{padding: '10px 5px',margin: '10px 0',width: '100%',display: 'flex',alignItems: 'center', bgcolor: "#fff",borderRadius: "5px",}}>
                    <Box sx={{border: '1px solid #ccc',marginRight:'5px', padding:'5px', width: '75%', borderRadius: '20px'}}>
                        <select onChange={(e)=>handleSelectedTableTank(e)} style={{border: 'none', width: '100%',outline: 'none', background: 'none'}} name="devs" id="devs">
                            {
                                devices.map((device,idx)=>(
                                    <option key={idx} value={device.id}>{device.name}</option>
                                ))
                            }
                        </select>
                    </Box>
                    <Box sx={{alignItems:'center', display: 'flex',padding :'.5vw', borderRadius: "5px",justifyContent: 'space-between',}}>
                        <AssessmentIcon sx={{ color: '#666666',cursor: 'pointer', margin: '0 10px'}}/>
                        <Box onClick={handleGeneratePdf} sx={{bgcolor: '#F5F5F5', cursor: 'pointer', width: '100px',borderRadius:'4px', padding: '4px', display: 'inline-flex',alignItems:'center', fontSize: '13px'}}>
                            <Box alt="download" sx={{width: '20px', color: '#666666'}} component="img" src={DownloadSVG}/>
                            <p style={{ fontWeight: 'bold'}}>Generate</p>
                        </Box>
                    </Box>
                </Box>                
                <div>
                    <h4 style={{margin:'10px 0'}}>Data History</h4>
                    {
                        selectedTableTank.consumption?(
                            <StickyHeadTable 
                                rows1={selectedTableTank.consumption}
                            />
                        ):''
                    }
                </div>
            </Box> */}
    </Box>
  );
}

export default BillingsPage;
