import { Box,Modal,Button, } from '@mui/material';
type Props={
    matches: boolean,
    isOpenModal: boolean,
    setIsOpenModal: (value: boolean)=>void,
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
function AddDeviceComponent({matches, isOpenModal, setIsOpenModal,}:Props){
    return (
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
                            <input required style={{height: '100%',padding:'10px 5px', outline:'none',border: '1px solid #ccc', background: '#F6F6F6', width: '60%', borderRadius: '20px'}} className="input_box" type={'number'} placeholder={'Capacity in litres'} />
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
    );
}

export default AddDeviceComponent;