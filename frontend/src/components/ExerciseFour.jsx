import { useContext, useState, useEffect, useRef } from "react";
import AlertContext from "../context/alert/AlertContext";

export default function ExerciseFour({ level, category, setExercise }) {
  const { showAlert } = useContext(AlertContext);

  const audioData = [
    { id: 1, voicePath: "/audio/audio.mp3", english: "rice", category: "food", level: 1 },
    { id: 2, voicePath: "/audio/audio.mp3", english: "lentil", category: "food", level: 1 },
    { id: 3, voicePath: "/audio/audio.mp3", english: "spinach", category: "food", level: 1 },
    { id: 4, voicePath: "/audio/audio.mp3", english: "corn", category: "food", level: 1 },
    { id: 5, voicePath: "/audio/audio.mp3", english: "meat", category: "food", level: 1 },
    { id: 6, voicePath: "/audio/audio.mp3", english: "egg", category: "food", level: 1 },
    { id: 7, voicePath: "/audio/audio.mp3", english: "beaten rice", category: "food", level: 1 },
    { id: 8, voicePath: "/audio/audio.mp3", english: "tea", category: "food", level: 1 },
    { id: 9, voicePath: "/audio/audio.mp3", english: "alcohol", category: "food", level: 1 },
    { id: 10, voicePath: "/audio/audio.mp3", english: "sweet", category: "food", level: 1 },
  ];

  const [currentItem, setCurrentItem] = useState(null);
  const [options, setOptions] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    const filteredData = audioData.filter(
      (item) => item.level === Number(level) && item.category === category
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
      showAlert("Success", "Correct Answer!");
      setExercise("5");
    } else {
      showAlert("Failure", "Incorrect Answer!");
    }
  };

  if (!currentItem) return <p>No questions available for this level/category.</p>;

  return (
    <>
      <h1>Exercise 4</h1>

      {/* AUDIO PLAYER */}
      <div className="mb-4">
        <audio ref={audioRef} src={currentItem.voicePath} />
        <div className="flex items-center gap-2">
          <button className="border px-3 py-1" onClick={toggleAudio}>
            {isPlaying ? "Stop Audio" : "Play Audio"}
          </button>
          <img src={`/icons/${isPlaying?"yesaudio.png":"noaudio.png"}`} style={{height: "18px", width: "18px"}}/>
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
            {opt.english}
          </button>
        ))}
      </div>
    </>
  );
}