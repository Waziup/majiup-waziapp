import './Watertank.styles.css';
import BacteriaSVG from '../../assets/bacteria.svg';
import DirtSVG from '../../assets/dirt.svg';
type Props={
    percentage: number,
    waterQuality: string
}

function mapNumberToPercentage(number: number): number{
    const destinationMin = 50;
    const destinationMax = -50; 
    const mappedValue = (number / 100) * (destinationMax - destinationMin) + destinationMin;
    return mappedValue;
}
function WatertankComponent({percentage,waterQuality}: Props) {
    return (
        <div className="circle">
            <style>
                {`
                    .wave:before,
                    .wave:after{
                        content: '';
                        position: absolute;
                        width: 200%;
                        height: 200%;
                        top: ${mapNumberToPercentage(percentage)}%;
                        left: 50%;
                        transform: translate(-50%, -75%);
                    }
                    
                `}   
            </style>
            <h1>{percentage}%</h1>
            <div style={{}} className="wave">
                {
                    waterQuality==='Turbidity' &&(
                        <>
                            <img src={BacteriaSVG} alt="bacteria" className="bacteria"/>
                            <img src={DirtSVG} alt="dirt" className="dirt"/>
                            <img src={DirtSVG} alt="dirt" className="dirt1"/>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default WatertankComponent;