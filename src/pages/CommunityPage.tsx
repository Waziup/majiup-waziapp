import NavigationIndex from '../components/Navigation';
import SideNavigation from '../components/SideNavigation';
import { Grid, Box } from '@mui/material';
import { PublishOutlined} from '@mui/icons-material';
type Member={
    consumption: string,
    date: Date,
    litre: number,
    name: string,
    rating: number,
    deviation: number
}
import RatingComponent from '../components/RatingComponent/Rating.component';
import FaceSVG from '../assets/face.svg';
function CommunityPage() {
    const community: Member[]=[
        {
            consumption: 'Weekly Consumption',
            date: new Date(),
            litre: 1709,
            name: 'Joseph Musya',
            rating: 5,
            deviation: 1.5
        },
        {
            consumption: 'Monthly Consumption',
            date: new Date(),
            litre: 246,
            name: 'Oliver Kipkemei',
            rating: 4,
            deviation: 1.5
        },
        {
            consumption: 'Yearly Consumption',
            date: new Date(),
            litre: 300,
            name: 'Solomon Githu',
            rating: 3.5,
            deviation: 1.5
        },
    ]
    return (
        <Grid container style={{background: '#F6F6F6'}} spacing={2}>
            <Grid item  xs={12} >
                <NavigationIndex />
            </Grid>
            <Grid container spacing={2}>       
                <Grid item xs={2.5}>
                    <SideNavigation />
                </Grid>
                <Grid style={{margin: '10px'}} item xs={9}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <h3 style={{fontSize: '24px',margin:'10px 0'}}>Community</h3>
                        <p style={{color: '#fff',fontSize: 16, borderRadius: '20px', padding:'10px 12px', display: 'flex',alignItems: 'center',backgroundColor: '#1C1B1F'}}>
                            <PublishOutlined sx={{fontSize: 16, margin:'0 4px'}}/>
                            Publish
                        </p>
                    </Box>
                    <p style={{color: '#888992'}}>Appreciate the community to construct a sustainable water management system</p>
                    <Box sx={{display: 'flex', alignItems:'center',  flexWrap: 'wrap'}}>
                        {
                            community.map((member: Member,id)=>(
                                <Box sx={{bgcolor: '#fff', width: '30%',margin:'2% 1%', }}  key={id}>
                                    <Box sx={{padding: '20px'}}>
                                        <h4 style={{fontSize: '16px'}} >
                                            {member.consumption}
                                            <span style={{color: '#888992',fontWeight: 'lighter', marginLeft: '5%'}}>{member.date.toDateString()}</span>
                                        </h4>
                        
                                        <h1 style={{fontSize: '48px'}} >
                                            {member.litre}
                                            <span style={{fontSize: '16px'}}>Litre</span>
                                        </h1>
                                        <p style={{fontSize: '16px', fontWeight: '600'}}>{member.deviation}% less than week 24</p>
                                    </Box>
                                    <Box sx={{bgcolor: '#E8E8E8', display: 'flex',justifyContent: 'space-evenly', alignItems:'center',padding:'2%', width: '100%'}}>
                                        <>
                                            <Box src={FaceSVG} component='img' sx={{width: 16}}/>
                                            <h3 style={{fontSize: '16px', alignItems: 'center', fontWeight: '600'}}>
                                                {member.name}
                                            </h3>
                                        </>
                                        <RatingComponent rating={member.rating} />
                                    </Box>
                                </Box>
                            ))
                        }
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default CommunityPage;