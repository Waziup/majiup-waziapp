import { Box, Modal} from '@mui/material';
import './Modals.styles.css';
import {WaterDrop} from '@mui/icons-material';

type ModalComponentProps = {
    open: boolean;
    handleClose: () => void;
}
const ModalContainer={
	bgcolor: '#fff',
	padding: 2,
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '50%',
}
function ModalComponent({open, handleClose}: ModalComponentProps) {
    
    return (
        
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

                >
                <Box sx={ModalContainer} className="modalBox">
					<Box sx={{display: 'flex', alignItems: 'center'}}>
						<WaterDrop style={{fontSize: '2vw', color: '#4592F6'}}/>
						<h1 style={{fontSize: '2vw', fontWeight:'normal'}}>MajiUp</h1>
					</Box>
					<Box sx={{display: 'flex', alignItems: 'center', justifyContent:'space-between',borderBottom:'1px solid #000'}}>
						<h1 style={{fontSize: '16px', fontWeight:'bold'}}>Analytics Report</h1>
						<p style={{fontSize: '16px', fontWeight:'normal'}}>Generated: {new Date().toDateString()}</p>
					</Box>
					<Box sx={{display: 'flex', alignItems: 'center', justifyContent:'space-between',borderBottom:'1px solid #000'}}>
						<Box>
							<h1 style={{fontSize: '16px', fontWeight:'bold'}}>Name: 
							<span style={{fontSize: '16px', fontWeight:'normal'}}>John Doe</span>
							</h1>
						</Box>
						<Box>
							<h1 style={{fontSize: '16px', fontWeight:'bold'}}>
								Address:
									<span style={{fontSize: '16px', fontWeight:'normal'}}>Kenya</span>
								</h1>
						</Box>
						<Box>
							<h1 style={{fontSize: '16px', fontWeight:'bold'}}>
								Email: 
							<span style={{fontSize: '16px', fontWeight:'normal'}}>  johndoe@gmail.com</span>
								</h1>
						</Box>
					</Box>
					<Box>
						<p style={{fontSize: '16px', fontWeight:'normal'}}>General Overview: </p>
					</Box>
                </Box>
            </Modal>
    );
}

export default ModalComponent;