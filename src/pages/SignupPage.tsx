import { Box, Button, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, WaterDrop } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { DevicesContext } from '../context/devices.context';
import axios from 'axios';
const FormInput={
    border:'1px solid #ccc',
    outline: 'none',
    padding: '15px 20px',
    borderRadius:'25px',
    height: 40,
    width:'100%',
    color: 'rgba(black,black,black,.7)'
}
const FormInput1={
    border:'none',
    outline: 'none',
    padding: '15px 20px',
    borderRadius:'25px',
    height: '100%',
    width:'90%',
    color: 'rgba(black,black,black,.7)'
}

const FormHolder={
    width: '300px',
    height: '200px',
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    boxSizing: 'border-box',
    textAlign: 'center',
}
const InputLabel={
    fontSize:'12px',
    display:'block', 
    color: 'rgba(black,black,black,.7)',
    padding: '10px 0'
}
function SignUpPage() {
    const {setUser} = useContext(DevicesContext);
    const [isText, setIsText] = useState(false);
    const navigate = useNavigate();
    const [userData,setUserData] = useState({
        name:'',
        password:''
    })
    const [err,setErr] = useState<string>('');
    function submitLoginHandler(e: React.SyntheticEvent){
        e.preventDefault();
        axios.post('http//wazigate.local/auth/token',{
            username:userData.name,
            password:userData.password,
        },{
            headers:{
                'Content-Type':'text/plain'
            }
        }).then((res)=>{
            setUser(userData.name,res.data);
        }).catch((err)=>{
            setErr(err.response.data)
            setUser(userData.name,'gffgg');
        })
        navigate('/dashboard')
    }
    function handleInputChange(e: React.FormEvent<HTMLInputElement>){
        setUserData({...userData, [e.currentTarget.name]: e.currentTarget.value});
        setErr('');
    }
    return (
        <Box>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <WaterDrop style={{fontSize: 'calc(20px + 1vw)', color: '#4592F6'}}/>
                <h1 style={{fontSize: 'calc(20px + 1vw)', fontWeight:'normal'}}>MajiUp</h1>
            </Box>
            <Box sx={{bgcolor: '#F6F6F6',height: '100vh',}}>
                {/* <Box src={MajiUpIcon} component='img' sx={{height: 80,width: 80, }} /> */}
                <Box sx={{height: '80%', textAlign: 'center', position: 'relative' }}>
                    <Box sx={{}}>
                        <Box sx={{bgcolor: '#fff',height: '100vh', textAlign: 'center', position: 'relative' }}>
                            <Box sx={FormHolder}>
                                <h2 style={{fontSize:'36px', color: 'rgba(black,black,black,.7)'}}>Welcome!</h2>
                                <form onSubmit={submitLoginHandler}>
                                    <Box>
                                        <label style={InputLabel} htmlFor="email">Email address</label>
                                        <input name='email' onChange={handleInputChange} required placeholder='admin@waziup.org' style={FormInput} type='text' />
                                    </Box>
                                    <Box>
                                        <label style={InputLabel} htmlFor="User Name">User Name</label>
                                        <input name='email' onChange={handleInputChange} required placeholder='' style={FormInput} type='text' />
                                    </Box>
                                    <Box sx={{display: 'flex',flexDirection:'column', justifyContent:'flex-start'}}>
                                        <label style={InputLabel} htmlFor="password">Password</label>
                                        <Stack sx={{border:'1px solid #ccc', borderRadius:'25px', height: 40}} alignItems={'center'} flexDirection={'row'}>
                                            <input name='password' onChange={handleInputChange} required placeholder='password' style={FormInput1} type={isText?'text':'password'}/>
                                            <Visibility onClick={()=>setIsText(!isText)} sx={{color:'#979797', cursor: 'pointer'}} />
                                        </Stack>
                                    </Box>
                                    <Box sx={{display: 'flex',flexDirection:'column', justifyContent:'flex-start'}}>
                                        <label style={InputLabel} htmlFor="password">Confirm Password.</label>
                                        <Stack sx={{border:'1px solid #ccc', borderRadius:'25px', height: 40}} alignItems={'center'} flexDirection={'row'}>
                                            <input name='password' onChange={handleInputChange} required placeholder='confirm password' style={FormInput1} type={isText?'text':'password'}/>
                                            <Visibility onClick={()=>setIsText(!isText)} sx={{color:'#979797', cursor: 'pointer'}} />
                                        </Stack>
                                    </Box>
                                    {
                                        err && <Typography sx={{color: 'red', fontSize: '12px', textAlign: 'left', padding: '10px 0'}}>{err}</Typography>
                                    }
                                    
                                {/* <Link to="/" style={{textDecoration: 'none',padding: '10px', fontWeight:'lighter', color: '#7692DB'}}>Forgot Password?</Link> */}
                                    
                                    <Button type='submit' sx={{color: 'black',height: 46, bgcolor: '#E46B26', width: '90%', borderRadius: '24px', padding: '4px', marginTop: '20px'}} variant="contained">
                                        {/* <Link to="/dashboard" style={{textDecoration: 'none', color: 'white'}}> */}
                                        LOGIN
                                        {/* </Link> */}
                                    </Button>
                                </form>
                                <Link to="/" style={{textDecoration: 'none',padding: '10px', fontWeight:'lighter', color: '#7692DB'}}>Forgot Password?</Link>
                            </Box>
                        </Box>
                        <Box sx={{textAlign: 'center'}}>
                            <p style={{fontFamily: 'cursive',fontWeight:'500', fontSize:12}}>&copy; Copyright 2023
                                <span style={{margin: '0 10px'}}>.</span>
                                <span style={{margin: '0 10px'}}>Privacy Policy</span>
                            </p>
                        </Box>
                    </Box>
                </Box>
        </Box>
            {/* <Box sx={{}}>
                
                <Box sx={{bgcolor: '#fff',height: '100vh', textAlign: 'center', position: 'relative' }}>
                    <Box sx={FormHolder}>
                        <h2 style={{color: 'white'}}></h2>
                        <InputComponent type='text' placeholder='UserName' />
                        <InputComponent type='email' placeholder='Email'/>                        
                        <InputComponent type='password' placeholder='Password'/>                        
                        <InputComponent type='password' placeholder='Repeat Password'/>                        
                        <Button sx={{color: 'black', bgcolor: 'white', width: '90%', borderRadius: '2px', padding: '4px', marginTop: '40px'}} variant="contained">
                            <Link to="/dashboard" style={{textDecoration: 'none', color: 'black'}}>LOGIN</Link>
                        </Button>
                    </Box>
                </Box>
            </Box> */}
        </Box>
    );
}

export default SignUpPage;