type Props={
    rating: number
}
import { StarHalfOutlined, StarOutlined, StarOutlineOutlined } from '@mui/icons-material';
function RatingComponent({rating}: Props) {
    
        const ratingArr = [1,4,5,7,9]
        return (
            <div>
            {
                ratingArr.slice(0,rating).map((_,i)=>{
                    return (
                        <StarOutlined sx={{color: '#E46B26'}} key={i} />
                    );
                })
            }
            {
                rating%1 !==0 ? (
                    <>
                        <StarHalfOutlined sx={{color: '#E46B26'}} />
                        {
                            ratingArr.slice(rating+1,ratingArr.length).map((_,i)=>{
                                return (
                                    <StarOutlineOutlined sx={{color: '#E46B26'}} key={i} />
                                );
                            })
                        }
                    </>
                ): (
                    ratingArr.slice(rating,ratingArr.length).map((_,i)=>{
                        return (
                            <StarOutlineOutlined sx={{color: '#E46B26'}} key={i} />
                        );
                    })
                )
            }
            </div>
        )
}

export default RatingComponent;