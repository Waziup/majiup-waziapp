
import SearchIcon from '@mui/icons-material/Search';
type Props = React.InputHTMLAttributes<HTMLInputElement>
import React, { useContext } from 'react';
import { DevicesContext } from '../../context/devices.context';
import { Box } from '@mui/material';
function InputComponent({placeholder, type}: Props) {
    const [search, setSearch] = React.useState<string>('');
    const {searchDevices} = useContext(DevicesContext);
    function handleSearch(e: React.ChangeEvent<HTMLInputElement>){
        setSearch(e.target.value);
        searchDevices(search);
    }
    return (
        <>
            <Box  sx={{height: '40px',borderRadius:'20px', display: 'flex', alignItems: 'center', width: '100%', bgcolor: '#F6F6F6'}}>
                <input value={search} onChange={handleSearch} style={{height: '100%',paddingLeft:'10px', outline:'none',border: 'none', background: '#F6F6F6', width: '95%', borderRadius: 'inherit'}} className="input_box" type={type} placeholder={placeholder} />
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