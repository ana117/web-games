import React, { useEffect, useState } from 'react';
import Bird from "./bird";
import Pipes from "./pipe";

const JumpingBirdGame = ({ setScore }) => {
    const PIPE_WIDTH = 64;
    const INTERVAL = 10;
    const GAP = 200;

    const ref = React.useRef(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const [isStarted, setIsStarted] = useState(false);
    const [birdPosition, setBirdPosition] = useState({ x: 50, y: 50 });
    const [upperPipes, setUpperPipes] = useState([]);
    const [lowerPipes, setLowerPipes] = useState([]);
    const [passedPipes, setPassedPipes] = useState([]);

    
    const generatePipe = () => {
        const yPosition = height - 100 - Math.floor(Math.random() * 100);
        setUpperPipes((prev) => [...prev, { x: width - (2 * 16), y: yPosition - 200 - GAP }]);
        setLowerPipes((prev) => [...prev, { x: width - (2 * 16), y: yPosition }]);
    };

    const movePipes = () => {
        setUpperPipes((prev) => prev.map((pipe) => ({ ...pipe, x: pipe.x - 2 })));
        setLowerPipes((prev) => prev.map((pipe) => ({ ...pipe, x: pipe.x - 2 })));
    };

    const gravity = () => {
        setBirdPosition((prev) => ({ ...prev, y: prev.y + 2 }));
    };

    const jump = () => {
        if (!isStarted) {
            setIsStarted(true);
            generatePipe();
        } else {
            setBirdPosition((prev) => ({ ...prev, y: prev.y - 80 }));
        }
    };

    const resetGame = () => {
        setIsStarted(false);
        setBirdPosition({ x: 50, y: 50 });
        setUpperPipes([]);
        setLowerPipes([]);
        setScore(0);
    }

    const collision = () => {
        const birdX = birdPosition.x;
        const birdY = birdPosition.y;

        // If the bird hits the top or bottom of the screen
        if (birdY <= 0 || birdY >= height - 40) {
            resetGame();
        }

        for (let i = 0; i < upperPipes.length; i++) {
            const pipeX  = upperPipes[i].x;
            const upperPipeY = upperPipes[i].y;
            const lowerPipeY = lowerPipes[i].y;

            // If the bird is passing through the gap
            if (birdX >= pipeX && birdX <= pipeX + PIPE_WIDTH) {
                if (birdY <= upperPipeY + 200 || birdY >= lowerPipeY) {
                    resetGame();
                } else {
                    if (!passedPipes.includes(i)) {
                        setScore((prev) => prev + 1);
                        setPassedPipes((prev) => [...prev, i]);
                    }
                }
            }
        }
    };

    useEffect(() => {
        if (isStarted) {
            const interval = setInterval(() => {
                movePipes();
                gravity();
            }, INTERVAL);

            const generator = setInterval(() => {
                generatePipe();
            }, INTERVAL * 100);

            return () => {
                clearInterval(interval);
                clearInterval(generator);
            };
        }
    }, [isStarted]);

    useEffect(() => {
        collision();
    }, [birdPosition, upperPipes, lowerPipes]);

    useEffect(() => {
        if (ref.current) {
            setWidth(ref.current.offsetWidth);
            setHeight(ref.current.offsetHeight);
        }
    }, []);
 
    return (
        <div ref={ref} className="w-full h-full max-h-[400px] relative bg-white overflow-hidden" onClick={jump}>
            <Bird birdPosition={birdPosition} />
            {upperPipes.map((pipe, index) => (
                <Pipes key={'up'+index} pipePosition={pipe} flip={true} />
            ))}

            {lowerPipes.map((pipe, index) => (
                <Pipes key={'low'+index} pipePosition={pipe} />
            ))}

            {!isStarted && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
                    Click to start the game
                </div>
            )}

        </div>
    );
};

export default JumpingBirdGame;