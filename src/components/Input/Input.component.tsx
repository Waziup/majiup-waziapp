type Props={
    placeholder: string,
    type: string
}
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
function InputComponent({placeholder,type}: Props) {
    return (
        <>
            <Box  sx={{height: '40px',borderRadius:'20px', display: 'flex', alignItems: 'center', width: '100%', bgcolor: '#F6F6F6'}}>
                <input style={{height: '100%',paddingLeft:'10px', outline:'none',border: 'none', background: '#F6F6F6', width: '95%', borderRadius: 'inherit'}} className="input_box" type={type} placeholder={placeholder} />
                <SearchIcon style={{color: 'black',cursor:'pointer'}}/>
            </Box>
            {/* <input style={{outline: 'none',
            width: '100%',
            height: '30px',
            borderRadius: '0px',
            border: '1px solid #ccc',
            marginBottom: '10px',
            padding: '5px'}} type={type} placeholder={placeholder} /> */}
        </>
    );
}
export default InputComponent;