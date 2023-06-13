import './Modals.styles.css';
import {WaterDrop, NotificationsOutlined, FireHydrantAltOutlined} from '@mui/icons-material';
import { Box,  Button,  Modal, } from '@mui/material';
import './Modals.styles.css';
import {Document,Page, View, Text, StyleSheet,Image} from '@react-pdf/renderer'
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
	minWidth: '85vw',
	alignContent:'center',
	height: '80vh',
	overflowY: 'auto',
}
const infoContainer={border:'1px solid #000',height:'100px', borderRadius:'10px',display: 'flex',margin:'1%' }

import TankSVG from '../../assets/tank.svg'
function ModalComponent({open, handleClose}: ModalComponentProps) {
    
    return (
        
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

                >
				<Box sx={ModalContainer}>

					<Document >
						<Page size={'A4'} >
							<View style={styles.rowContainer}>
								<WaterDrop style={{fontSize: 'calc(20px+2vw)', color: '#4592F6'}}/>
								<Text style={styles.headerText}>MajiUp</Text>
							</View>
							<View style={{display: 'flex', alignItems: 'center', justifyContent:'space-between',borderBottom:'1px solid #000'}}>
								<Text style={{fontSize: '16px', fontWeight:'bold'}}>Analytics Report</Text>
								<Text style={{fontSize: '16px', fontWeight:'normal'}}>Generated: {new Date().toDateString()}</Text>
							</View>
							<View style={{display: 'flex', alignItems: 'center', justifyContent:'space-between',borderBottom:'1px solid #000'}}>
								<View>
									<Text style={{fontSize: '16px', fontWeight:'bold'}}>Name:
										<Text style={{fontSize: '16px', fontWeight:'normal'}}></Text>
									</Text>
								</View>
								<View>
									<Text style={{fontSize: '16px', fontWeight:'bold'}}>
									Address:
										<Text style={{fontSize: '16px', fontWeight:'normal'}}>Kenya</Text>
									</Text>
								</View>
								<View>
									<Text style={{fontSize: '16px', fontWeight:'bold'}}>
										Email: 
									<Text style={{fontSize: '16px', fontWeight:'normal'}}>  johndoe@gmail.com</Text>
										</Text>
								</View>
							</View>
							<View style={{margin: '1vw'}}>
								<Text>General Overview</Text>
								<View style={{display: 'flex', alignItems: 'center', flexWrap:'wrap' }} >
									<View  style={styles.infoContainer}>
										<Box src={TankSVG} component={'img'} sx={{height:40, width:40}} />
										<View style={{flexDirection:'column'}}>
											<Text>Total Tanks</Text>
											<Text style={styles.titleBold} >
												5
											</Text>
											<p style={{fontSize: '16px', color:'#14AE5D'}}>good condition.</p>
										</View>
									</View>
									<View style={styles.infoContainer}>
										<NotificationsOutlined sx={{fontSize:'4vw'}} />
										<View>
											<Text>Notifications Received</Text>
											<Text style={styles.titleBold} >
												27
											</Text>
										</View>
									</View>
									<View  style={styles.infoContainer}>
										
										<Box src={TankSVG} component={'img'} sx={{height:40, width:40}} />
										<View>
											<Text>Total Consumption</Text>
											<Text style={styles.titleBold} >
												1350 Ltrs
											</Text>
										</View>
									</View>
									<Box p={1} sx={infoContainer}>
										<FireHydrantAltOutlined sx={{fontSize:'4vw'}} />
										
										<Box>
											<Text>Total Pump Runtime.</Text>
											<Text style={styles.titleBold} >
												53 hrs
											</Text>
										</Box>
									</Box>
									<View style={styles.infoContainer}>
										<FireHydrantAltOutlined sx={{fontSize:'4vw'}} />
										<Box>
											<Text>Total activation of Pump.</Text>
											<Text style={styles.titleBold} >
												26 times
											</Text>
										</Box>
									</View>
								</View>
								<Image fixed source={'http://localhost:5173/src/assets/chart%20_flow.png'} style={{width: '100px', height: '200px'}} />
								
								
							</View>
						</Page>
					</Document>
					<Button onClick={()=>{console.log(window.location);}} sx={{color: 'white',height: 40, bgcolor: '#E46B26', width: '20%', borderRadius: '24px', padding: '4px', alignSelf:'center', marginTop: '20px'}} variant="contained">
						Download
					</Button>
				</Box>
            </Modal>
    );
}
const styles = StyleSheet.create({
	modalContainer:{
		backgroundColor: '#fff',
		padding: 2,
		position: 'absolute',
		top: '40%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '50%',
	},
	rowContainer:{
		display: 'flex', alignItems: 'center'
	},
	headerText:{fontSize: '2vw', fontWeight:'normal'},
	infoContainer:{
		border:'1px solid #000',
		height:'100px', 
		borderRadius:'10px',
		display: 'flex',
		margin:'1%',
		// padding:'1%' 
	},
	titleBold:{
		fontSize: '32px',
		fontWeight:'bold', 
		display:'flex'
	}
})
export default ModalComponent;