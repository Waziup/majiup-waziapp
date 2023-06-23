import { Avatar } from '@mui/material';
type Props = {
    name: string,
    src: string
}
function AvatarComponent({name,src}: Props) {
    return (
        <Avatar
            alt={name}
            src={src}
            sx={{ width:32, height: 32, }}
            // title={user.name ||''}
            component={()=>(<h1>Oliver</h1>)}
        />
    );
}

export default AvatarComponent;