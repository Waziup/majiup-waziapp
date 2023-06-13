import { Box,} from '@mui/material';
import { PublishOutlined, Face} from '@mui/icons-material';
type Member={
    consumption: string,
    date: Date,
    litre: number,
    name: string,
    rating: number,
    deviation: number
}
import RatingComponent from '../components/RatingComponent/Rating.component';
import { useOutletContext } from 'react-router-dom';
// import FaceSVG from '../assets/face.svg';
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
    const [matches] = useOutletContext<[matches: boolean]>();
    const ItemsContainer={
        display: 'flex', 
        alignItems:'center',  
        flexWrap: 'wrap'
    }
    const days=['Sun','Mon','Tue','Wed','Thur','Fri','Sat']
    return (
        <Box pl={2} pr={2}>
            <Box mb={2} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h3 style={{fontSize: '24px',margin:'10px 0'}}>Community</h3>
                <p style={{color: '#fff',cursor:'pointer',fontSize: 16, borderRadius: '20px', padding:'10px 12px', display: 'flex',alignItems: 'center',backgroundColor: '#1C1B1F'}}>
                    <PublishOutlined sx={{fontSize: 16, margin:'0 4px'}}/>
                    Publish
                </p>
            </Box>
            <p style={{color: '#888992', margin:'10px 0'}}>Appreciate the community to construct a sustainable water management system</p>
            <Box sx={matches?{...ItemsContainer}:{...ItemsContainer,justifyContent:'center',}}>
                {
                    community.map((member: Member,id)=>(
                        <Box sx={{bgcolor: '#fff', minWidth:'290px', width: '30%',margin:'2% 1%', }}  key={id}>
                            <Box sx={{padding: '20px'}}>
                                <h4 style={{fontSize: '16px'}} >
                                    {member.consumption}
                                    <span style={{color: '#888992',fontSize:'12px', fontWeight: 'lighter', marginLeft: '5%'}}>{days[member.date.getDay()]+ ' '+member.date.getMonth()+'/'+member.date.getFullYear()}</span>
                                </h4>
                
                                <h1 style={{fontSize: '48px'}} >
                                    {member.litre}
                                    <span style={{fontSize: '16px'}}>Litre</span>
                                </h1>
                                <p style={{fontSize: '16px', fontWeight: '600'}}>{member.deviation}% less than week 24</p>
                            </Box>
                            <Box sx={{bgcolor: '#E8E8E8', display: 'flex',justifyContent: 'space-evenly', alignItems:'center',padding:'2%', width: '100%'}}>
                                <>
                                    <Face sx={{fontSize: 16, margin:'0 4px'}}/>
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
        </Box>
    );
}

export default CommunityPage;