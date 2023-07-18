// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {Document,Page, View, Text, StyleSheet,Image, } from '@react-pdf/renderer'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
function DocumentComponent({reportRef, totalDevices, user, totalLiters}:{reportRef: HTMLDivElement, user: string, totalLiters: number, totalDevices: number}) {
    html2canvas(reportRef)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            console.log('====================================');
            console.log(imgData);
            // setImage(imgData)
            console.log('====================================');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);

            pdf.save("download.pdf");
	})
	.catch((err) => console.log(err));
	return (
        <Document >
			<Page size={'A4'} >
				<View style={styles.rowContainer}>
					{/* <WaterDrop style={{fontSize: 'calc(20px+2vw)', color: '#4592F6'}}/> */}
					
					<Text style={styles.headerText}>MajiUp</Text>
				</View>
				<View style={styles.infor}>
					<Text style={styles.boldText}>Analytics Report</Text>
					<Text style={styles.normalText}>Generated: {new Date().toDateString()}</Text>
				</View>
				<View style={styles.infor}>
					<View>
						<Text style={styles.boldText}>Name:
							<Text style={styles.normalText}>{user}</Text>
						</Text>
					</View>
					<View>
						<Text style={styles.boldText}>
						Address:
							<Text style={styles.normalText}>Kenya</Text>
						</Text>
					</View>
					<View>
						<Text style={styles.boldText}>
							Email: 
						<Text style={styles.normalText}>  johndoe@gmail.com</Text>
							</Text>
					</View>
				</View>
				<View style={{margin: '1vw'}}>
					<Text>General Overview</Text>
					<View style={styles.elementsFlex} >
						<View  style={styles.infoContainer}>
							<Image fixed source='http://localhost:5173/src/assets/tank_sett.png' style={styles.smallStyle}/>

							{/* <Box src={TankSVG} component={'img'} sx={{height:40, width:40}} /> */}
							<View style={{flexDirection:'column'}}>
								<Text>Total Tanks</Text>
								<Text style={styles.titleBold} >
									{totalDevices}
								</Text>
								<p style={styles.greenText}>good condition.</p>
							</View>
						</View>
						<View style={styles.infoContainer}>
							<Image fixed source='http://localhost:5173/src/assets/notifications.png' style={styles.smallStyle}/>

							{/* <NotificationsOutlined sx={{fontSize:'4vw'}} /> */}
							<View>
								<Text>Notifications Received</Text>
								<Text style={styles.titleBold} >
									27
								</Text>
							</View>
						</View>
						<View  style={styles.infoContainer}>
							<Image fixed source='http://localhost:5173/src/assets/round_tank.png' style={styles.smallStyle}/>
							
							{/* <Box src={TankSVG} component={'img'} sx={{height:40, width:40}} /> */}
							<View>
								<Text>Total Consumption</Text>
								<Text style={styles.titleBold} >
									{totalLiters} Ltrs
								</Text>
							</View>
						</View>
						<View style={styles.infoContainer}>
							{/* <FireHydrantAltOutlined sx={{fontSize:'4vw'}} /> */}
							<Image fixed source='http://localhost:5173/src/assets/fire_hydrant.png' style={styles.smallStyle}/>
							<View>
								<Text>Total Pump Runtime.</Text>
								<Text style={styles.titleBold} >
									53 hrs
								</Text>
							</View>
						</View>
						<View style={styles.infoContainer}>
							{/* <FireHydrantAltOutlined sx={{fontSize:'4vw'}} /> */}
							<Image fixed source='http://localhost:5173/src/assets/fire_hydrant1.png' style={styles.smallStyle}/>
							<View>
								<Text>Total activation of Pump.</Text>
								<Text style={styles.titleBold} >
									26 times
								</Text>
							</View>
						</View>
					</View>
				</View>
			</Page>
		</Document>
    );
}
const styles = StyleSheet.create({
	modalContainer:{
		backgroundColor: '#fff',
		padding: 2,
	},
	imageStyle:{width: '100px', height: '200px'},
	smallStyle:{
		width: '40px', 
		height: '40px'
	},

	infor:{
		flexDirection:'row', 
		alignItems: 'center', 
		justifyContent:'space-between',
		borderBottom:'1px solid #000',
		marginVertical: 15,
	},
	rowContainer:{
		flexDirection:'row', alignItems: 'center'
	},
	headerText:{fontSize: '20px', fontWeight:'normal'},
	infoContainer:{
		border:'1px solid #000',
		height:'100px', 
		borderRadius:'10px',
		flexDirection:'row',
		alignItems: 'center',
		margin:'1%',
	},
	titleBold:{
		fontSize: '30px',
		fontWeight:'bold', 
		flexDirection:'row'
	},
	elementsFlex:{flexDirection:'row',alignItems: 'center', flexWrap:'wrap' },
	normalText:{fontSize: '16px', fontWeight:'normal'},
	boldText: {fontSize: '16px', fontWeight:'bold'},
	greenText:{fontSize: '16px', color:'#14AE5D'},
})
export default DocumentComponent;