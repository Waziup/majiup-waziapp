import { Delete, SaveAlt } from '@mui/icons-material';
import { Box, Modal, Stack, SxProps, Theme, } from '@mui/material';
import FrameSVG from '../assets/frame.svg';
import React, { useContext, useState } from 'react';
import { DevicesContext, MetaInformation } from '../context/devices.context';
import { Android12Switch } from '../components/TankDetail/TankDetail.component';
import { useOutletContext } from 'react-router-dom';
import { X as Device } from '../context/devices.context';
import axios from 'axios';
import { TbAlertHexagon } from 'react-icons/tb';
import { MdModeEdit, MdSensors } from 'react-icons/md';
import { ImSwitch } from 'react-icons/im';
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
const BoxStyle: SxProps<Theme> ={ 
    bgcolor: "#fff", 
    borderRadius: "10px",
    mt:1,
    width:'38%',
    minWidth: '35%',
    minHeight: '30rem',
    overflowY:'auto',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
}
const ModalContainer : SxProps<Theme>={
	bgcolor: '#fff',
	padding: 2,
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '40%',
    alignContent:'center',
    // 
}
const InputLabel={
    fontSize: '16px',
    margin: '10px 0',
}
const SensorContainer: SxProps<Theme> = {
    display: 'flex', 
    justifyContent: 'space-evenly', 
    alignItems: 'center', 
    flexWrap:'wrap',
}
const boldText: React.CSSProperties={
    fontSize: '16px',
    margin: '10px 0',

}
const inputbox: React.CSSProperties={
    height: '100%',
    padding:'5px 15px', 
    outline:'none',
    border: '1px solid #ccc', 
    background: '#F6F6F6', 
    width: '100%', 
    borderRadius: '20px'
}

const inputbox1: React.CSSProperties={
    height: '100%',
    padding:'5px 3px',
    outline:'none',
    fontSize: '13px',
    borderBottom: '1px solid #888', 
    // background: '#F6F6F6', 
    // width: '50%',
    margin: '0 10px', 
}
const ButtonStyle: React.CSSProperties={
    borderRadius: '20px',
    padding: '8px 0px',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '10px 5px',
    width: '60%',
    backgroundColor: '#FF5C00',
    color: '#fff',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}
