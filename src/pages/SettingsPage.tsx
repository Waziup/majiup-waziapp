import { Add, MoreVert } from '@mui/icons-material';
import { Box, Button, Modal, Stack } from '@mui/material';
import FrameSVG from '../assets/frame.svg';
import { useContext, useState } from 'react';
import { DevicesContext } from '../context/devices.context';
import { Android12Switch } from '../components/TankDetail/TankDetail.component';
import { useOutletContext } from 'react-router-dom';
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
	width: '50%',
    alignContent:'center',
    // 
}
const InputContainer={
    display:'flex', 
    alignItems:'center', 
    justifyContent:'space-around'
}
const InputLabel={
    fontSize:'12px',
}
const SensorContainer = {
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    flexWrap:'wrap'
}
function getLitres(capacity: number, height: number,level: number): number{
    return (level/height)*capacity;
}
function SettingsPage() {
    const { devices } = useContext(DevicesContext);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [matches] = useOutletContext<[matches: boolean]>();
    console.log(devices)
    return (
        <Box pl={2} pr={2}>
            <Box onClick={()=>setIsOpenModal(true)} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h3 style={{fontSize: '24px',margin:'10px 0'}}>Setup Device</h3>
                <p style={{color: '#fff',fontSize: 16,cursor:'pointer', borderRadius: '20px', padding:'10px 12px', display: 'flex',alignItems: 'center',backgroundColor: '#1C1B1F'}}>
                    <Add sx={{fontSize: 16, margin:'0 4px'}}/>
                    New Device
                </p>
            </Box>
            <Modal open={isOpenModal}
                onClose={()=>setIsOpenModal(!isOpenModal)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                    <Box sx={matches?{...ModalContainer}:{...ModalContainer,minWidth:'80vw'}}>
                        <form style={{width:'100%', alignItems:'center'}}>
                            <Box mb={2} sx={InputContainer}>
                                <h4 style={InputLabel}>Device Name</h4>
                                <input required style={{height: '100%',padding:'10px 5px', outline:'none',border: '1px solid #ccc', background: '#F6F6F6', width: '60%', borderRadius: '20px'}} className="input_box" type={'text'} placeholder={'Enter Device Name'} />
                            </Box>
                            <Box mb={2} sx={InputContainer}>
                                <h4 style={InputLabel}>Gateway ID</h4>
                                <Box sx={{border: '1px solid #ccc',margin:'15px', padding:'5px 0',width:'50%',bgcolor:'#F6F6F6', borderRadius: '20px'}}>
                                    {/* <label style={{background: '#E8E8E8',fontSize: '18',fontWeight: '500', color: '#2C2D38', padding: '5px 5px',borderTopLeftRadius: 'inherit',borderBottomLeftRadius:'inherit', height: '100%'}} htmlFor="devs">Device:</label> */}
                                    <select required style={{border: 'none',outline: 'none',width: '100%', background:'none' }} name="devs" id="devs">
                                        <option value="all">Gateway 5454gf34</option>
                                        
                                    </select>
                                </Box>
                            </Box>
                            <Box mb={2} sx={InputContainer}>
                                <h4 style={InputLabel}> Tank Capacity</h4>
                                <input required style={{height: '100%',padding:'10px 5px', outline:'none',border: '1px solid #ccc', background: '#F6F6F6', width: '60%', borderRadius: '20px'}} className="input_box" type={'number'} placeholder={'Capacity in litres'} />
                            </Box>
                            <Box mb={2} sx={InputContainer}>
                                <h4 style={InputLabel}>Tank Height</h4>
                                <input required style={{height: '100%',padding:'10px 5px', outline:'none',border: '1px solid #ccc', background: '#F6F6F6', width: '60%', borderRadius: '20px'}} className="input_box" type={'number'} placeholder={'Enter Tank Height'} />
                            </Box>
                            <Button type='submit' sx={{color: 'white',height: 40, bgcolor: '#E46B26', width: '50%', borderRadius: '24px', padding: '4px', alignSelf:'center', marginTop: '20px'}} variant="contained">
                                Save
                            </Button>
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
                            <Stack  width={'100%'} direction='row'  alignItems={'center'} justifyContent={'space-between'}>
                                <h3 style={{fontSize: '20px',fontWeight: '500', }}>
                                    {device.name}
                                    <p style={{color: '#888992',fontWeight: 'lighter',textAlign: 'center', fontSize: 12}}>{device.id}</p>
                                </h3>
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <Android12Switch checked/>
                                    <MoreVert/>
                                </Box>
                            </Stack>
                            <Box p={1} sx={{border: '1px solid #888992', borderRadius: 1, width: '100%'}}>
                                <h3 style={{fontSize: '20px',fontWeight: '500', }}>
                                    Tank Information
                                </h3>
                                <Box p={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Box>
                                        <h3 style={{fontSize: '20px',fontWeight: 'normal', }}>Capacity </h3>
                                        <p style={{fontSize: '20px',}}>Height</p>
                                    </Box>
                                    <Box>
                                        <h3 style={{fontSize: '20px',fontWeight: 'normal', }}>
                                            {device.liters}
                                            <span> litres</span>
                                        </h3>
                                        <p style={{fontSize: '20px',}}>
                                            {device.height}
                                            <span>meters</span>
                                        </p>
                                    </Box>
                                </Box>
                            </Box>
                            <Box p={1} sx={{border: '1px solid #888992', borderRadius: 1, width: '100%'}}>
                                <Stack  width={'100%'} direction='row'  alignItems={'center'} justifyContent={'space-between'}>
                                    <h3 style={{fontSize: '20px',fontWeight: '600', }}>
                                        Robodo SEN18
                                    </h3>
                                    <p style={{color: '#888992',fontWeight: 'lighter',textAlign: 'center', fontSize: 14}}>Water level sensor</p>
                                </Stack>
                                <Box sx={{justifyContent: 'space-between', display: 'flex', alignItems: 'center'}}>
                                    <h3 style={{fontSize: '18px',fontWeight: '600', }}>
                                        State
                                    </h3>
                                    <Android12Switch checked/>
                                </Box>
                                <Box sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center'}}>
                                    <h3 style={{fontSize: '18px',fontWeight: '600', }}>
                                        Notification
                                    </h3>
                                    <Android12Switch checked/>
                                </Box>
                            </Box>
                        </Stack>
                    ))
                }
            </Box>
        </Box>
    );
}

export default SettingsPage;