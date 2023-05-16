import {Box, Grid, LinearProgress} from '@mui/material'
import SideNavigation from './SideNavigation';
import NavigationIndex from './Navigation';
import { useState } from 'react';
import ModalComponent from './Modal/Modal.component';
import { ExpandMoreOutlined } from '@mui/icons-material';
type Props = {
    owner: string,
    amount: number,
    litresPercent: number
}
const ItemCard = ({owner,amount, litresPercent}: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const Progress = ({ progress = 0 }) =>  {
        return (
            <LinearProgress
                style={{ 
                    width: '100%', 
                    height: 10,
                    color: 'green',
                    borderRadius: 5,
                    margin: '10px 0',
                    background: `linear-gradient(to right, red, #00FF00)`
                }}
                variant="determinate"
                value={progress}
            />
        );
      }
    return (
        <Box sx={{width: '100%',boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '10px 20px'}}>
                <h3 style={{fontSize: '20px'}}>{owner}</h3>
                <button onClick={handleOpen} style={{fontSize: '20px', cursor: 'pointer', fontWeight: 'bold', background: 'none', outline: 'none', border: 'none'}} >&#8942;</button>
            </Box>
            <ModalComponent handleOpen={handleOpen}  open={open} handleClose={handleClose} />
            <Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '10px 20px', width:'100%'}}>
                    <Box sx={{border: '3px solid gray',position: 'relative',  width: '50%', textAlign: 'center', height: '250px',borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}>
                        <Box sx={{bgcolor:'#1a73e8', height: `${litresPercent}%`, position: 'absolute', width: '100%', bottom: 0, left: 0, color: '#fff', fontSize: '20px'}}>{amount} %</Box>
                    </Box>
                    <Box style={{width: '45%',margin: '16px 0'}}>
                        <h4>Quality: <span style={{color: '#25E115'}}>Good</span></h4>
                        {/* A div with color range of green and red */}
                        <Progress/>
                    </Box>
                </Box>

                <Box sx={{display: 'flex', alignItems:'center', justifyContent: 'space-evenly', padding: '10px 20px', width:'100%'}}>
                    <h4 style={{color: '#2C2D38'}}>570 litres</h4>
                    <ExpandMoreOutlined style={{color: '#2C2D38', cursor: 'pointer'}}/>
                    <h4 style={{color: '#2C2D38'}}>More</h4>
                </Box>
            </Box>
            <Box></Box>
            <Box></Box>
        </Box>
    );
};

function GridComponent() {
    return (
        <Grid container  spacing={2}>
            <Grid style={{height: '100vh', background: '#1A73E8'}} item xs={2.5}>
                <SideNavigation/>
            </Grid>
            <Grid item xs={9} >
                <NavigationIndex/>
                <Grid container  spacing={2}>
                    <Grid item xs={6}>
                        <Box sx={{bgcolor: '#fff', borderRadius: '10px'}}>
                            <ItemCard owner={'NGO Tank'} amount={75} litresPercent={75}/>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{bgcolor: '#fff', borderRadius: '10px'}}>
                            <ItemCard owner={'KISUMU Polytechnic'} amount={50} litresPercent={50}/>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default GridComponent;