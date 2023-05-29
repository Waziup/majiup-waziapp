import { Badge } from '@mui/material';
import {Notifications } from '@mui/icons-material';
function BadgeComponent() {
    return (
        <Badge sx={{margin: '0 20px'}} badgeContent={3} color="success">
            <Notifications color="action" />
        </Badge>
    );
}

export default BadgeComponent;