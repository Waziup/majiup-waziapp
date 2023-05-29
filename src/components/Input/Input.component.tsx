import './Input.styles.css';
type Props={
    placeholder: string,
    type: string
}
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
function InputComponent({placeholder,type}: Props) {
    return (
        <Box sx={{height: '30px',borderRadius:'20px', width: '100%', bgcolor: '#F6F6F6'}}>
            <input className="input_box" type={type} placeholder={placeholder} />
            <SearchIcon style={{color: 'black',}}/>
        </Box>
    );
}
export default InputComponent;