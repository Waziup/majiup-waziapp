import { useState, useRef, useContext, useEffect } from 'react';
import { Box} from '@mui/material';
import { Visibility} from '@mui/icons-material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ChatFlow from '../assets/chart _flow.png';
import StickyHeadTable from '../components/TableComponent/Table.component';
import DownloadSVG from '../assets/download.svg';
import ModalComponent from '../components/Modal/Modal.component';
import jsPDF from 'jspdf';
import { DevicesContext } from '../context/devices.context';
const ReportsActiveText={
    cursor: 'pointer', 
    color: '#2C2D38',
    padding: '0 .4vw',
    fontSize: '13px'
}
const ReportsText={cursor: 'pointer',color: '#9291A5',padding: '0 .4vw',fontSize: '13px' }
function BillingsPage() {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const reportTemplateRef = useRef<HTMLDivElement>(null);
    
    const { devices,  } = useContext(DevicesContext)
    const [selectedTank, setSelectedTank] = useState({name: '', litres:0, id: ''})
    const handleGeneratePdf = () => {
        console.log('reportTemplateRef')
        console.log('REf current state is: ',reportTemplateRef.current?.innerHTML)
		const doc = new jsPDF({
			format: 'a4',
			unit: 'px',
		});

		// Adding the fonts.
		// doc.setFont('Inter-Regular', 'normal');
        doc.setFillColor('#000')
		doc.html(reportTemplateRef.current as HTMLDivElement, {
			async callback(doc) {
				await doc.save('report_document');
			},
		});
	};
    useEffect(()=>{
        if (devices.length>=1) {
            console.log('Devicces', devices[0])
            setSelectedTank({name: devices[0].name, litres:devices[0].liters, id: devices[0].id})
        }
        
    },[devices])
    useEffect(()=>{
        console.log('Tank ID has changed', selectedTank.id)
        const device = devices.filter((d)=>d.id===selectedTank.id);
        if (device) {
            console.log(device);
            setSelectedTank({...selectedTank, name: device[0]?.name, litres: device[0]?.liters})
            return;
        }
        setSelectedTank({name: devices[0].name, litres:devices[0].liters, id: devices[0].id})
        return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedTank.id])
    return (
        <Box pl={2} pr={2}>
            <Box onClick={()=>setIsOpenModal(!isOpenModal)} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h3 style={{fontSize: '24px'}}>Usage Volume</h3>
                <p style={{color: '#fff',fontSize: '12px',cursor:'pointer', borderRadius: '20px', padding: '8px', display: 'flex',alignItems: 'center',backgroundColor: '#1C1B1F'}}>
                    <Visibility sx={{fontSize: 12, margin:'0 4px'}}/>
                    View Analytics
                </p>
            </Box>
                <ModalComponent refHandler={reportTemplateRef} handleGenerate={handleGeneratePdf} handleClose={()=>setIsOpenModal(!isOpenModal)} open={isOpenModal} />
            
            <Box sx={{display: 'flex',margin: '10px 0', flexWrap: 'wrap', alignItems: 'center'}}>
                <Box sx={{border: '1px solid #ccc',margin:'15px', padding:'5px 0', minWidth: '200px', width: '20%', borderRadius: '20px'}}>
                    <label style={{background: '#E8E8E8',fontSize: '18',fontWeight: '500', color: '#2C2D38', padding: '5px 5px',borderTopLeftRadius: 'inherit',borderBottomLeftRadius:'inherit', height: '100%'}} htmlFor="devs">Device:</label>
                    <select onChange={(event)=>{setSelectedTank({...selectedTank, id: event.target.value})}} style={{border: 'none',outline: 'none',width: '65%', background: 'none'}} name="tanks" id="tanks">
                        {
                            devices.map((device)=>(
                                <option value={device.id}>{device.name}</option>
                            ))
                        }
                    </select>
                </Box>
                <Box sx={{border: '1px solid #ccc',margin:'15px', padding:'5px 0',minWidth: '200px', width: '20%', borderRadius: '20px'}}>
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
                <h2 style={{ fontSize: 'calc(10px + 1.8vw)'}} >{selectedTank.litres} Litres</h2>
                <Box alt="water Tank." sx={{width: '100%'}} component="img" src={ChatFlow}/>
            </Box>
            <Box sx={{padding: '10px 15px',margin: '10px 0',width: '100%', bgcolor: "#fff",borderRadius: "5px",}}>
                <Box sx={{padding: '10px 5px',margin: '10px 0',width: '100%',display: 'flex',alignItems: 'center', bgcolor: "#fff",borderRadius: "5px",}}>
                    <Box sx={{border: '1px solid #ccc',marginRight:'5px', padding:'5px', width: '75%', borderRadius: '20px'}}>
                        {/* <label style={{background: '#E8E8E8',padding: 'inherit',borderRadius:'40px 30px', height: '100%'}} htmlFor="devs">Plots:</label> */}
                        <select style={{border: 'none', width: '100%',outline: 'none', background: 'none'}} name="devs" id="devs">
                            {
                                devices.map((device)=>(
                                    <option value={device.id}>{device.name}</option>
                                ))
                            }
                        </select>
                    </Box>
                    <Box sx={{alignItems:'center', display: 'flex',padding :'.5vw', borderRadius: "5px",justifyContent: 'space-between',}}>
                        <AssessmentIcon sx={{ color: '#666666',cursor: 'pointer', margin: '0 10px'}}/>
                        <Box sx={{bgcolor: '#F5F5F5', cursor: 'pointer', width: '100px',borderRadius:'4px', padding: '4px', display: 'inline-flex',alignItems:'center', fontSize: '13px'}}>
                            <Box alt="download" sx={{width: '20px', color: '#666666'}} component="img" src={DownloadSVG}/>
                            <p style={{ fontWeight: 'bold'}}>Generate </p>
                        </Box>
                    </Box>
                </Box>
                <StickyHeadTable />
            </Box>
        </Box>
    );
}

export default BillingsPage;