import React from 'react';
import {WaterDrop, } from '@mui/icons-material';
import {Box, } from '@mui/material';
import './Modals.styles.css';
import { useContext, } from 'react';
import { DevicesContext } from '../../context/devices.context';
type ModalComponentProps = {
    open: boolean
    handleClose: () => void;
	ref?: React.RefObject<HTMLDivElement>;
	children: React.ReactNode;
}

import TankSVG from '../../assets/tank_sett.svg';
import RoundTankSVG from '../../assets/round_tank.svg';
import NotificationSVG from '../../assets/notifications.svg';
import FireHydrantSVG from '../../assets/fire_hydrant.svg';
import FireHydrantSVG1 from '../../assets/fire_hydrant1.svg';
const ImageStyle={height:40, width:40};
function ModalDocumentDownloadComponent({children}: ModalComponentProps) {
    const styles={
		modalContainer:{
			backgroundColor: '#fff',
			padding: 2,
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
			padding:'5px',
			alignItems:'center',
		},
		titleBold:{
			fontSize: '30px',
			fontWeight:'bold', 
			display:'flex'
		}
	}
	const {devices,user }= useContext(DevicesContext);
	const notifications=0;
	// const notifications = devices.reduce((acc,dev)=> dev.notifications.length>0?(acc+dev.notifications.length):0,0);
	const totalLiters = devices.reduce((acc,dev)=>(acc+dev.liters),0);
	
    return (
        <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            alignContent:'center',
            overflowY: 'auto',
        }}>
        <div >
            <div style={{display: 'flex', alignItems: 'center'}}>
                <WaterDrop style={{fontSize: '20px', color: '#4592F6'}}/>
                <h1  style={{...styles.headerText}}>MajiUp</h1>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent:'space-between',borderBottom:'1px solid #000'}}>
                <p style={{fontSize: '16px', fontWeight:'bold'}}>Analytics Report</p>
                <p style={{fontSize: '16px', fontWeight:'normal'}}>Generated: {new Date().toDateString()}</p>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent:'space-between',borderBottom:'1px solid #000'}}>
                <div style={{display:'flex',alignItems:'center'}}>
                    <p style={{fontSize: '16px', fontWeight:'bold'}}>Name:
                    </p>
                    <p style={{fontSize: '16px', fontWeight:'normal'}}>{user.name}</p>
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                    <p style={{fontSize: '16px', fontWeight:'bold'}}>
                    Address:
                    </p>
                        <p style={{fontSize: '14px', fontWeight:'normal'}}>Kenya</p>
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                    <p style={{fontSize: '16px', fontWeight:'bold'}}>
                        Email:
                        </p>
                    <p style={{fontSize: '16px', fontWeight:'normal'}}>  johndoe@gmail.com</p>
                </div>
            </div>
            <div id='divEl' style={{padding:'1vw'}}>
                <p>General Overview</p>
                <div style={{display: 'flex',  flexWrap:'wrap' }} >
                    <div style={styles.infoContainer}>
                        <Box component={'img'} src={TankSVG} style={ImageStyle} />
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
                        <Box component={'img'} src={NotificationSVG} style={ImageStyle} />
                        <div>
                            <p>Notifications Received</p>
                            <p style={styles.titleBold} >
                                {notifications}
                            </p>
                        </div>
                    </div>
                    <div  style={styles.infoContainer}>
                        <Box component={'img'} src={RoundTankSVG} style={ImageStyle} />
                        <div>
                            <p>Total Consumption</p>
                            <h1 style={styles.titleBold} >
                                {totalLiters} Ltr
                            </h1>
                        </div>
                    </div>
                    <div style={styles.infoContainer}>
                        {/* <FireHydrantAltOutlined style={{fontSize:'20px'}} /> */}
                        <Box component={'img'} src={FireHydrantSVG} style={ImageStyle} />
                        <div>
                            <p>Total Pump Runtime.</p>
                            <h1 style={styles.titleBold} >
                                53 hrs
                            </h1>
                        </div>
                    </div>
                    <div style={styles.infoContainer}>
                        {/* <FireHydrantAltOutlined style={{fontSize:'20px'}} /> */}
                        <Box component={'img'} src={FireHydrantSVG1} style={ImageStyle} />
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
    );
}

// export default ModalDocumentDownloadComponent;