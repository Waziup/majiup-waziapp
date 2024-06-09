import "./Watertank.styles.css";
// import BacteriaSVG from "../../assets/bacteria.svg";
// import DirtSVG from "../../assets/dirt.svg";
type Props = {
  percentage: number;
  waterQuality: string;
  consumption: any;
};

function mapNumberToPercentage(number: number): number {
  const destinationMin = 50;
  const destinationMax = -50;
  const mappedValue =
    (number / 100) * (destinationMax - destinationMin) + destinationMin;
  return mappedValue;
}
function WatertankComponent({ percentage }: Props) {
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
                        top:  ${`${mapNumberToPercentage(
                          percentage
                        )}%`};                        
                        left: 50%;
                        transform: translate(-50%, -75%);
                    }
                    
                `}
      </style>

      {/* 
      
      top: ${
                          percentage
                            ? `${mapNumberToPercentage(percentage)}%`
                            : 0
                        };
      */}

      {percentage ? (
        <h1>{percentage}%</h1>
      ) : (
        <h1 style={{ color: "red", fontSize: 22, textAlign: "center" }}>
          Setup incomplete!
        </h1>
      )}

      <div style={{}} className="wave"></div>
    </div>
  );
}

export default WatertankComponent;
