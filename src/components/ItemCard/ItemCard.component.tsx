import { Box, Stack } from '@mui/material';
type Props = {
    owner: string,
    amount: number,
    litresPercent: number,
    handleOpen: ()=>void,
    open: boolean,
    handleClose: ()=>void,
    temp: number,
    isOn: boolean
}
import TankSVG from '../../assets/tank.svg'
function ItemCardComponent({owner,amount,temp,isOn,}: Props) {
    return (
        <Box  sx={{ ":hover":{bgcolor:'#FFE6D9'},cursor: 'pointer', transition: '.5s', borderRadius: '5px', width: '100%',boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px'}}>
                <Stack direction={'row'}>
                    <Box component={'img'} 
                        src={TankSVG} 
                        sx={{
                            width: '16px', 
                            height: '38.33px',
                            marginRight: '10px',
                        }}
                    />
                    <Box>
                        <h3 style={{fontSize: '20px',fontWeight: 'normal', }}>{owner}</h3>
                        <p style={{fontSize: '14px',}}>Litre</p>
                        <p>Temperature:</p>
                    </Box>
                </Stack>
                <Box>
                    <h3 style={
                        isOn?{fontSize: '16px', color: '#1a73e8'}:{fontSize: '16px', color: '#888992'}
                    }>{
                        isOn?'On':'Off'
                    }</h3>
                    {
                        isOn?(
                            <>
                                <p style={{fontSize: '14px', color: '#E46B26'}}>{amount}</p>
                                <p style={{fontSize: '14px', color: '#E46B26'}}>{temp}&#8451;</p>
                            </>
                        ):(
                            <p style={{fontSize: '14px', color: '#888992'}}>3hrs Ago</p>
                        )
                    }
                    {/* <p style={{fontSize: '14px', color: '#E46B26'}}>{amount}</p> */}
                    {/* <p style={{fontSize: '14px', color: '#E46B26'}}>{temp}&#8451;</p> */}
                </Box>
            </Box>
        </Box>
    );
}

export default ItemCardComponent;