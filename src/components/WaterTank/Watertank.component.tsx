import './Watertank.styles.css';
import { useEffect, useState } from 'react';
type Props={
    percentage: number
}
// const Circle={
//     position: "relative",
//     width: "250px",
//     height: "250px",
//     background: "#fff",
//     border: "2px solid #D9D9D9",
//     borderRadius: "50%",
//     overflow: "hidden",
//     padding: "2px",
//     fontFamily: "Poppins, sans-serif"
// }

function mapNumberToPercentage(number: number): number{
    number = Math.max(0,Math.min(100,number));
    console.log(number);
    const percentage = (100-number) * 1.5 - 50;
    return percentage;
}
function WatertankComponent({percentage}: Props) {
    const [padding,setPadding]=useState<number>(0);
    useEffect(()=>{
        setPadding(mapNumberToPercentage(percentage));
    },[percentage])
    // const BoxStyles={
    //     position: 'relative',
    //     width: '100%',
    //     height: '100%',
    //     background:' #4E97F5',
    //     borderRadius: '50%',
    //     boxShadow: 'inset 0 0 50px rgba(0, 0, 0, 0.5)',
    //     ":before":{
    //         content: '',
    //         position: "absolute",
    //         width: "200%",
    //         height: "200%",
    //         top: `${padding}%`,
    //         left: "50%",
    //         transform: "translate(-50%, -75%)"
    //     },
    //     ":after":{
    //         content: '',
    //         position: "absolute",
    //         width: "200%",
    //         height: "200%",
    //         top: "15%",
    //         left: "50%",
    //         transform: "translate(-50%, -75%)",
    //         borderRadius: "40%",
    //         background: "rgba(255, 255, 255, .5)",
    //         animation: "animate 10s linear infinite"
    //     },
            
        
    // }
    return (
        <div className="circle">
            <h1>{percentage}%</h1>
            <div className="wave">
        </div>
    </div>
    );
}

export default WatertankComponent;