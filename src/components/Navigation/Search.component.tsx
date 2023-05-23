
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {Search} from '@mui/icons-material'
import InputComponent from '../Input/Input.component';
export default function SearchComponent() {

  return (
	<InputComponent type='text' placeholder='Search Facility' />
	// <FormControl sx={{ m: 1, width: '100%', bgcolor: '#F6F6F6', borderRadius: '25px', border: 'none', outline: 'none' }} variant="filled">
	// 	<InputLabel style={{outline: 'none', border: 'none'}} htmlFor="outlined-adornment-password">Search facility...</InputLabel>
	// 		<OutlinedInput
	// 			id="outlined-adornment-password"
	// 			type={'text'}
	// 			style={{border: 'none', outline: 'none'}}
	// 			endAdornment={
	// 			<IconButton
	// 				aria-label="toggle password visibility"
	// 				onClick={()=>{console.log('Hii')}}
	// 				onMouseDown={()=>{console.log('Hii')}}
	// 				edge="end"
	// 			>
	// 				<Search/>
	// 			</IconButton>
	// 		}
	// 		label="Password"
	// 	/>
	// </FormControl>
  );
}