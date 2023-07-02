// import { FireHydrantAltOutlined, NotificationsOutlined, WaterDrop } from '@mui/icons-material';
// import TankSVG from '../../assets/tank.svg'
import React from 'react';
type Props={
	ref: React.RefObject<HTMLDivElement>;
}
function ReportcardComponent({ref}:Props) {
    const titleBold={
        fontSize: '32px',
        fontWeight:'bold', 
        display:'flex'
    }
    const infoContainer ={
        border:'1px solid #000',
        height:'70px', 
        borderRadius:'10px',
        display: 'flex',
        margin:'1%',
        // padding:'1%' 
    }
    return (
        <div  style={{
            // backgroundColor: '#fff',
            width: '90vw',
            // maxWidth: '600px',
            // alignContent:'center',
            // height: '500px',
            // overflowY: 'auto',
            alignSelf: 'center',
        }}>
        {/* <div> */}
            <div ref={ref} style={{display: 'flex', alignItems: 'center'}}>
                {/* <WaterDrop style={{fontSize: '20px', color: '#4592F6'}}/> */}
                <h1 style={{fontSize: '20px', fontWeight:'normal', color: 'black'}}>MajiUp</h1>
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
                    <div style={infoContainer}>
                        {/* <img src="tank.svg" style={{height:'40px', width:'40px'}} /> */}
                        <div style={{flexDirection:'column'}}>
                            <p>Total Tanks</p>
                            <h1 style={{fontSize: '32px',fontWeight:'bold', display:'flex'}} >
                                5
                            </h1>
                            <p style={{fontSize: '16px', color:'#14AE5D'}}>good condition.</p>
                        </div>
                    </div>
                    <div style={infoContainer}>
                        {/* <NotificationsOutlined style={{fontSize:'20px'}} /> */}
                        <div>
                            <p>Notifications Received</p>
                            <p style={titleBold} >
                                27
                            </p>
                        </div>
                    </div>
                    <div  style={infoContainer}>
                        
                        {/* <img src={TankSVG} style={{height:40, width:40}} /> */}
                        <div>
                            <p>Total Consumption</p>
                            <h1 style={titleBold} >
                                1350 Ltrs
                            </h1>
                        </div>
                    </div>
                    <div style={infoContainer}>
                        {/* <FireHydrantAltOutlined style={{fontSize:'20px'}} /> */}
                        
                        <div>
                            <p>Total Pump Runtime.</p>
                            <h1 style={titleBold} >
                                53 hrs
                            </h1>
                        </div>
                    </div>
                    <div style={infoContainer}>
                        {/* <FireHydrantAltOutlined style={{fontSize:'20px'}} /> */}
                        <div>
                            <p>Total activation of Pump.</p>
                            <h1 style={titleBold} >
                                26 times
                            </h1>
                        </div>
                    </div>
                </div>
                
            </div>
        {/* </div> */}
    </div>
    );
}

export default ReportcardComponent;