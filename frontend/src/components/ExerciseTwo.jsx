import { useState, useEffect, useContext } from "react";
import AlertContext from "../context/alert/AlertContext";

export default function ExerciseTwo({ level, category, setExercise }) {

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

  const [questions, setQuestions] = useState([]);
  const [newariList, setNewariList] = useState([]);
  const [englishList, setEnglishList] = useState([]);
  const [selectedNewari, setSelectedNewari] = useState(null);
  const [matches, setMatches] = useState([]); // matches: [{ newariId, englishId, pairNumber }]

  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    const filtered = textData.filter(
      (item) => item.level === Number(level) && item.category === category
    );

    if (filtered.length < 5) return;

    const selected = filtered.sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuestions(selected);

    setNewariList([...selected].sort(() => 0.5 - Math.random()));
    setEnglishList([...selected].sort(() => 0.5 - Math.random()));
  }, [level, category]);

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

      if (updatedMatches.length === questions.length) {
        setExercise("3");
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
    </>
  );
}