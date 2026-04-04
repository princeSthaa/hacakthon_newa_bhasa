import { useNavigate } from "react-router";
export default function Levels() {
  let navigate = useNavigate();

  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const getCategory = (level) => {
    if (level >= 1 && level <= 5) return "food";
    if (level >= 6 && level <= 10) return "numbers";
    if (level >= 11 && level <= 15) return "relations";
    if (level >= 16 && level <= 20) return "others";
  };

  return (
    <>
      <div className="flex flex-col items-center gap-20 mt-20 pt-10" style={{ height: "450px", overflowY: "auto", scrollbarWidth: "none" }}>
        {levels.map((level, index) => {
          const category = getCategory(level);
          const isLeft = index % 2 === 0;

          return (
            <div key={level} className="flex justify-center relative">
              <div className={`w-full flex ${isLeft ? "justify-start pl-10" : "justify-end pr-10"}`}>
                <button className="level relative" onClick={() => { navigate(`/level/${level}/${category}`); }}>
                  Level {level}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}