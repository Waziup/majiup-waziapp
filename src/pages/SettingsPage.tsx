import { Delete, MoreVert, SaveAlt } from '@mui/icons-material';
import { Box, Modal, Stack } from '@mui/material';
import FrameSVG from '../assets/frame.svg';
import React, { useContext, useState } from 'react';
import { DevicesContext, MetaInformation } from '../context/devices.context';
import { Android12Switch } from '../components/TankDetail/TankDetail.component';
import { useOutletContext } from 'react-router-dom';
import { X as Device } from '../context/devices.context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BoxStyle={ 
    bgcolor: "#fff", 
    borderRadius: "10px",
    mt:3,
    width:'30%',
    minWidth: '300px',
}
const ModalContainer={
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
const SensorContainer = {
    display: 'flex', 
    justifyContent: 'space-evenly', 
    alignItems: 'center', 
    flexWrap:'wrap'
}
const boldText={
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '10px 0',
}
const inputbox={
    height: '100%',
    padding:'5px 15px', 
    outline:'none',
    border: '1px solid #ccc', 
    background: '#F6F6F6', 
    width: '100%', 
    borderRadius: '20px'
}

const inputbox1={
    height: '100%',
    padding:'5px 3px',
    outline:'none',
    fontSize: '13px',
    borderBottom: '1px solid #888', 
    // background: '#F6F6F6', 
    // width: '50%',
    margin: '0 10px', 
}
const ButtonStyle={
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
    fontWeight: 'bold',
    margin: '10px 5px',
    width: '60%',
    backgroundColor: '#Fff',
    color: '#888992',
    border: '1px solid #888992',
    outline: 'none',
    cursor: 'pointer',
};
function SettingsPage() {
    const { devices } = useContext(DevicesContext);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [selectedDevice, setSelectedDevice] = useState<Device>();
    const [matches] = useOutletContext<[matches: boolean]>();
    const navigate = useNavigate();
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
        const rs = confirm(`Are you sure you want to delete this device ${id}?`);
        console.log(rs);
        if(rs){
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/tanks/${id}`);
            console.log(response);
            setIsOpenModal(false);
            navigate('/dashboard');
        }
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        console.log(e.target.value, e.target.name);
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
        console.log(rs);
        if(rs){
            // const nameResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tanks/${selectedDevice?.id}/name`,{
            //     name: changedMetaInfo.name
            // })
            const responseMetaData = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tanks/${selectedDevice?.id}/meta`,{
                settings:{...changedMetaInfo.metaData.settings},
                receivenotifications: changedMetaInfo.metaData.receivenotifications,
                notifications:{...selectedDevice?.meta.notifications}
            });
            Promise.all([ responseMetaData]).then((rs)=>{
                console.log(rs);
                setIsOpenModal(false);
            }).catch((err)=>{
                console.log(err);
                setIsOpenModal(false)
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
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h3 style={{fontSize: '24px',margin:'10px 0'}}>Device Settings</h3>
            </Box>
            <Modal open={isOpenModal}
                onClose={()=>setIsOpenModal(!isOpenModal)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                    <Box sx={matches?{...ModalContainer}:{...ModalContainer, maxHeight: '80vh', overflowY: 'scroll', minWidth:'80vw'}}>
                        <h1 style={boldText}>Edit Information</h1>
                        <form onSubmit={handeleSubmit} style={{width:'90%', alignItems:'center'}}>
                            <Box sx={{display:'flex',alignItems: 'center', justifyContent: 'space-evenly'}}>
                                <Box mb={2}>
                                    <h4 style={InputLabel}>Device Name*</h4>
                                    <input name={'name'} onChange={handleChange} value={changedMetaInfo.name} required style={inputbox} className="input_box" type={'text'} placeholder={'Enter Device Name'} />
                                </Box>
                                <Box mb={2} >
                                    <h4 style={InputLabel}>Gateway ID</h4>
                                    <input name={'id'} readOnly={true} value={selectedDevice?.id} required style={inputbox} className="input_box" type={'text'} placeholder={'Enter Device Name'} />
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
                                        placeholder={'Enter Device Name'} 
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
                                        value={changedMetaInfo.metaData.settings.maxalert}
                                        required 
                                        style={inputbox} 
                                        className="input_box" 
                                        type={'text'} 
                                        placeholder={'Enter Device Name'} 
                                    />
                                </Box>
                                <Box mb={2} >
                                    <h4 style={InputLabel}>Min Alert</h4>
                                    <input 
                                        onChange={handleChange} 
                                        name={'minalert'} 
                                        value={changedMetaInfo.metaData.settings.minalert} 
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
                                    selectedDevice?.sensors.map((sensor,id)=>(
                                        <p key={id} style={inputbox1} className="input_box"  placeholder={'Enter Device Name'}>{sensor.name}</p>
                                    ))
                                }
                            </Box>
                            <h4 style={InputLabel}>Actuators</h4>
                            <Box sx={{display:'flex',alignItems: 'center', }}>
                                {
                                    selectedDevice?.actuators.map((actuator,id)=>(
                                        <p key={id} style={inputbox1} className="input_box" placeholder={'Enter Device Name'}>{actuator.name}</p>
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
                                <button style={ButtonStyle} className="button">
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
                                <p style={{color: '#888992',fontWeight: '600',textAlign: 'center', fontSize: 16}}>Let's create your first device.</p>
                            </Box>
                        </Box>
                    )
                }
            <Box sx={matches?{...SensorContainer}:{...SensorContainer,justifyContent:'center'}}>
                {
                    devices.map((device,id)=>(
                        <Stack key={id} p={1} sx={BoxStyle} alignItems={'center'} flexWrap='wrap'  direction='column' alignContent={'center'} spacing={2}>
                            <Stack  width={'100%'} direction='row' justifyContent={'space-between'}>
                                <h3 style={{fontSize: '20px',fontWeight: '500', }}>
                                    {device.name.slice(0,10)}
                                    <p style={{color: '#888992',fontWeight: 'lighter',textAlign: 'center', fontSize: 12}}>{device.id}</p>
                                </h3>
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <Android12Switch checked={device.on}/>
                                    <MoreVert sx={{cursor:'pointer'}} onClick={(e)=>handleSelectedTank(e,device)}/>
                                </Box>
                            </Stack>
                            <Box p={1} sx={{border: '1px solid #ccc', borderRadius: 1, width: '100%'}}>
                                <h3 style={{fontSize: '18px',fontWeight: '700', }}>
                                    Tank Information
                                </h3>
                                <Box p={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Box>
                                        <h3 style={{fontSize: '16px',fontWeight: 'normal', }}>Capacity </h3>
                                        <p style={{fontSize: '16px',}}>Height</p>
                                    </Box>
                                    <Box>
                                        <h3 style={{fontSize: '16px',fontWeight: 'normal', }}>
                                            {device.capacity}
                                            <span> litres</span>
                                        </h3>
                                        <p style={{fontSize: '16px',}}>
                                            {device.height}
                                            <span>meters</span>
                                        </p>
                                    </Box>
                                </Box>
                            </Box>
                            <Box  p={1} sx={{border: '1px solid #CCC', borderRadius: 1, width: '100%'}}>
                                <h3 style={{fontSize: '18px',fontWeight: '700',margin:'10px 0'}}>
                                    SENSORS
                                </h3>
                                {
                                    device.sensors.map((sensor,idx)=>(
                                        <Stack key={idx} width={'100%'} direction='row'  alignItems={'center'} justifyContent={'space-between'}>
                                            <h3 style={{fontSize: '13px',fontWeight: '600',margin:'5px 0' }}>
                                                {sensor.name}
                                            </h3>
                                            <Box>
                                                {/* <p>Edit</p> */}
                                                {/* <Edit sx={{cursor:'pointer', color:'#14AE5D', fontSize:'18px'}} /> */}
                                                {/* <Delete sx={{cursor:'pointer', color:'#F00', fontSize:'18px'}}/> */}
                                                {/* <p>Delete</p> */}
                                            </Box>
                                        </Stack>
                                    ))
                                } 
                                
                            </Box>
                            <Box  p={1} sx={{border: '1px solid #CCC', borderRadius: 1, width: '100%'}}>
                                <h3 style={{fontSize: '18px',fontWeight: '700',margin:'10px 0'}}>
                                    ACTUATORS
                                </h3>
                                {
                                    device.actuators.map((actuator,idx)=>(
                                        <Stack key={idx} width={'100%'} direction='row'  alignItems={'center'} justifyContent={'space-between'}>
                                            <h3 style={{fontSize: '13px',fontWeight: '600',margin:'5px 0' }}>
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