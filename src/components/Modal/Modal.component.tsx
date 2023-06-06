import { Box, Modal} from '@mui/material';
import './Modals.styles.css';
import {WaterDrop} from '@mui/icons-material';
import { Box, Switch, Modal, styled, SwitchProps} from '@mui/material';
import './Modals.styles.css';
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
const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
}));
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