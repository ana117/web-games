import {useEffect} from "react";
import GameHubPage from "./Hub";

function App() {
  useEffect(() => {
    document.title = "Game Hub"
  }, []);

  return (
    <div className="m-0 bg-background dark:bg-background-dark text-text dark:text-text-dark
                    transition-colors duration-500">
      <GameHubPage />
    </div>
  );
}

export default App;
