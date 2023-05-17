import { LinearProgress} from '@mui/material';
import './Progress.styles.css'
function ProgressComponent({progress=0}) {
    return (
        <LinearProgress
            className='linear_progress'
            variant="determinate"
            value={progress}
        />
    );
}

export default ProgressComponent;