import ProgressComponent from '../Progress/Progress.component';
import ModalComponent from '../Modal/Modal.component';
import { Box } from '@mui/material';
import { ExpandMoreOutlined } from '@mui/icons-material';
import dx from './ItemCard.styles.css'
type Props = {
    owner: string,
    amount: number,
    litresPercent: number,
    handleOpen: ()=>void,
    open: boolean,
    handleClose: ()=>void
}

function ItemCardComponent({owner,amount, litresPercent,open,handleOpen,handleClose}: Props) {
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
                        <Box sx={{bgcolor:'#040273', height: `${litresPercent}%`, position: 'absolute', width: '100%', bottom: 0, left: 0, color: '#fff', fontSize: '20px'}}>{amount} %</Box>
                    </Box>
                    <Box style={{width: '45%',margin: '16px 0'}}>
                        <h4>Quality: <span style={{color: '#25E115'}}>Good</span></h4>
                        
                        <ProgressComponent/>
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
}

export default ItemCardComponent;