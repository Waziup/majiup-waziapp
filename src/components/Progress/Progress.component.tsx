import { LinearProgress} from '@mui/material';
import './Progress.styles.css'
function ProgressComponent({progress=0}) {
    return (
        <LinearProgress
            style={{width: '100%',
            height: 10,
            color: 'green',
            borderRadius: 5,
            margin: '10px 0',
            background: 'linear-gradient(to right, red, #00FF00)'}}
            variant="determinate"
            value={progress}
        />
    );
}

export default ProgressComponent;