const cancelButtonStyle={
    borderRadius: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    margin: '10px 5px',
    width: '60%',
    backgroundColor: '#Fff',
    color: '#888992',
    border: '1px solid #888992',
    outline: 'none',
    cursor: 'pointer',
    
};
function SettingsPage() {
    const { devices, setTanks, } = useContext(DevicesContext);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [selectedDevice, setSelectedDevice] = useState<Device>();
    const [matches] = useOutletContext<[matches: boolean]>();
    // const navigate = useNavigate();
    const Alt = {
        location: {latitude:0, longitude:0},
        notifications: selectedDevice?.notifications? selectedDevice?.notifications: {messages:[]},
        receivenotifications: selectedDevice?.meta.receivenotifications??false,
        settings: selectedDevice?.meta.settings??{
            capacity: 0,
            radius: 0,
            height: 0,
            length: 0,
            width: 0,
            maxalert:0,
            minalert:0,
        },
    }
    const [changedMetaInfo, setChangedMetaInfo] = useState<{name: string,metaData: MetaInformation}>({name: selectedDevice?.name??'', metaData: selectedDevice?.meta?? Alt});
    
    const handleSelectedTank = (e:React.MouseEvent<SVGSVGElement, MouseEvent>,device: Device) => {
        e.preventDefault();
        setSelectedDevice(device);
        setChangedMetaInfo({name: device.name, metaData: device.meta});
        setIsOpenModal(true);
    }
    const deleteAlert =async  (e:React.MouseEvent<HTMLButtonElement, MouseEvent>,id: string) => {
        e.preventDefault();
        const rs = confirm(`Are you sure you want to remove ${selectedDevice?.name}?`);
        if(rs){
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/tanks/${id}`);
            setTanks(devices.filter((device: Device) => device.id !== id));
            setIsOpenModal(false);
            setSelectedDevice(undefined);
            // navigate('/dashboard');
            //refresh the page
        }
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        if(e.target.name ==='name'){
            setChangedMetaInfo({
                ...changedMetaInfo,
                name: e.target.value
            })
            return;
        }
        setChangedMetaInfo({...changedMetaInfo, 
            metaData:{
                ...changedMetaInfo.metaData,
                settings:{
                    ...changedMetaInfo.metaData.settings,
                    [e.target.name]: e.target.value
                }
            }
        });
    }
    async function handeleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const rs = confirm(`Are you sure you want to save this device ${changedMetaInfo.name}?`);
        
        if(rs){
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tanks/${selectedDevice?.id}/name`,
                changedMetaInfo.name,
                {
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
            
            const responseMetaData = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tanks/${selectedDevice?.id}/meta`,{
                ...changedMetaInfo.metaData,
                settings:{
                    capacity: parseFloat(changedMetaInfo.metaData.settings.capacity.toString()),
                    height: parseFloat(changedMetaInfo.metaData.settings.height.toString()),                
                },
                receivenotifications: changedMetaInfo.metaData.receivenotifications,
                notifications:{...selectedDevice?.meta.notifications}
            });
            Promise.all([ responseMetaData]).then(()=>{
                console.log(selectedDevice?.id)
                const device = devices.find((device)=>device.id === selectedDevice?.id);
                if(device){
                    console.log(device)
                    device.meta = changedMetaInfo.metaData;
                    device.name = changedMetaInfo.name;
                    setTanks([...devices]);
                    setSelectedDevice(undefined);
                    setIsOpenModal(false);
                }else{
                    setIsOpenModal(false);
                    setSelectedDevice(undefined);
                }
            }).catch(()=>{
                setIsOpenModal(false);
                setSelectedDevice(undefined);
            })
        }
    }
    function handleToggle(e: React.ChangeEvent<HTMLInputElement>){
        console.log(e.target.checked, e.target.name);
        setChangedMetaInfo({...changedMetaInfo, 
            metaData:{
                ...changedMetaInfo.metaData,
                receivenotifications: e.target.checked
            }
        });
    }
    return (
        <Box pl={2} pr={2}>            
            <Modal open={isOpenModal}
                onClose={()=>setIsOpenModal(!isOpenModal)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                    <Box sx={matches?{...ModalContainer}:{...ModalContainer, maxHeight: '80vh', overflowY: 'scroll', minWidth:'80vw'}}>
                        <h1 style={boldText}>Edit Tank</h1>
                        <form onSubmit={handeleSubmit} style={{width:'90%', alignItems:'center'}}>
                            <Box sx={{display:'flex',alignItems: 'center', justifyContent: 'space-evenly'}}>
                                <Box mb={2}>
                                    <h4 style={InputLabel}>Device Name*</h4>
                                    <input name={'name'} onChange={handleChange} value={changedMetaInfo.name} required style={inputbox} className="input_box" type={'text'} placeholder={'Enter Device Name'} />
                                </Box>
                                <Box mb={2} >
                                    <h4 style={InputLabel}>Gateway ID</h4>
                                    <input name={'id'} readOnly={true} value={selectedDevice?.id} required style={inputbox} className="input_box" type={'text'} placeholder={'Device ID'} />
                                </Box>
                            </Box>
                            <Box sx={{display:'flex',alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                                <Box mb={2}>
                                    <h4 style={InputLabel}>Tank Capacity</h4>
                                    <input 
                                        name={'capacity'} 
                                        onChange={handleChange} 
                                        value={changedMetaInfo.metaData.settings.capacity} 
                                        required 
                                        style={inputbox} 
                                        className="input_box" 
                                        type={'text'} 
                                        placeholder={'Enter Capacity'} 
                                    />
                                </Box>
                                <Box mb={2} >
                                    <h4 style={InputLabel}>Tank Height</h4>
                                    <input name={'height'} 
                                        onChange={handleChange} 
                                        value={changedMetaInfo.metaData.settings.height} 
                                        required 
                                        style={inputbox} 
                                        className="input_box" 
                                        type={'text'} 
                                        placeholder={'Enter Height'} 
                                    />
                                </Box>
                                <Box mb={2}>
                                    <h4 style={InputLabel}>Max Alert</h4>
                                    <input 
                                        onChange={handleChange} 
                                        name={'maxalert'} 
                                        // value={changedMetaInfo.metaData.settings.maxalert}
                                        required 
                                        style={inputbox} 
                                        className="input_box" 
                                        type={'number'}
                                        max={changedMetaInfo.metaData.settings.capacity} 
                                        placeholder={'Enter MaxAlert'} 
                                    />
                                </Box>
                                <Box mb={2} >
                                    <h4 style={InputLabel}>Min Alert</h4>
                                    <input 
                                        onChange={handleChange} 
                                        name={'minalert'} 
                                        // value={changedMetaInfo.metaData.settings.minalert} 
                                        required style={inputbox} className="input_box" 
                                        type={'number'} 
                                        placeholder={'Enter Minimum Alert'} />
                                </Box>
                            </Box>
                            <Box sx={{display:'flex', justifyContent: 'space-between'}}>
                                <h4 style={InputLabel}>Notifications</h4>
                                <Android12Switch 
                                    onChange={handleToggle} name={'receivenotifications'} checked={changedMetaInfo.metaData.receivenotifications}/>
                            </Box>
                            
                            <h4 style={InputLabel}>Sensors</h4>
                            <Box sx={{display:'flex',alignItems: 'center', justifyContent: 'space-evenly'}}>
                                {
                                    selectedDevice?.sensors?.map((sensor,id)=>(
                                        <p key={id} style={inputbox1} className="input_box" >{sensor.name}</p>
                                    ))
                                }
                            </Box>
                            <h4 style={InputLabel}>Actuators</h4>
                            <Box sx={{display:'flex',alignItems: 'center', }}>
                                {
                                    selectedDevice?.actuators?.map((actuator,id)=>(
                                        <p key={id} style={inputbox1} className="input_box" >{actuator.name}</p>
                                    ))
                                }
                            </Box>
                            <Box sx={{display:'flex',alignItems: 'center', justifyContent: 'space-evenly'}}>
                                <h4 style={InputLabel}>Delete this device?</h4>
                                <button onClick={(e)=>deleteAlert(e, selectedDevice?.id? selectedDevice.id:'')} style={{...ButtonStyle,backgroundColor: 'red',width: '40%'}} className="button">
                                    <Delete sx={{cursor:'pointer'}}/>
                                    <span>Delete</span>
                                </button>
                            </Box>
                            <Box sx={{display:'flex',alignItems: 'center', justifyContent: 'space-between'}}>
                                <button type='submit' style={ButtonStyle} className="button">
                                    <SaveAlt sx={{cursor:'pointer'}}/>
                                    <span>Save</span>
                                </button>
                                <button onClick={()=>setIsOpenModal(!isOpenModal)} style={cancelButtonStyle} >Cancel</button>
                            </Box>
                        </form>
                    </Box>
            </Modal>
            {
                devices.length<=0 && (
                    <Box sx={{position: 'relative'}}>
                        <Box sx={{
                            position: 'absolute',
                            top: '10vh',
                            left: '20vw',
                        }}>
                            <Box component='img' src={FrameSVG}/>
                            <h3 style={{fontSize: '40px', textAlign: 'center', margin:'1px 0'}}>
                                Hi there!
                            </h3>
                            <p style={{color: '#888992',textAlign: 'center', fontSize: 16}}>Let's create your first device.</p>
                        </Box>
                    </Box>
                )
            }
            <Box sx={matches?{...SensorContainer}:{...SensorContainer,justifyContent:'center'}}>
                {
                    devices.map((device,id)=>(
                        <Stack key={id} p={1} sx={BoxStyle} alignItems={'start'} flexWrap='wrap'  direction='column' alignContent={'center'} spacing={2}>
                            <Stack  width={'100%'} direction='row' justifyContent={'space-between'}>
                                <h3 style={{fontSize: '20px',fontWeight:'bold', color:'black', lineHeight:1.5 }}>
                                    {device.name}
                                    <p style={{color: '#888992',fontWeight: 'lighter',textAlign: 'center', fontSize: 12}}>{device.id}</p>
                                </h3>
                                <Box sx={{display: 'flex',}}>
                                    {/* <Android12Switch checked={device.on}/> */}
                                    <MdModeEdit size={23} style={{cursor:'pointer',}} onClick={(e: any)=>handleSelectedTank(e,device)}/>
                                </Box>
                            </Stack>
                            <Box p={1} sx={{border: '1px solid #ccc', borderRadius: 1, width: '100%'}}>                                
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', lineHeight:1.8}}>
                                    <Box>
                                        <article >Capacity </article>
                                        <article>Height</article>
                                    </Box>
                                    <Box>
                                        <article>
                                            {device.capacity}
                                            <span> Ltrs</span>
                                        </article>
                                        <p>
                                            {device.height}
                                            <span> mm</span>
                                        </p>
                                    </Box>
                                </Box>
                            </Box>
                            <Box  sx={{width: '100%', display:'flex', flexDirection:'column', gap:1.5}}>
                                <Box sx={{display:'flex', alignItems:'center', gap:1}}>
                                    <MdSensors size={23}/>
                                    <strong style={{color:'#E46B26'}}>
                                        Sensors
                                    </strong>
                                </Box>
                                {
                                    (device.sensors?.length > 0)?'':
                                    <Box sx={{display:'flex', alignItems:'center', gap:1}}>
                                        <TbAlertHexagon size={23} />
                                        <small>No sensors connected</small>
                                    </Box>
                                }
                                {
                                    device.sensors?.map((sensor,idx)=>(
                                        <Box key={idx} width={'100%'} lineHeight={1.8}>
                                            <Box>
                                                <article>
                                                    {sensor.name}
                                                </article>
                                            </Box>    
                                            <Box sx={{display:'flex',justifyContent:'space-between', borderBottom:'solid 1px gray'}}>
                                                <small>Max Alert: {sensor.meta?.critical_max}</small>
                                                <small>Min Alert: {sensor.meta?.critical_min}</small> 
                                                {
                                                    sensor.meta?.kind === 'WaterLevel' && <small>Ltrs</small>
                                                }
                                                {
                                                    sensor.meta?.kind === 'WaterThermometer' && <small>Deg</small>
                                                }
                                                {
                                                    sensor.meta?.kind === 'WaterPollutantSensor' && <small>PPM</small>
                                                }
                                                <span></span>
                                            </Box>  
                                        </Box>
                                    ))
                                }                                 
                            </Box>
                            <Box sx={{width: '100%', display:'flex', flexDirection:'column', gap:1.5}}>
                                <Box sx={{display:'flex', alignItems:'center', gap:1}}>
                                    <ImSwitch size={23} />
                                    <strong style={{color:'#E46B26'}}>
                                        Pumps
                                    </strong>
                                </Box>
                                {
                                    (device.actuators?.length > 0)?'':
                                    <Box sx={{display:'flex', alignItems:'center', gap:1}}>
                                        <TbAlertHexagon size={23} />
                                        <small>No pumps connected</small>
                                    </Box>                                    
                                }
                                {
                                    device.actuators?.map((actuator,idx)=>(
                                        <Stack key={idx} width={'100%'} direction='row'  alignItems={'center'} justifyContent={'space-between'}>
                                            <h3 style={{fontSize: '13px',fontWeight:'200' }}>
                                                {actuator.name}
                                            </h3>                                            
                                        </Stack>
                                    ))
                                }                                 
                            </Box>
                        </Stack>
                    ))
                }
            </Box>
        </Box>
    );
}

export default SettingsPage;