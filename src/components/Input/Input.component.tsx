
import SearchIcon from '@mui/icons-material/Search';
type Props = React.InputHTMLAttributes<HTMLInputElement>
import React, { useContext } from 'react';
import { DevicesContext } from '../../context/devices.context';
import { Box } from '@mui/material';
function InputComponent({placeholder, type}: Props) {
    const {searchDevices} = useContext(DevicesContext);
    function handleSearch(e: React.ChangeEvent<HTMLInputElement>){
        searchDevices(e.target.value);
    }
    return (
        <>
            <Box  sx={{height: '40px',borderRadius:'20px', display: 'flex', alignItems: 'center', width: '100%', bgcolor: '#F6F6F6'}}>
                <input onChange={handleSearch} style={{height: '100%',paddingLeft:'10px', outline:'none',border: 'none', background: '#F6F6F6', width: '95%', borderRadius: 'inherit'}} className="input_box" type={type} placeholder={placeholder} />
                <SearchIcon style={{color: 'black',cursor:'pointer'}}/>
            </Box>
        </>
    );
}
export default InputComponent;