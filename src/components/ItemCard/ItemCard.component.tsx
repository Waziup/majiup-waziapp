import { Box, Stack } from '@mui/material';
type Props = {
    name: string,
    amount: number,
    litresPercent: number,
    handleOpen: ()=>void,
    open: boolean,
    handleClose: ()=>void,
    temp: number,
    isOn: boolean
}
import TankSVG from '../../assets/tank.svg'
const COMMON_P={
    fontSize: '14px',
    paddingTop: '10px',
}
function ItemCardComponent({name,amount,temp,isOn,}: Props) {
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
                    {
                        isOn?(
                            <Box>
                                <h3 style={{fontSize: '20px',fontWeight: 'normal', }}>{name}</h3>
                                <p style={COMMON_P}>Quantity</p>
                                <p style={COMMON_P} >Temperature:</p>
                            </Box>
                        ):(
                            <Box>
                                <h3 style={{fontSize: '20px',fontWeight: 'normal', }}>{name}</h3>
                                <p style={{fontSize: '14px', color: '#888992'}}>Last Update</p>
                            </Box>
                        )
                    }
                    
                </Stack>
                <Box>
                    <h3 style={
                        isOn?{fontSize: '16px', color: '#85ea2d'}:{fontSize: '16px', color: '#888992'}
                    }>{
                        isOn?'Active':'Inactive'
                    }</h3>
                    {
                        isOn?(
                            <>
                                <p style={COMMON_P}>{amount} Ltrs</p>
                                <p style={COMMON_P}>{temp}&#8451;</p>
                            </>
                        ):(
                            <>
                                <p style={{fontSize: '14px', color: '#888992'}}>3hrs Ago</p>
                            </>
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