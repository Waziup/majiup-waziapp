import { Box } from '@mui/material';
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
function ItemCardComponent({owner,amount,temp,isOn,}: Props) {
    return (
        <Box  sx={{ ":hover":{bgcolor:'#F0AC85'},cursor: 'pointer', transition: '.5s', borderRadius: '5px', width: '100%',boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px'}}>
                <Box>
                    {/* <Logo height={23}/> */}
                    <h3 style={{fontSize: '20px',fontWeight: 'normal', }}>{owner}</h3>
                    <p style={{fontSize: '14px',}}>Litre</p>
                    <p>Temperature:</p>
                </Box>
                <Box>
                    <h3 style={
                        isOn?{fontSize: '16px', color: 'green'}:{fontSize: '16px', color: 'red'}
                    }>{
                        isOn?'ON':'OFF'
                    }</h3>
                    <p style={{fontSize: '14px', color: '#E46B26'}}>{amount}</p>
                    <p style={{fontSize: '14px', color: '#E46B26'}}>{temp}&#8451;</p>
                </Box>
            </Box>
        </Box>
    );
}

export default ItemCardComponent;