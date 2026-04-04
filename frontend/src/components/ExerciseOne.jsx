import { useContext, useState, useEffect } from "react";
import AlertContext from "../context/alert/AlertContext";
import { unlockNextExercise } from "../utils/progress";

export default function ExerciseOne({ level, category, setExercise }) {
  const { showAlert } = useContext(AlertContext);

  const [currentItem, setCurrentItem] = useState(null);
  const [options, setOptions] = useState([]);
  const [answerHidden, setAnswerHidden] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://127.0.0.1:8000/data/api/v0/${category}/${level}/text.json`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        const filteredData = data.filter(
          (item) =>
            Number(item.level) === Number(level) &&
            item.category.toLowerCase() === category.toLowerCase()
        );

        if (filteredData.length === 0) {
          setCurrentItem(null);
          setOptions([]);
          setLoading(false);
          return;
        }

        const randomItem =
          filteredData[Math.floor(Math.random() * filteredData.length)];

        setCurrentItem(randomItem);

        const wrongOptions = filteredData
          .filter((item) => item.id !== randomItem.id)
          .map((item) => item.english);

        const shuffledWrongOptions = wrongOptions.sort(() => Math.random() - 0.5);

        const finalOptions = [...shuffledWrongOptions.slice(0, 4), randomItem.english].sort(
          () => Math.random() - 0.5
        );

        setOptions(finalOptions);
      } catch (err) {
        console.error(err);
        setError("Could not load exercise data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [level, category]);

  const checkAnswer = (ans) => {
    if (!currentItem) return;

    if (ans === currentItem.english) {
      showAlert("Success", "Correct Answer! 🎉");

      unlockNextExercise(level, 1);

      setTimeout(() => {
        setExercise("2");
      }, 500);
    } else {
      showAlert("Failure", "Incorrect Answer! ❌");
    }
  };

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;
  if (!currentItem) return <p>No questions available for this level/category.</p>;

  return (
    <div className="exercise-container">
      <h1 className="exercise-title">Vocabulary Match</h1>
      
      <div className="exercise-question-box">
        <p className="exercise-question-text">
          What does <span className="exercise-highlight">{currentItem.newari}</span> mean?
        </p>
      </div>

      <div className="exercise-options-grid">
        {options.map((opt, index) => (
          <button 
            key={index} 
            className="exercise-btn" 
            onClick={() => checkAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="flex w-full mt-4 justify-center">
        <button 
          className="exercise-action-btn-secondary" 
          onClick={() => setAnswerHidden(!answerHidden)}
        >
          {answerHidden ? "Show Answer 👁️" : "Hide Answer 🙈"}
        </button>
      </div>

      {!answerHidden && (
        <div className="exercise-answer-box">
          Right Answer: {currentItem.english}
        </div>
      )}
    </div>
  );
}