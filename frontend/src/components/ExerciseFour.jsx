import { useContext, useState, useEffect, useRef } from "react";
import AlertContext from "../context/alert/AlertContext";
import { unlockNextExercise } from "../utils/progress";
import { isExerciseUnlocked } from "../utils/progress";

export default function ExerciseFour({ level, category, setExercise, audioData }) {
  if (!isExerciseUnlocked(level, 4)) return <p>🔒 Locked</p>;
  const { showAlert } = useContext(AlertContext);

  const [currentItem, setCurrentItem] = useState(null);
  const [options, setOptions] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // ✅ added state
  const [answerHidden, setAnswerHidden] = useState(true);

  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioData || audioData.length === 0) return;

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
  }, [level, category, audioData]);

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

      // ✅ unlock next exercise
      unlockNextExercise(level, 4);
      let xp = Number(localStorage.getItem("xp"))+100;
      localStorage.setItem("xp", xp);

      setTimeout(() => {
        setExercise("5");
      }, 500);

    } else {
      showAlert("Failure", "Incorrect Answer! ❌");
    }
  };

  // Detect when audio finishes naturally to reset playing state
  const handleAudioEnded = () => setIsPlaying(false);

  if (!currentItem) return <p className="text-center font-bold text-gray-500 mt-10">No questions available for this level/category.</p>;

  return (
    <div className="exercise-container">
      <h1 className="exercise-title">Audio Translation</h1>

      {/* AUDIO PLAYER */}
      <div className="flex flex-col items-center justify-center py-8">
        <audio 
          ref={audioRef} 
          src={currentItem.audio_path ? `http://127.0.0.1:8000/${currentItem.audio_path}` : ""} 
          onEnded={handleAudioEnded}
        />
        
        <button 
          onClick={toggleAudio}
          className="group relative flex flex-col items-center justify-center gap-3 w-32 h-32 rounded-full border-[6px] border-[#7A0000] bg-[#FDF6EC] shadow-[0_8px_30px_rgba(122,0,0,0.15)] transition-all duration-300 hover:scale-105 active:scale-95 z-10"
        >
          <div className="absolute inset-0 rounded-full bg-[#7A0000] opacity-0 group-hover:opacity-5 transition-opacity" />
          <img 
            src={`/icons/${isPlaying ? "yesaudio.png" : "noaudio.png"}`} 
            className="w-10 h-10 object-contain z-10 block"
            alt="Audio Icon"
            style={{ filter: "brightness(0.2) sepia(1) hue-rotate(320deg) saturate(3)" }} 
          />
          <span className="font-black text-[#7A0000] uppercase tracking-widest text-[10px] z-10 block">
            {isPlaying ? "Wait" : "Listen"}
          </span>
        </button>
        <p className="mt-6 text-[11px] sm:text-[13px] font-bold text-[#9A8880] uppercase tracking-wider text-center max-w-[280px]">
          Listen to the Newari word and select the correct translation below
        </p>
      </div>

      {/* OPTIONS */}
      <div className="mt-2 pt-6 border-t-2 border-dashed border-[#E8D5CC] w-full">
        <div className="flex flex-wrap justify-center gap-3">
          {options.map((opt) => (
            <button
              key={opt.id}
              className="exercise-btn hover:-translate-y-1"
              onClick={() => checkAnswer(opt)}
            >
              {opt.english}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Show/Hide Answer Button */}
      <div className="flex w-full mt-10 justify-center">
        <button
          className="exercise-action-btn-secondary"
          onClick={() => setAnswerHidden(!answerHidden)}
        >
          {answerHidden ? "Show Answer 👁️" : "Hide Answer 🙈"}
        </button>
      </div>

      {/* ✅ Answer Display */}
      {!answerHidden && (
        <div className="exercise-answer-box text-center w-full mt-4">
          <strong>Answer:</strong> <span className="font-bold text-[#7A0000] ml-2 text-lg">{currentItem.english}</span>
        </div>
      )}
    </div>
  );
}