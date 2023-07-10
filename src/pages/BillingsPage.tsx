/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useContext,useLayoutEffect, useEffect } from 'react';
import { Box} from '@mui/material';
import { Visibility} from '@mui/icons-material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import StickyHeadTable from '../components/TableComponent/Table.component';
import DownloadSVG from '../assets/download.svg';
import ModalComponent from '../components/Modal/Modal.component';
import jsPDF from 'jspdf';
import { DevicesContext } from '../context/devices.context';
import CanvasJSReact from '@canvasjs/react-charts';
// import ReportcardComponent from '../components/ReportCard/Reportcard.component';
import DocumentComponent from '../components/Document/Document.component';
import { X as Device } from '../context/devices.context';
import { PDFDownloadLink } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
const ReportsActiveText={
    cursor: 'pointer', 
    color: '#2C2D38',
    padding: '0 .4vw',
    fontSize: '13px'
}
type SelectedTankInfo = {
    name: string,
    litres: number,
    id: string,
    consumption: {
        x: number,
        y: number
    }[]
}
const ReportsText={cursor: 'pointer',color: '#9291A5',padding: '0 .4vw',fontSize: '13px' }
type Consumption = {
    time: string,
    litres: number
    level: number
    quality: string
    temp: number
}
function getLitres(capacity: number, height: number,level: number): number{
    return (level/height)*capacity;
}
function getWaterQuality(tds: number){
    if (tds>0 && tds<300) {
        return 'Excellent'
    }else if(tds>300 &&tds<900){
        return'Good'
    }else if(tds>900){
        return 'Poor'
    }else{
        return('Not satisfied');
    }
}
function BillingsPage() {
    const { devices, reportRef} = useContext(DevicesContext)
    const [selectedTank, setSelectedTank] = useState<SelectedTankInfo>({name: '', litres:0, id: '', consumption:[]});
    const [selectedTableTank,setSelectedTableTank] = useState<{consumption: Consumption[]}>([]);
    const [optionsToRender, setOptionsToRender] = useState({})
    const options = {
        axisX:{
            gridThickness: 0,
            tickLength: 0,
            interval: 2,
        },
        axisY:{
            interval: 2,
            gridLegend: 'none',
        },
        data: [
            {
                type: "column",
                dataPoints: selectedTank.consumption? selectedTank?.consumption.filter((_,i)=>i%2):[]
            }
        ]
    }
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const reportTemplateRef = useRef<HTMLDivElement>(null);
    const handleGeneratePdf = () => {
        console.log('reportTemplateRef',reportRef)
        console.log('REf current state is: ',reportTemplateRef.current)
        html2canvas(reportRef)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            console.log('====================================');
            console.log(imgData);
            setImage(imgData)
            console.log('====================================');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);

            pdf.save("download.pdf");
        })
        .catch((err) => console.log(err));
		// const doc = new jsPDF({
		// 	format: 'a4',
		// 	unit: 'px',
		// });

		// // Adding the fonts.
		// // doc.setFont('Inter-Regular', 'normal');
        // // doc.setFillColor({ch1: 'black'})
		// doc.html(reportRef.current?.innerHTML as HTMLDivElement, {
		// 	callback(doc) {
		// 		doc.save('report_document');
		// 	},
		// });
	};
    function handleSelectedTableTank(event: React.ChangeEvent<HTMLSelectElement>) {
        console.log(event.target.value)
        const selectedTableTank1 = devices.filter((device: Device) => device.id === event.target.value)[0];
        console.log('Selected table tank', selectedTableTank1)
        if (selectedTableTank1) {
            setSelectedTableTank({
                consumption: [
                    // ...selectedTableTank.consumption,
                    {
                        time: `${selectedTableTank1.modified?  new Date(selectedTableTank1?.modified).getHours(): ''}:${selectedTableTank1.modified?new Date(selectedTableTank1?.modified).getMinutes():''}`,
                        litres:  selectedTableTank1.liters,
                        level: isNaN(Math.round((devices[0].liters/devices[0].capacity)*100))?0:Math.round((devices[0].liters/devices[0].capacity)*100),
                        // level: isNaN(getPercentageOfWater(selectedTableTank1.liters,selectedTableTank1.capacity))? 0: getPercentageOfWater(selectedTableTank1.liters,selectedTableTank1.capacity),
                        quality: getWaterQuality(selectedTableTank1.tds),
                        temp: selectedTableTank1.temp,
                    }
                ]
            })
        }
        console.log('Selected table tank', selectedTableTank);
        //setSelectedTableTank(selectedTableTank);
    }
    useLayoutEffect(()=>{
        console.log('Component mounted');
        setSelectedTank({
            ...selectedTank,
            id: "All",
        });
    },[])
    useEffect(()=>{
        if (devices.length>=1) {
            setSelectedTableTank({
                consumption: [{
                    time: `${new Date(devices[0].modified).getHours()}:00`,
                    litres:  devices[0].liters,
                    level: isNaN(Math.round((devices[0].liters/devices[0].capacity)*100))?0:Math.round((devices[0].liters/devices[0].capacity)*100),
                    quality: getWaterQuality(devices[0].tds),
                    temp: devices[0].temp,
                }]
            })
            console.log('Devices to be loaded are:', selectedTank)
            if(selectedTank.id==='All'){
                console.log('All tanks',devices.reduce((acc, curr)=>acc+curr.liters,0));
                setSelectedTank({
                    ...selectedTank,
                    consumption: devices[0].consumption??[],
                    // consumption:[],
                    litres: devices.reduce((acc, curr)=>acc+curr.liters,0)
                });
                setOptionsToRender({
                    ...options, 
                    data: devices.map((d)=>({
                        type: "spline",
                        dataPoints: d.consumption? d?.consumption.filter((_,i)=>i%2):[]
                    }))
                })
                return;
                //setSelectedTank({...selectedTank, litres: devices.reduce((acc, curr)=>acc+curr.liters, 0)})
            }
            console.log('Devicces', devices.length)
            setSelectedTank({
                ...selectedTank,
                consumption: devices[0].consumption ??[],
                litres: devices.reduce((acc, curr)=>acc+getLitres(curr.capacity,curr.height,curr.liters), 0)
            });
            setSelectedTank({name: devices[0].name, litres:devices[0].liters, id: devices[0].id, consumption: devices[0].consumption})
            setOptionsToRender({
                ...options,
                data: [{
                    // Change type to "doughnut", "line", "splineArea", etc.
                    type: "column", 
                    dataPoints: devices[0]?.consumption??[],
                }]
            })
            console.log('Table tank consumption',selectedTableTank.consumption)
        }
    },[devices.length])
    useEffect(()=>{
        if(selectedTank.id==='All'){
            console.log('All tanks',devices);
            setSelectedTank({
                ...selectedTank,
                consumption: devices[0]?.consumption,
                litres: devices.reduce((acc, curr)=>acc+curr.liters, 0)
            });
            setOptionsToRender({
                ...options, 
                data: devices.map((d)=>({
                    type: "spline",
                    dataPoints: d.consumption? d?.consumption:[]
                }))
            })
            return;
        }
        console.log('Tank ID has changed', selectedTank.id)
        const device = devices.filter((d)=>d.id===selectedTank.id);
        if (device.length >=1) {
            console.log('This is a single device',device)
            setSelectedTank({
                ...selectedTank, 
                consumption: device[0]?.consumption, 
                name: device[0]?.name, 
                litres: device[0]?.liters
            })
            setOptionsToRender({
                ...options, 
                data: [{
                    // Change type to "doughnut", "line", "splineArea", etc.
                    type: "column",
                    dataPoints: device[0].consumption? device[0].consumption:[],
                }]
            })
            return;
        }
        // setSelectedTank({...selectedTank, name: devices[0].name, litres:devices[0].liters, id: devices[0].id})
        return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedTank.id])
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    return (
        <Box pl={2} pr={2}>
            <Box onClick={()=>setIsOpenModal(!isOpenModal)} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h3 style={{fontSize: '24px'}}>Usage Volume</h3>
                <p style={{color: '#fff',fontSize: '12px',cursor:'pointer', borderRadius: '20px', padding: '8px', display: 'flex',alignItems: 'center',backgroundColor: '#1C1B1F'}}>
                    <Visibility sx={{fontSize: 12, margin:'0 4px'}}/>
                    View Analytics
                </p>
            </Box>
            <ModalComponent handleClose={()=>{console.log(reportTemplateRef.current); setIsOpenModal(!isOpenModal)}} open={isOpenModal}>
                <div>
                    <h3 style={{fontSize: '16px', margin:'10px 0'}}>Consumption Chart</h3>
                    <div style={{border: '1px solid black', padding:'8px 10px', borderRadius:'4px'}}>
                        <p style={{color: '#9291A5', fontSize: '15px', margin:'10px 0'}}>Water Consumption, {new Date().toDateString()}</p>
                        {/* <h3 style={{fontSize: '24px'}}>Usage Volume</h3> */}
                        <h4 style={{margin:'10px 0'}}>{isNaN(selectedTank.litres)?0:selectedTank.litres} {selectedTank.id==='All'?'total litres consumed':'Litres'} </h4>
                        <CanvasJSChart options = {optionsToRender}/>
                    </div>
                </div>
                {
                    selectedTableTank.consumption?(
                        <>
                            <h4 style={{margin:'10px'}}>Tabular Overview</h4>
                            <StickyHeadTable 
                                rows1={selectedTableTank.consumption}
                            />
                        </>
                    ):''
                }
            </ModalComponent>
            <Box  ref={reportTemplateRef} sx={{display: 'flex',margin: '10px 0', flexWrap: 'wrap', alignItems: 'center'}}>
                <Box sx={{border: '1px solid #ccc',margin:'15px', padding:'5px 0', minWidth: '200px', width: '20%', borderRadius: '20px'}}>
                    <label style={{background: '#E8E8E8',fontSize: '18',fontWeight: '500', color: '#2C2D38', padding: '5px 5px',borderTopLeftRadius: 'inherit',borderBottomLeftRadius:'inherit', height: '100%'}} htmlFor="devs">Device:</label>
                    <select onChange={(event)=>{setSelectedTank({...selectedTank, id: event.target.value})}} style={{border: 'none',outline: 'none',width: '65%', background: 'none'}} name="tanks" id="tanks">
                    <option value='All'>All</option>
                        {
                            devices.map((device,idx)=>(
                                <option key={idx} value={device.id}>{device.name}</option>
                            ))
                        }
                    </select>
                </Box>
                <Box  sx={{border: '1px solid #ccc',margin:'15px', padding:'5px 0',minWidth: '200px', width: '20%', borderRadius: '20px'}}>
                    <label style={{background: '#E8E8E8',fontWeight: '500', color: '#2C2D38', fontSize: '18', padding: '5px 5px',borderTopLeftRadius: 'inherit',borderBottomLeftRadius:'inherit', height: '100%'}} htmlFor="devs">Plots:</label>
                    <select style={{border: 'none',outline: 'none',width: '70%', background: 'none'}} name="devs" id="devs">
                        <option value="all">Custom</option>
                        <option value="tank1">Tank 1</option>
                        <option value="tank2">Tank 2</option>
                        <option value="tank3">Tank 3</option>
                    </select>
                </Box>
            </Box>
            <Box p={2} sx={{width: '100%',bgcolor: "#fff",borderRadius: "8px",}}>
                <Box sx={{display: 'flex',alignItems: 'center',justifyContent: 'space-between', width:'100%',bgcolor: "#fff",borderRadius: "5px",marginTop: "10px",}} >
                    <p style={{color: '#9291A5', fontSize: '12px'}}>Water Consumption, May 23, 2022</p>
                    <Box p={1} sx={{  display: 'flex',bgcolor: '#F3F8FF', borderRadius: "5px",justifyContent: 'space-between', alignItems: 'center'}}>
                        <p style={ReportsActiveText}>Daily</p>
                        <p style={ReportsText}>Weekly</p>
                        <p style={ReportsText}>Monthly</p>
                    </Box>
                </Box>
                <h2 style={{ fontSize: 'calc(10px + 1.8vw)'}} >{isNaN(selectedTank.litres)?0:selectedTank.litres} {selectedTank.id==='All'?'total litres consumed':'Litres'} </h2>
                {/* <Box alt="water Tank." sx={{width: '100%'}} component="img" src={ChatFlow}/> */}
                <CanvasJSChart options = {optionsToRender}/>
            </Box>
            <PDFDownloadLink document={<DocumentComponent/>} fileName="somename.pdf">
                {({_,_, loading,}) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
            <Box sx={{padding: '10px 15px',margin: '10px 0',width: '100%', bgcolor: "#fff",borderRadius: "5px",}}>
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
                {
                    selectedTableTank.consumption?(
                        <StickyHeadTable 
                            rows1={selectedTableTank.consumption}
                        />
                    ):''
                }
            </Box>
        </Box>
    );
}

export default BillingsPage;