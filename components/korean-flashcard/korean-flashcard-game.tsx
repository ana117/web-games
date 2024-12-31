"use client";

import { useEffect, useState } from "react";
import data from "@/data/topik-1.json";

interface Word {
  korean: string;
  english: string;
}

export default function KoreanFlashcard() {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);

  const [autoContinue, setAutoContinue] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [renderNext, setRenderNext] = useState(false);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const handleOptionClick = (optionElement: HTMLElement) => {
    if (isClicking) return;
    setIsClicking(true);

    const option = optionElement.textContent;
    if (option === currentWord?.english) {
      setScore((prev) => prev + 1);
    } else {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("koreanHighScore", score.toString());
      }
      setScore(0);
      optionElement.classList.add("!bg-red-600");
    }

    const correctOptionElement = document.querySelector(
      `button[data-iscorrect="true"]`,
    );
    correctOptionElement?.classList.add("!bg-green-600");

    if (autoContinue) {
      setTimeout(() => {
        setIsClicking(false);
        selectWord();
      }, 1000);
    } else {
      setRenderNext(true);
    }
  };

  const handleAutoContinueChange = () => {
    setAutoContinue((prev) => !prev);
    localStorage.setItem("koreanAutoContinue", JSON.stringify(!autoContinue));
  }

  const selectWord = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setCurrentWord(data[randomIndex]);

    const options = [data[randomIndex].english];
    while (options.length < 4) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomWord = data[randomIndex];
      if (!options.includes(randomWord.english)) {
        options.push(randomWord.english);
      }
    }

    options.sort(() => Math.random() - 0.5);
    setCurrentOptions(options);
  };

  const renderOption = (option: string) => {
    return (
      <button
        key={option}
        className="h-[4rem] md:h-[10rem] w-full bg-foreground text-background rounded-sm p-4 flex items-center justify-center cursor-pointer hover:scale-105 hover:bg-accent duration-500"
        onClick={(e) => handleOptionClick(e.currentTarget)}
        data-iscorrect={option === currentWord?.english}
      >
        <span className="text-2xl font-bold">{option}</span>
      </button>
    );
  };

  useEffect(() => {
    const bestScore = localStorage.getItem("koreanHighScore");
    if (bestScore) {
      setHighScore(parseInt(bestScore));
    }

    const autoContinue = localStorage.getItem("koreanAutoContinue");
    if (autoContinue) {
      setAutoContinue(JSON.parse(autoContinue));
    }

    selectWord();
  }, []);

  return (
    <div className="flex flex-col items-center justify-between gap-8 h-full">
      <div className="grow flex flex-col items-center justify-center gap-8 w-full lg:w-1/2">
        {currentWord && (
          <>
            <h3 className="text-5xl font-bold">{currentWord.korean}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 w-full h-full px-4 md:px-0">
              {currentOptions.map(renderOption)}
            </div>
          </>
        )}

        {renderNext && (
          <button
            className=" text-2xl font-bold px-4 border-b-2 rounded-sm hover:bg-foreground hover:text-background duration-500"
            onClick={() => {
              setIsClicking(false);
              setRenderNext(false);
              selectWord();
            }}
          >
            <span>
              Next
            </span>
          </button>
        )}
      </div>

      <div className="flex gap-16 items-center justify-between">
        <div className="flex flex-col items-center justify-center gap-2">
          <div>Streak {score}</div>
          <div className="flex gap-2">
            <span>Best Streak</span>
            <span>{highScore}</span>
          </div>
        </div>

        <div>
          <button
            className="font-bold px-4 border-b-2 rounded-sm duration-500 hover:bg-foreground hover:text-background"
            onClick={handleAutoContinueChange}
          >
            <span>Auto-Continue: {autoContinue ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
