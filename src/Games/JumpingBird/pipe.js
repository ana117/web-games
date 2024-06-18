import { PipeFlippedImage, PipeImage } from "../../assets/images";

const Pipes = ({ pipePosition, flip }) => {
    let pipeImage = PipeImage;
    if (flip) {
        pipeImage = PipeFlippedImage;
    }

    return (
        <img
            src={pipeImage}
            alt="pipe"
            className="absolute"
            style={{
                left: pipePosition.x,
                top: pipePosition.y,
            }}
            draggable={true}
        />
    );
};
 
export default Pipes;