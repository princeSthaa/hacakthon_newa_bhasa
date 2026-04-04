import { useContext, useState, useEffect, useRef } from "react";
import AlertContext from "../context/alert/AlertContext";
import { useNavigate } from "react-router-dom";
import { unlockNextExercise } from "../utils/progress";
import { isExerciseUnlocked } from "../utils/progress";


export default function ExerciseFive({ level, category, audioData }) {
  if (!isExerciseUnlocked(level, 5)) {
    return (
      <p className="text-red-500 text-xl text-center mt-10">
        🔒 Complete previous exercises first.
      </p>
    );
  }
  let navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);

  const [currentItem, setCurrentItem] = useState(null);
  const [options, setOptions] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayLevelComplete, setDisplayLevelComplete] = useState(false);

  // ✅ added state
  const [answerHidden, setAnswerHidden] = useState(true);

  const audioRef = useRef(null);

  useEffect(() => {
    const filteredData = audioData.filter(
      (item) =>
        Number(item.level) === Number(level) &&
        item.category.toLowerCase() === category.toLowerCase()
    );

    if (filteredData.length === 0) return;

    // pick 1 correct
    const item = filteredData[Math.floor(Math.random() * filteredData.length)];
    setCurrentItem(item);

    // pick 4 wrong options
    const otherOptions = filteredData
      .filter((i) => i.id !== item.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    // combine & shuffle
    const allOptions = [...otherOptions, item].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
  }, [level, category]);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const checkAnswer = (selectedItem) => {
    if (selectedItem.id === currentItem.id) {
      showAlert("Success", "Correct Answer! 🎉");

      // ✅ THIS LINE IS THE MOST IMPORTANT
      unlockNextExercise(level, 5);  // ← unlocks NEXT LEVEL

      setDisplayLevelComplete(true);

    } else {
      showAlert("Failure", "Incorrect Answer!");
    }
  };

  if (!currentItem) return <p>No questions available for this level/category.</p>;

  return (
    <>
      <h1>Exercise 5</h1>

      {/* AUDIO PLAYER */}
      <div className="mb-4">
        <audio ref={audioRef} src={`http://127.0.0.1:8000/${currentItem.audio_path}`} />
        <div className="flex items-center gap-2">
          <button className="border px-3 py-1" onClick={toggleAudio}>
            {isPlaying ? "Stop Audio" : "Play Audio"}
          </button>
          <img
            src={`/icons/${isPlaying ? "yesaudio.png" : "noaudio.png"}`}
            style={{ height: "18px", width: "18px" }}
          />
        </div>
      </div>

      {/* OPTIONS */}
      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => (
          <button
            key={opt.id}
            className="border px-3 py-1"
            onClick={() => checkAnswer(opt)}
          >
            {opt.newari}
          </button>
        ))}
      </div>

      {/* ✅ Show/Hide Answer Button */}
      <br />
      <button
        className="border px-2 py-1"
        onClick={() => setAnswerHidden(!answerHidden)}
      >
        {answerHidden ? "Show Answer" : "Hide Answer"}
      </button>

      {/* ✅ Answer Display */}
      {!answerHidden && (
        <div className="mt-4">
          <strong>Answer:</strong> {currentItem.newari}
        </div>
      )}

      {
        displayLevelComplete &&
        <div className="confirm-modal-background">
          <div className="confirm-modal">
            <h1>Yay congratulation you completed level {level}</h1>
            <button className="border" onClick={() => { navigate("/dashboard") }}>Go to next Level</button>
          </div>
        </div>
      }
    </>
  );
}