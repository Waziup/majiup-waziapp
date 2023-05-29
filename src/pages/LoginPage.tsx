import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
const FormInput={
    border:'1px solid #ccc',
    outline: 'none',
    padding: '15px 20px',
    borderRadius:'25px',
    height: 40,
    width:'50vh',
    color: 'rgba(black,black,black,.7)'
}

const FormHolder={
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
}
const InputLabel={
    fontSize:'12px',
    display:'block', 
    color: 'rgba(black,black,black,.7)'
}
function LoginPage() {
    return (
        <Box>
            <Box sx={{bgcolor: '#C4C4C4'}}>
                <Box sx={{bgcolor: '#F6F6F6',height: '100vh', textAlign: 'center', position: 'relative' }}>
                    <Box sx={FormHolder}>
                        <h2 style={{fontSize:'36px', color: 'rgba(black,black,black,.7)'}}>Welcome!</h2>
                        <Box>
                            <label style={InputLabel} htmlFor="email">Email address</label>
                            <input placeholder='admin@waziup.org' style={FormInput} type='text' />
                        </Box>
                        <Box>
                            <label style={InputLabel} htmlFor="password">Password</label>
                            <input placeholder='....' style={FormInput} type='password' />
                        </Box>
                        <Button sx={{color: 'black',height: 56, bgcolor: '#E46B26', width: '90%', borderRadius: '24px', padding: '4px', marginTop: '40px'}} variant="contained">
                            <Link to="/dashboard" style={{textDecoration: 'none', color: 'white'}}>LOGIN</Link>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default LoginPage;