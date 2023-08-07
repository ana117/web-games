import data from './data.json';

const words = data.words;

export const getWords = () => {
    const randomWords = [];
    while (randomWords.length < 4) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        if (!randomWords.includes(randomWord)) {
            randomWords.push(randomWord);
        }
    }
    return randomWords;
}
