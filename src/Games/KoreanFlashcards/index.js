import GamePage from "../index";
import {useEffect, useState} from "react";
import {getWords} from "./utils";
import Button from "../../components/Button";

const KoreanFlashcardsPage = () => {
    const [words, setWords] = useState([]);
    const [currentWord, setCurrentWord] = useState(null);

    const [hasGuessed, setHasGuessed] = useState(false);
    const [isShowingRomanized, setIsShowingRomanized] = useState(false);

    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const generateRandomWords = () => {
        const randomWords = getWords();
        setWords(randomWords);
        setCurrentWord(randomWords[Math.floor(Math.random() * randomWords.length)]);
    }

    const handleWordClick = (e, word) => {
        if (hasGuessed) {
            return;
        }

        setHasGuessed(true);
        if (word.id === currentWord.id) {
            setScore(s => s + 1);
            e.currentTarget.classList.add('!bg-green-600');
        } else {
            e.currentTarget.classList.add('!bg-red-600');
            const container = e.target.parentElement.parentElement;
            const correctButton = container.querySelector(`button[data-id="${currentWord.id}"]`);
            correctButton.classList.add('!bg-green-600');

            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem('koreanFlashcardsHighScore', JSON.stringify(score));
            }
            setScore(0);
        }
    }

    useEffect(() => {
        generateRandomWords();

        const highScore = localStorage.getItem('koreanFlashcardsHighScore');
        if (highScore) {
            setHighScore(JSON.parse(highScore));
        }
    }, []);

    return (
        <GamePage game="Korean Flashcards">
            <div className="flex flex-col lg:grid grid-cols-5 gap-[1rem] mb-[2rem]">
                <div/>
                {currentWord && (
                    <div className="theme-dark dark:theme lg:w-[36rem] px-[0.5rem] py-[2rem] col-span-3
                                    flex flex-col gap-[2rem] items-center rounded-xl">
                        <div className="text-center">
                            <p className="text-4xl">{currentWord.hangul}</p>
                            {isShowingRomanized &&
                                <p className="text-2xl italic">{currentWord.romanized}</p>
                            }
                        </div>

                        <div className="grid grid-cols-2 gap-[0.5rem] lg:gap-[1.5rem]">
                            {words.map((word) => (
                                <button key={word.id}
                                        data-id={word.id}
                                        onClick={(e) => handleWordClick(e, word)}
                                        className="theme dark:theme-dark hover:bg-accent
                                                   rounded-xl lg:w-[12rem] text-center">
                                    <p className="text-lg lg:text-2xl font-semibold break-words p-[2rem] rounded-xl">
                                        {word.meaning}
                                    </p>
                                </button>
                            ))}
                        </div>

                        {hasGuessed && (
                            <Button customClass="text-2xl px-[5rem] py-[1rem] underline underline-offset-4"
                                    onClick={() => {
                                        setHasGuessed(false);
                                        generateRandomWords();
                                    }}>
                                Next
                            </Button>
                        )}
                    </div>
                )}

                <div className="lg:w-[12rem] mt-[1rem] lg:mt-0">
                    <div className="grid grid-cols-2
                                    lg:flex lg:flex-col gap-[1rem] justify-between items-center
                                    text-xl lg:text-2xl lg:text-right font-semibold">
                        <p className="w-full col-span-2">
                            High Score: {highScore}
                        </p>
                        <p className="w-full">
                            Score: {score}
                        </p>
                        <Button customClass="w-full col-span-2 text-lg"
                                onClick={() => {
                                    setIsShowingRomanized(prev => !prev)
                                }}>
                            Show Romanized
                        </Button>
                    </div>
                </div>
            </div>
        </GamePage>
    );
}

export default KoreanFlashcardsPage;