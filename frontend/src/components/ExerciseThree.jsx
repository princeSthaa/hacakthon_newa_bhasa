import { useState, useEffect, useContext } from "react";
import AlertContext from "../context/alert/AlertContext";

export default function ExerciseThree({ level, category, setExercise }) {
  const { showAlert } = useContext(AlertContext);

  const pictureData = [
    { id: 1, imagepath: "/images/water.jpg", newari: "la", english: "water", category: "food", level: 1 },
    { id: 2, imagepath: "/images/lentil.jpg", newari: "ke", english: "lentil", category: "food", level: 1 },
    { id: 3, imagepath: "/images/spinach.jpg", newari: "pachai", english: "spinach", category: "food", level: 1 },
    { id: 4, imagepath: "/images/corn.jpg", newari: "kani", english: "corn", category: "food", level: 1 },
    { id: 5, imagepath: "/images/meat.jpg", newari: "laa", english: "meat", category: "food", level: 1 },
    { id: 6, imagepath: "/images/alcohol.jpg", newari: "thwon", english: "alcohol", category: "food", level: 1 }
  ];

  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    // 1. filter
    const filtered = pictureData.filter(
      (item) => item.level === Number(level) && item.category === category
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

      // move to next
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setExercise("4");
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
            className={`border p-2 ${
              index === currentIndex ? "border-blue-500 border-4" : ""
            } ${matched.includes(obj.id) ? "bg-green-200" : ""}`}
          >
            <img
              src={obj.imagepath}
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
    </>
  );
}