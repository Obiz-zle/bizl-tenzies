import React from "react";

export default function Die(props){

    //const[dieFace, setDieFace] = React.useState(props.value);
    //const[degrees, setDegrees] = React.useState({xDeg:0, yDeg:0});
    const[rotation, setRotation] = React.useState({});// i could do without putting rotation in a state

  
    const dotStyle ={backgroundColor:`${props.dieDotsColor}`}
    const sideStyle = {backgroundColor:`${props.dieSidesColor}`}

        let rnd, x, y;
        
      
        rnd = props.value;
        switch (rnd) {
          case 1:
            x = 720;
            y = 810;
            break;
          case 6:
            x = 720;
            y = 990;
            break;
          default:
            x = 720 + (6 - rnd) * 90;
            y = 900;
            break;
        }
       const degrees =  {xDeg:x, yDeg:y}
       

       React.useEffect(()=>{
        setRotation({transform : "translateZ(-25px) rotateY(" + degrees.xDeg + "deg) rotateX(" + degrees.yDeg + "deg)"});
       },[]);
        
    
        





    return(
       <>
              <div className="panel"
                style={{
                    backgroundColor: props.isHeld ? `${props.dieDotsColor}` : "white",
                    boxShadow: props.isHeld ? "15px 15px 10px 1px rgba(0, 0, 0, 0.7)" : ""
                }}
                >
                    <div className="dice"
                         style={rotation}
                         onClick={props.holdDice}
                        
                    >
                        <div className="side one" style={sideStyle}>
                            <span className="dot" style={dotStyle}></span>
                        </div>
                        <div className="side two" style={sideStyle}>
                            <span className="dot" style={dotStyle}></span>
                            <span className="dot" style={dotStyle}></span>
                        </div>
                        <div className="side three" style={sideStyle}>
                            <span className="dot" style={dotStyle}></span>
                            <span className="dot" style={dotStyle}></span>
                            <span className="dot" style={dotStyle}></span>
                        </div>
                        <div className="side four" style={sideStyle}>
                        <div className="kolona">
                            <span className="dot" style={dotStyle}></span>
                            <span className="dot" style={dotStyle}></span>
                        </div>
                        <div className="kolona">
                            <span className="dot" style={dotStyle}></span>
                            <span className="dot" style={dotStyle}></span>
                        </div>
                        </div>
                        <div className="side five" style={sideStyle}>
                        <div className="kolona">
                            <span className="dot" style={dotStyle}></span>
                            <span className="dot" style={dotStyle}></span>
                        </div>
                        <div className="kolona">
                            <span className="dot" style={dotStyle}></span>
                        </div>
                        <div className="kolona">
                            <span className="dot" style={dotStyle}></span>
                            <span className="dot" style={dotStyle}></span>
                        </div>
                        </div>
                        <div className="side six" style={sideStyle}>
                        <div className="kolona">
                            <span className="dot" style={dotStyle}></span>
                            <span className="dot" style={dotStyle}></span>
                        </div>
                        <div className="kolona">
                            <span className="dot" style={dotStyle}></span>
                            <span className="dot" style={dotStyle}></span>
                        </div>
                        <div className="kolona">
                            <span className="dot" style={dotStyle}></span>
                            <span className="dot" style={dotStyle}></span>
                        </div>
                        </div>
                    </div>
                </div>

             
       </>
    );

}
