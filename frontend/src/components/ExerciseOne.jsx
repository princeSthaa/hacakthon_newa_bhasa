import { useContext, useState, useEffect } from "react";
import AlertContext from "../context/alert/AlertContext";

export default function ExerciseOne({ level, category, setExercise }) {
  
  const textData = [
    { id: 1, newari: "ja", english: "rice", category: "food", level: 1 },
    { id: 2, newari: "ke", english: "lentil", category: "food", level: 1 },
    { id: 3, newari: "pachai", english: "spinach", category: "food", level: 1 },
    { id: 4, newari: "kani", english: "corn", category: "food", level: 1 },
    { id: 5, newari: "laa", english: "meat", category: "food", level: 1 },
    { id: 6, newari: "khee", english: "egg", category: "food", level: 1 },
    { id: 7, newari: "baji", english: "beaten rice", category: "food", level: 1 },
    { id: 8, newari: "chya", english: "tea", category: "food", level: 1 },
    { id: 9, newari: "thwon", english: "alcohol", category: "food", level: 1 },
    { id: 10, newari: "lakhamari", english: "sweet", category: "food", level: 1 },
  ];

  const { showAlert } = useContext(AlertContext);
  const [currentItem, setCurrentItem] = useState(null);
  const [options, setOptions] = useState([]);
  const [answerHidden, setAnswerHidden] = useState(true);

  useEffect(() => {
    // Step 1: Filter textData based on level and category props
    const filteredData = textData.filter(
      (item) => item.level === Number(level) && item.category === category
    );

    if (filteredData.length === 0) {
      return; // No data available for this level/category
    }

    // Step 2: Pick a random item from filtered data
    const item = filteredData[Math.floor(Math.random() * filteredData.length)];
    setCurrentItem(item);

    // Step 3: Pick 4 other random English words from filtered data
    const otherOptions = filteredData
      .filter((i) => i.id !== item.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4)
      .map((i) => i.english);

    // Step 4: Combine correct answer and shuffle
    const allOptions = [...otherOptions, item.english].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
  }, [level, category]);

  const checkAnswer = (ans) => {
    if (ans === currentItem.english) {
      showAlert("Success", "Correct Answer!");
      setExercise("2");
    } else {
      showAlert("Failure", "Incorrect Answer!");
    }
  };

  if (!currentItem) return <p>No questions available for this level/category.</p>;

  return (
    <>
      <h1>Exercise 1</h1>
      <p>What does <strong>{currentItem.newari}</strong> mean?</p>
      <div className="flex gap-2">
        {options.map((opt, index) => (
          <button key={index} className="border px-2 py-1" onClick={() => checkAnswer(opt)}>
            {opt}
          </button>
        ))}
      </div><br/>

      <button className="border px-2 py-1" onClick={() => setAnswerHidden(!answerHidden)}>
        {answerHidden ? "Show Answer" : "Hide Answer"}
      </button>
      {!answerHidden && <p><strong>Answer:</strong> {currentItem.english}</p>}
    </>
  );
}