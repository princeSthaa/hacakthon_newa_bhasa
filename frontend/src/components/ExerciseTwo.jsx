import { useState, useEffect, useContext } from "react";
import AlertContext from "../context/alert/AlertContext";
import { unlockNextExercise } from "../utils/progress";
import { isExerciseUnlocked } from "../utils/progress";

export default function ExerciseTwo({ level, category, setExercise, textData }) {
  if (!isExerciseUnlocked(level, 2)) return <p>🔒 Locked</p>;
  const [questions, setQuestions] = useState([]);
  const [newariList, setNewariList] = useState([]);
  const [englishList, setEnglishList] = useState([]);
  const [selectedNewari, setSelectedNewari] = useState(null);
  const [matches, setMatches] = useState([]);

  // ✅ added state
  const [answerHidden, setAnswerHidden] = useState(true);

  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    if (!textData || textData.length === 0) return;

    const filtered = textData.filter(
      (item) =>
        Number(item.level) === Number(level) &&
        item.category.toLowerCase() === category.toLowerCase()
    );

    if (filtered.length < 5) return;

    const selected = [...filtered]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);

    setQuestions(selected);
    setNewariList([...selected].sort(() => 0.5 - Math.random()));
    setEnglishList([...selected].sort(() => 0.5 - Math.random()));
  }, [level, category, textData]);

  const handleMatch = (eng) => {
    if (!selectedNewari) return;

    if (selectedNewari.english === eng.english) {
      showAlert("Success", "Correct Match!");

      const newMatch = {
        newariId: selectedNewari.id,
        englishId: eng.id,
        pairNumber: matches.length + 1,
      };

      const updatedMatches = [...matches, newMatch];
      setMatches(updatedMatches);

      // ✅ IMPORTANT: completion logic stays HERE
      if (updatedMatches.length === questions.length) {
        showAlert("Success", "Exercise Completed! 🎉");

        unlockNextExercise(level, 2);
        let xp = Number(localStorage.getItem("xp"))+100;
        localStorage.setItem("xp", xp);

        setTimeout(() => {
          setExercise("3");
        }, 500);
      }

    } else {
      showAlert("Failure", "Incorrect Match!");
    }

    setSelectedNewari(null);
  };

  const getPairNumber = (id) => {
    const match = matches.find(
      (m) => m.newariId === id || m.englishId === id
    );
    return match ? match.pairNumber : null;
  };

  const isMatched = (id) => {
    return matches.some(
      (m) => m.newariId === id || m.englishId === id
    );
  };

  if (!questions || questions.length === 0) {
    return <p>No questions available for this level/category.</p>;
  }

  return (
    <div className="exercise-container">
      <h1 className="exercise-title">Vocabulary Match</h1>

      <div className="flex w-full justify-between gap-4 mt-4">
        {/* LEFT */}
        <div className="flex flex-col gap-3 w-1/2">
          {newariList.map((item) => (
            <button
              key={item.id}
              disabled={isMatched(item.id)}
              className={`exercise-btn relative ${isMatched(item.id) ? "opacity-50 !bg-[#E8D5CC] !border-[#D1C5BB]" : ""} ${selectedNewari?.id === item.id ? "!border-[#7A0000] !bg-[#FDF6EC]" : ""}`}
              onClick={() => setSelectedNewari(item)}
            >
              {item.newari}
              {getPairNumber(item.id) && (
                <span className="absolute top-1 right-2 text-xs font-black text-[#7A0000] bg-white rounded-full w-5 h-5 flex items-center justify-center border border-[#7A0000]">
                  {getPairNumber(item.id)}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-3 w-1/2">
          {englishList.map((item) => (
            <button
              key={item.id}
              disabled={isMatched(item.id)}
              className={`exercise-btn relative ${isMatched(item.id) ? "opacity-50 !bg-[#E8D5CC] !border-[#D1C5BB]" : ""}`}
              onClick={() => handleMatch(item)}
            >
              {item.english}
              {getPairNumber(item.id) && (
                <span className="absolute top-1 right-2 text-xs font-black text-[#7A0000] bg-white rounded-full w-5 h-5 flex items-center justify-center border border-[#7A0000]">
                  {getPairNumber(item.id)}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex w-full mt-6 justify-center">
        <button
          className="exercise-action-btn-secondary"
          onClick={() => setAnswerHidden(!answerHidden)}
        >
          {answerHidden ? "Show Answer 👁️" : "Hide Answer 🙈"}
        </button>
      </div>

      {!answerHidden && (
        <div className="exercise-answer-box text-left w-full">
          <strong>Answers:</strong>
          <ul className="list-disc ml-5 mt-2 text-sm">
            {questions.map((q) => (
              <li key={q.id}>
                <span className="font-bold">{q.newari}</span> → {q.english}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}