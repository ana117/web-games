import { BirdImage } from "../../assets/images";

const Bird = ({ birdPosition }) => {
 
    return (
        <img
            src={BirdImage}
            alt="bird"
            className="absolute w-10 h-10"
            style={{
                left: birdPosition.x,
                top: birdPosition.y,
            }}
            draggable={true}
        />
    );
};
 
export default Bird;