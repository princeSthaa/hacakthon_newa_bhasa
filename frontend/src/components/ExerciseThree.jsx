import { useState, useEffect, useContext } from "react";
import AlertContext from "../context/alert/AlertContext";
import { unlockNextExercise } from "../utils/progress";
import { isExerciseUnlocked } from "../utils/progress";

export default function ExerciseThree({ level, category, setExercise, pictureData }) {
  if (!isExerciseUnlocked(level, 3)) return <p>🔒 Locked</p>;
  const { showAlert } = useContext(AlertContext);

  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matched, setMatched] = useState([]);

  // ✅ added state
  const [answerHidden, setAnswerHidden] = useState(true);

  useEffect(() => {

    if (!pictureData || pictureData.length === 0) return;
    // 1. filter
    const filtered = pictureData.filter(
      (item) =>
        Number(item.level) === Number(level) &&
        item.category.toLowerCase() === category.toLowerCase()
    );

    if (filtered.length < 5) return;

    // 2. pick 5 random
    const selected = filtered.sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuestions(selected);

    // 3. create options (newari words shuffled)
    const shuffledOptions = [...selected]
      .sort(() => 0.5 - Math.random())
      .map((item) => item.newari);

    setOptions(shuffledOptions);
  }, [level, category, pictureData]);

  const checkAnswer = (selectedNewari) => {
    const currentItem = questions[currentIndex];

    if (selectedNewari === currentItem.newari) {
      showAlert("Success", "Correct Answer!");

      const updatedMatched = [...matched, currentItem.id];
      setMatched(updatedMatched);

      setOptions((prev) => prev.filter((opt) => opt !== selectedNewari));

      // ✅ move to next OR finish
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // ✅ Exercise 3 completed
        showAlert("Success", "Exercise Completed! 🎉");

        unlockNextExercise(level, 3);
        let xp = Number(localStorage.getItem("xp"))+100;
        localStorage.setItem("xp", xp);
        
        setTimeout(() => {
          setExercise("4");
        }, 500);
      }

    } else {
      showAlert("Failure", "Incorrect Answer!");
    }
  };

  // fallback
  if (!questions || questions.length < 5) {
    return <p className="text-center font-bold text-gray-500 mt-10">Not enough data for this exercise.</p>;
  }

  return (
    <div className="exercise-container">
      <h1 className="exercise-title">Picture Identification</h1>

      {/* IMAGE CARDS */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {questions.map((obj, index) => (
          <div
            key={obj.id}
            className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-[20px] border-4 transition-all duration-500 ${
              matched.includes(obj.id) 
                ? "border-[#D1C5BB] bg-[#F0EAE7] opacity-60 scale-95" 
                : index === currentIndex 
                  ? "border-[#7A0000] bg-[#FDF6EC] shadow-xl transform scale-105 z-10" 
                  : "border-[#E8D5CC] bg-white opacity-80 scale-95 grayscale-[30%]"
            }`}
          >
            <img
              src={obj.image_path && obj.image_path !== "" ? "http://127.0.0.1:8000/" + obj.image_path : "/defaultimage.png"}
              className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl shadow-sm bg-white"
              alt={obj.english}
            />
            <p className={`mt-4 font-black uppercase tracking-[1.5px] text-[11px] sm:text-xs ${
              index === currentIndex ? "text-[#7A0000]" : "text-[#1A0A0A]"
            }`}>
              {obj.english}
            </p>
            
            {/* show newari after correct */}
            <div className="mt-2 h-6 flex items-center justify-center">
              {matched.includes(obj.id) ? (
                <span className="text-sm font-black text-[#5C4A43] bg-white px-3 py-1 rounded-full shadow-sm border border-[#E8D5CC]">
                  ✓ {obj.newari}
                </span>
              ) : (
                <span className="text-sm font-bold text-transparent select-none bg-transparent">
                  _
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* OPTIONS */}
      <div className="mt-10 pt-6 border-t-2 border-dashed border-[#E8D5CC] w-full">
        <p className="text-center text-xs font-bold uppercase tracking-wider text-[#9A8880] mb-4">
          Select the correct translation
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {options.map((opt, index) => (
            <button
              key={index}
              className="exercise-btn hover:-translate-y-1"
              onClick={() => checkAnswer(opt)}
            >
              {opt}
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
        <div className="exercise-answer-box text-left w-full mt-4">
          <p className="text-center"><strong>Answers:</strong></p>
          <ul className="list-disc ml-5 mt-2 text-sm">
            {questions.map((q) => (
              <li key={q.id}>
                <span className="font-bold">{q.english}</span> → {q.newari}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}