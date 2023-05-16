import { Badge } from '@mui/material';
import { AddAlarm, } from '@mui/icons-material';
function BadgeComponent() {
    return (
        <Badge badgeContent={1} color="primary">
            <AddAlarm color="action" />
        </Badge>
    );
}

export default BadgeComponent;