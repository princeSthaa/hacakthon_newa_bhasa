import { useNavigate } from "react-router-dom";
import { isLevelUnlocked } from "../utils/progress";

export default function Levels() {
  const navigate = useNavigate();

  const levels = [
    1, 2, 3, 4, 5,
    6, 7, 8, 9, 10,
    11, 12, 13, 14, 15,
    16, 17, 18, 19, 20,
  ];

  const getCategory = (level) => {
    if (level === 1 || level === 6 || level === 11 || level === 16) return "food";
    if (level === 2 || level === 7 || level === 12 || level === 17) return "animals";
    if (level === 3 || level === 8 || level === 13 || level === 18) return "jatra";
    if (level === 4 || level === 9 || level === 14 || level === 19) return "general";
    if (level === 5 || level === 10 || level === 15 || level === 20) return "household";
  };

  return (
    <div
      className="flex flex-col items-center gap-20 mt-20 pt-10"
      style={{
        height: "450px",
        overflowY: "auto",
        scrollbarWidth: "none",
      }}
    >
      {levels.map((level, index) => {
        const category = getCategory(level);
        const unlocked = level <= 5 && isLevelUnlocked(level);
        const isLeft = index % 2 === 0;
        return (
          <div key={level} className="flex justify-center relative w-full">
            <div
              className={`w-full flex ${isLeft ? "justify-start pl-10" : "justify-end pr-10"
                }`}
            >
              <button
                disabled={!unlocked && level <= 5}
                className={`level relative px-4 py-2 rounded ${level > 5
                  ? "bg-purple-500 text-white"
                  : unlocked
                    ? "bg-blue-500 text-white"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                onClick={() => {
                  if (level > 5) {
                    navigate("/premium");
                    return;
                  }

                  if (!unlocked) return;

                  navigate(`/level/${level}/${category}`);
                }}
              >
                Level {level} {level > 5 ? "💎" : unlocked ? "✅" : "🔒"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}