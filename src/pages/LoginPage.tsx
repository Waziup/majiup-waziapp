import { WaterDrop } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function LoginPage() {
    return (
        <Box>
            <Box sx={{}}>
                <Box sx={{margin: '0', padding: '30px', 
                    height: 50, boxSizing: 'border-box', 
                    display:'flex', background: 'linear-gradient(to right, #fff, #040273)', 
                    justifyContent: 'space-between', alignItems:'center', 
                    width: '100%', color: 'white' }}>
                    <Box>
                        <h2 style={{display: 'inline-block', color: 'black'}}>MajiUp</h2>
                        <WaterDrop style={{fontSize: 30, color: 'black'}}/>
                    </Box>
                    <Button sx={{color: 'white', bgcolor: 'inherit',border: '1px solid #fff', width: '120px', borderRadius: '20px', padding: '4px'}} variant="outlined">SIGN UP</Button>
                </Box>
                <Box sx={{bgcolor: '#fff',height: '100vh', textAlign: 'center', position: 'relative' }}>
                    <Box sx={{
                        border: '2px solid #fff',
                        bgcolor: '#040273',
                        width: '300px',
                        height: '200px',
                        position: 'absolute',
                        top: '40%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '10px',
                        boxSizing: 'border-box',
                        textAlign: 'center',
                        padding: '2vw',
                    }}>
                        <h2 style={{color: 'white'}}></h2>
                        <input style={{ outline: 'none', width: '100%', height: '30px', borderRadius: '0px', border: '1px solid #ccc', padding: '5px'}} type="text" placeholder="Username" />
                        <input style={{ outline: 'none', width: '100%', height: '30px', borderRadius: '0px', border: '1px solid #ccc', padding: '5px', marginTop: '10px'}} type="password" placeholder="Password" />
                        <Button sx={{color: 'black', bgcolor: 'white', width: '90%', borderRadius: '2px', padding: '4px', marginTop: '40px'}} variant="contained">
                            <Link to="/dashboard" style={{textDecoration: 'none', color: 'black'}}>LOGIN</Link>
                        </Button>

                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default LoginPage;