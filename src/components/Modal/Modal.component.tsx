import './Modals.styles.css';
// import {WaterDrop, NotificationsOutlined, FireHydrantAltOutlined} from '@mui/icons-material';
import {Modal, } from '@mui/material';
import './Modals.styles.css';
import { useContext } from 'react';
import { DevicesContext } from '../../context/devices.context';
type ModalComponentProps = {
    open: boolean;
    handleClose: () => void;
	ref: React.RefObject<HTMLDivElement>;
	children: React.ReactNode;
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
// import TankSVG from '../../assets/tank.svg'
function ModalComponent({open, handleClose,ref, children}: ModalComponentProps) {
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
			height:'80px', 
			borderRadius:'10px',
			display: 'flex',
			margin:'10px 5px',
			padding:'5px' 
		},
		titleBold:{
			fontSize: '20px',
			fontWeight:'bold', 
			display:'flex'
		}
	}
	const {devices} = useContext(DevicesContext);
	const notifications = devices.reduce((acc,dev)=>(acc+dev.notifications.length),0);
	const totalLiters = devices.reduce((acc,dev)=>(acc+dev.liters),0);
	// console.log('Ref handler: ',refHandler)
    return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			>
				<div style={{
						backgroundColor: '#fff',
						padding: '20px',
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: '90vw',
						maxWidth: '750px',
						alignContent:'center',
						height: '500px',
						overflowY: 'auto',
						
					}}>
					<div ref={ref}>
						<div style={{display: 'flex', alignItems: 'center'}}>
							{/* <WaterDrop style={{fontSize: '20px', color: '#4592F6'}}/> */}
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
						<div style={{padding:'1vw'}}>
							<p>General Overview</p>
							<div style={{display: 'flex',  flexWrap:'wrap' }} >
								<div style={styles.infoContainer}>
									{/* <img src={TankSVG}  style={{height:40, width:40}} /> */}
									<div >
										<p>Total Tanks</p>
										<h1 style={styles.titleBold} >
											{devices.length}
										</h1>
										<p style={{fontSize: '16px', color:'#14AE5D'}}>good condition.</p>
									</div>
								</div>
								<div style={styles.infoContainer}>
									{/* <NotificationsOutlined style={{fontSize:'20px'}} /> */}
									<div>
										<p>Notifications Received</p>
										<p style={styles.titleBold} >
											{notifications}
										</p>
									</div>
								</div>
								<div  style={styles.infoContainer}>
									
									{/* <img src={TankSVG} style={{height:40, width:40}} /> */}
									<div>
										<p>Total Consumption</p>
										<h1 style={styles.titleBold} >
											{totalLiters} Ltrs
										</h1>
									</div>
								</div>
								<div style={styles.infoContainer}>
									{/* <FireHydrantAltOutlined style={{fontSize:'20px'}} /> */}
									
									<div>
										<p>Total Pump Runtime.</p>
										<h1 style={styles.titleBold} >
											53 hrs
										</h1>
									</div>
								</div>
								<div style={styles.infoContainer}>
									{/* <FireHydrantAltOutlined style={{fontSize:'20px'}} /> */}
									<div>
										<p>Total activation of Pump.</p>
										<h1 style={styles.titleBold} >
											26 times
										</h1>
									</div>
								</div>
							</div>
							{children}
						</div>
				</div>
				</div>
		</Modal>
    );
}
export default ModalComponent;