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
  }, [level, category]);

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
    return <p>Not enough data for this exercise.</p>;
  }

  return (
    <>
      <h1>Exercise 3</h1>

      {/* IMAGE CARDS */}
      <div className="flex gap-4">
        {questions.map((obj, index) => (
          <div
            key={obj.id}
            className={`border p-2 ${index === currentIndex ? "border-blue-500 border-4" : ""
              } ${matched.includes(obj.id) ? "bg-green-200" : ""}`}
          >
            <img
              src={`${obj.image_path !== "" ? "http://127.0.0.1:8000/" + obj.image_path : "/defaultimage.png"}`}
              style={{ height: "140px", width: "140px", objectFit: "cover" }}
            />
            <p>{obj.english}</p>

            {/* show newari after correct */}
            {matched.includes(obj.id) && <p>Answer <strong>{obj.newari}</strong></p>}
          </div>
        ))}
      </div>

      <br />

      {/* OPTIONS */}
      <div className="flex gap-2 flex-wrap">
        {options.map((opt, index) => (
          <button
            key={index}
            className="border px-3 py-1"
            onClick={() => checkAnswer(opt)}
          >
            {opt}
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
          <strong>Answers:</strong>
          <ul className="list-disc ml-5">
            {questions.map((q) => (
              <li key={q.id}>
                {q.english} → {q.newari}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}