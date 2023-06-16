import './Modals.styles.css';
import {WaterDrop, NotificationsOutlined, FireHydrantAltOutlined} from '@mui/icons-material';
import {    Button,   Modal, } from '@mui/material';
import './Modals.styles.css';
// import {Document,Page, View, Text, StyleSheet,Image, } from '@react-pdf/renderer'
type ModalComponentProps = {
    open: boolean;
    handleClose: () => void;
	handleGenerate: () => void;
	refHandler: React.RefObject<HTMLDivElement>;
}
// const ModalContainer={
// 	backgroundColor: '#fff',
// 	padding: 2,
// 	position: 'absolute',
// 	top: '50%',
// 	left: '50%',
// 	transform: 'translate(-50%, -50%)',
// 	width: '50%',
// 	minWidth: '85vw',
// 	alignContent:'center',
// 	height: '80vh',
// 	overflowY: 'auto',
// }
const infoContainer={border:'1px solid #000',height:'100px', borderRadius:'10px',display: 'flex',margin:'1%' }

import TankSVG from '../../assets/tank.svg'
function ModalComponent({open, handleClose, handleGenerate, refHandler}: ModalComponentProps) {
	const styles={
		modalContainer:{
			backgroundColor: '#fff',
			padding: 2,
			// position: 'absolute',
			// top: '40%',
			// left: '50%',
			// transform: 'translate(-50%, -50%)',
			// width: '50%',
		},
		rowContainer:{
			display: 'flex', alignItems: 'center'
		},
		headerText:{fontSize: '20px', fontWeight:'normal'},
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
	}
    return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			>
			<div ref={refHandler} style={{
					backgroundColor: '#fff',
					padding: 2,
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					minWidth: '300px',
					maxWidth: '600px',
					alignContent:'center',
					height: '500px',
					overflowY: 'auto',
				}}>
				<div >
					<div style={{display: 'flex', alignItems: 'center'}}>
						<WaterDrop style={{fontSize: '20px', color: '#4592F6'}}/>
						<h1 style={{...styles.headerText}}>MajiUp</h1>
					</div>
					<div style={{display: 'flex', alignItems: 'center', justifyContent:'space-between',borderBottom:'1px solid #000'}}>
						<p style={{fontSize: '16px', fontWeight:'bold'}}>Analytics Report</p>
						<p style={{fontSize: '16px', fontWeight:'normal'}}>Generated: {new Date().toDateString()}</p>
					</div>
					<div style={{display: 'flex', alignItems: 'center', justifyContent:'space-between',borderBottom:'1px solid #000'}}>
						<div>
							<p style={{fontSize: '16px', fontWeight:'bold'}}>Name:
							</p>
								<p style={{fontSize: '16px', fontWeight:'normal'}}></p>
						</div>
						<div>
							<p style={{fontSize: '16px', fontWeight:'bold'}}>
							Address:
							</p>
								<p style={{fontSize: '16px', fontWeight:'normal'}}>Kenya</p>
						</div>
						<div>
							<p style={{fontSize: '16px', fontWeight:'bold'}}>
								Email: 
								</p>
							<p style={{fontSize: '16px', fontWeight:'normal'}}>  johndoe@gmail.com</p>
						</div>
					</div>
					<div >
									<p>General Overview</p>
						<div style={{display: 'flex', alignItems: 'center', flexWrap:'wrap' }} >
							<div  style={styles.infoContainer}>
								<img src={TankSVG}  style={{height:40, width:40}} />
								<div style={{flexDirection:'column'}}>
									<p>Total Tanks</p>
									<h1 style={styles.titleBold} >
										5
									</h1>
									<p style={{fontSize: '16px', color:'#14AE5D'}}>good condition.</p>
								</div>
							</div>
							<div style={styles.infoContainer}>
								<NotificationsOutlined style={{fontSize:'20px'}} />
								<div>
									<p>Notifications Received</p>
									<p style={styles.titleBold} >
										27
									</p>
								</div>
							</div>
							<div  style={styles.infoContainer}>
								
								<img src={TankSVG} style={{height:40, width:40}} />
								<div>
									<p>Total Consumption</p>
									<h1 style={styles.titleBold} >
										1350 Ltrs
									</h1>
								</div>
							</div>
							<div style={infoContainer}>
								<FireHydrantAltOutlined style={{fontSize:'20px'}} />
								
								<div>
									<p>Total Pump Runtime.</p>
									<h1 style={styles.titleBold} >
										53 hrs
									</h1>
								</div>
							</div>
							<div style={styles.infoContainer}>
								<FireHydrantAltOutlined style={{fontSize:'20px'}} />
								<div>
									<p>Total activation of Pump.</p>
									<h1 style={styles.titleBold} >
										26 times
									</h1>
								</div>
							</div>
						</div>
						
					</div>
				</div>
				<Button onClick={handleGenerate} type='submit' style={{color: 'black',height: 46, backgroundColor: '#E46B26', width: '90%', borderRadius: '24px', padding: '4px', marginTop: '20px'}} variant="contained">
					Generate Report
				</Button>
			</div>
		</Modal>
    );
}
export default ModalComponent;