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
    <>
      <h1>Match the Following</h1>

      <div className="flex gap-20">
        {/* LEFT */}
        <div className="flex flex-col gap-4">
          {newariList.map((item) => (
            <button
              key={item.id}
              disabled={isMatched(item.id)}
              className={`border px-2 py-1 relative ${isMatched(item.id) ? "bg-green-300" : ""
                } ${selectedNewari?.id === item.id ? "bg-blue-200 border-2" : ""
                }`}
              onClick={() => setSelectedNewari(item)}
            >
              {item.newari}
              {getPairNumber(item.id) && (
                <sup className="ml-1 text-xs">
                  {getPairNumber(item.id)}
                </sup>
              )}
            </button>
          ))}
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-4">
          {englishList.map((item) => (
            <button
              key={item.id}
              disabled={isMatched(item.id)}
              className={`border px-2 py-1 relative ${isMatched(item.id) ? "bg-green-300" : ""
                }`}
              onClick={() => handleMatch(item)}
            >
              {item.english}
              {getPairNumber(item.id) && (
                <sup className="ml-1 text-xs">
                  {getPairNumber(item.id)}
                </sup>
              )}
            </button>
          ))}
        </div>
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
          <strong>Answers:</strong>
          <ul className="list-disc ml-5">
            {questions.map((q) => (
              <li key={q.id}>
                {q.newari} → {q.english}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}