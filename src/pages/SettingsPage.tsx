import { Delete, MoreVert, SaveAlt } from '@mui/icons-material';
import { Box, Modal, Stack } from '@mui/material';
import FrameSVG from '../assets/frame.svg';
import React, { useContext, useState } from 'react';
import { DevicesContext } from '../context/devices.context';
import { Android12Switch } from '../components/TankDetail/TankDetail.component';
import { useOutletContext } from 'react-router-dom';
import { X as Device } from '../context/devices.context';
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
    padding:'5px 5px', 
    outline:'none',
    border: '1px solid #888', 
    // background: '#F6F6F6', 
    width: '50%',
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
}
// type Changes = Omit<Device, 'id' | 'diameter'| 'sensors' | 'actuators'>;
function SettingsPage() {
    const { devices } = useContext(DevicesContext);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [selectedDevice, setSelectedDevice] = useState<Device>();
    const [matches] = useOutletContext<[matches: boolean]>();
    // console.log(devices)
    const handleSelectedTank = (e:React.MouseEvent<SVGSVGElement, MouseEvent>,device: Device) => {
        setSelectedDevice(device);
        setIsOpenModal(true);
        console.log(e.target,selectedDevice);
    }
    const deleteAlert = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>,id: string) => {
        e.preventDefault();
        const rs = prompt(`Are you sure you want to delete this device ${id}?`);
        console.log(e.target,selectedDevice,rs);
    }
    
    return (
        <Box pl={2} pr={2}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h3 style={{fontSize: '24px',margin:'10px 0'}}>Device Settings</h3>
                {/* <p style={{color: '#fff',fontSize: 16,cursor:'pointer', borderRadius: '20px', padding:'10px 12px', display: 'flex',alignItems: 'center',backgroundColor: '#1C1B1F'}}>
                    <Add sx={{fontSize: 16, margin:'0 4px'}}/>
                    New Device
                </p> */}
            </Box>
            <Modal open={isOpenModal}
                onClose={()=>setIsOpenModal(!isOpenModal)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                    <Box sx={matches?{...ModalContainer}:{...ModalContainer,minWidth:'80vw'}}>
                        <h1 style={boldText}>Edit Information</h1>
                        <form style={{width:'90%', alignItems:'center'}}>
                            <Box sx={{display:'flex',alignItems: 'center', justifyContent: 'space-evenly'}}>
                                <Box mb={2}>
                                    <h4 style={InputLabel}>Device Name*</h4>
                                    <input readOnly value={selectedDevice?.name} required style={inputbox} className="input_box" type={'text'} placeholder={'Enter Device Name'} />
                                </Box>
                                <Box mb={2} >
                                    <h4 style={InputLabel}>Gateway ID</h4>
                                    <input readOnly={true} value={selectedDevice?.id} required style={inputbox} className="input_box" type={'text'} placeholder={'Enter Device Name'} />
                                    
                                </Box>
                            </Box>
                            <Box sx={{display:'flex',alignItems: 'center', justifyContent: 'space-evenly'}}>
                                <Box mb={2}>
                                    <h4 style={InputLabel}>Tank Capacity</h4>
                                    <input readOnly value={selectedDevice?.capacity} required style={inputbox} className="input_box" type={'text'} placeholder={'Enter Device Name'} />
                                </Box>
                                <Box mb={2} >
                                    <h4 style={InputLabel}>Tank Height</h4>
                                    <input readOnly value={selectedDevice?.height} required style={inputbox} className="input_box" type={'text'} placeholder={'Enter Device Name'} />
                                </Box>
                            </Box>
                            <Box sx={{display:'flex', justifyContent: 'space-between'}}>
                                <h4 style={InputLabel}>Notifications</h4>
                                <Android12Switch checked={false}/>
                            </Box>
                            
                            <Box sx={{display:'flex',alignItems: 'center', justifyContent: 'space-evenly'}}>
                                <Box mb={2}>
                                    <h4 style={InputLabel}>Tank Diameter</h4>
                                    <input readOnly value={selectedDevice?.meta.settings.radius? selectedDevice?.meta.settings.radius*2:0 } required style={inputbox} className="input_box" type={'number'} placeholder={'Enter Device Name'} />
                                </Box>
                                <Box mb={2} >
                                    <h4 style={InputLabel}>Tank Location</h4>
                                    <input value={selectedDevice?.meta.settings.capacity} required style={inputbox} className="input_box" type={'text'} placeholder={'Enter Device Name'} />
                                </Box>
                            </Box>
                            <h4 style={InputLabel}>Sensors</h4>
                            <Box sx={{display:'flex',alignItems: 'center', justifyContent: 'space-evenly'}}>
                                {
                                    selectedDevice?.sensors.map((sensor,id)=>(
                                            <input key={id} value={sensor.name} required style={inputbox1} className="input_box" type={'text'} placeholder={'Enter Device Name'} />
                                        // <Box sx={inputbox1} mb={2} key={id}>
                                        //     {/* <h4 style={InputLabel}>{sensor.name}</h4> */}
                                        // </Box>
                                    ))
                                }
                            </Box>
                            <h4 style={InputLabel}>Actuators</h4>
                            <Box sx={{display:'flex',alignItems: 'center', }}>
                                {
                                    selectedDevice?.actuators.map((actuator,id)=>(
                                        <input readOnly key={id} value={actuator.name} required style={inputbox1} className="input_box" type={'text'} placeholder={'Enter Device Name'} />    
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
                            // transform: 'translate(-50, -50%)'
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
                                    <Android12Switch checked/>
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
                                            {/* <p style={{fontWeight: 'lighter',textAlign: 'center', fontSize: '10px'}}>Water level sensor</p> */}
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