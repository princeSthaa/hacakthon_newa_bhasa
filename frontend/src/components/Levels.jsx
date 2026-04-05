import { useNavigate } from "react-router-dom";
import { isLevelUnlocked } from "../utils/progress";

/* ── connector constants ── */
const LX = 70;
const RX = 290;
const CONN_H = 90;

/* ── curved connector ── */
function Connector({ fromSide, toSide, done }) {
  const x1 = fromSide === "left" ? LX : RX;
  const x2 = toSide === "left" ? LX : RX;

  const d = `M ${x1} 0 C ${x1} ${CONN_H * 0.55} ${x2} ${
    CONN_H * 0.45
  } ${x2} ${CONN_H}`;

  return (
    <svg width="360" height={CONN_H} className="mx-auto">
      <path
        d={d}
        stroke={done ? "#7A0000" : "#C8B6AA"}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={done ? "none" : "10 8"}
      />
    </svg>
  );
}

export default function Levels() {
  const navigate = useNavigate();

  const levels = Array.from({ length: 20 }, (_, i) => i + 1);

  const getCategory = (level) => {
    if ([1, 6, 11, 16].includes(level))
      return { label: "🍛 Food", value: "food" };
    if ([2, 7, 12, 17].includes(level))
      return { label: "🦁 Animals", value: "animals" };
    if ([3, 8, 13, 18].includes(level))
      return { label: "🎉 Jatra", value: "jatra" };
    if ([4, 9, 14, 19].includes(level))
      return { label: "📚 General", value: "general" };
    if ([5, 10, 15, 20].includes(level))
      return { label: "🏠 Household", value: "household" };
  };

  const lastUnlocked = levels
    .filter((level) => level <= 5 && isLevelUnlocked(level))
    .pop();

  return (
    <div
      className="flex flex-col items-center mt-20 pt-10"
      style={{
        maxWidth: 360,
        margin: "0 auto",
        height: "500px",
        overflowY: "auto",
        scrollbarWidth: "none",
      }}
    >
      {levels.map((level, index) => {
        const { label, value } = getCategory(level);
        const unlocked = level <= 5 && isLevelUnlocked(level);
        const isLeft = index % 2 === 0;
        const next = levels[index + 1];
        const nextIsLeft = (index + 1) % 2 === 0;
        const bounce = level === lastUnlocked;

        return (
          <div key={level} className="flex flex-col w-full items-center">
            {/* LEVEL NODE */}
            <div className="flex w-full">
              <div
                className={`w-full flex flex-col items-center ${
                  isLeft ? "items-start pl-6" : "items-end pr-6"
                }`}
              >
                {/* CATEGORY LABEL */}
                <span
                  className={`${
                    level > 5
                      ? ""
                      : "mb-3 bg-[#cc4e134f] text-[#7A0000] px-3 py-1 rounded-4xl font-bold"
                  }`}
                >
                  {level > 5 ? "" : label}
                </span>

                {/* LEVEL BUTTON */}
                <button
                  disabled={!unlocked && level <= 5}
                  onClick={() => {
                    if (level > 5) {
                      navigate("/premium");
                      return;
                    }
                    if (!unlocked) return;

                    navigate(`/level/${level}/${value}`);
                  }}
                  className={`
                    w-16 h-16 rounded-full font-bold shadow-md
                    flex items-center justify-center
                    transition-all
                    ${bounce ? "bounce-2" : ""}
                    ${
                      level > 5
                        ? "bg-purple-500 text-white"
                        : unlocked
                        ? "bg-[#7A0000] text-white"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }
                  `}
                >
                  {level > 5 ? "💎" : unlocked ? "✓" : "🔒"}
                </button>

                {/* LEVEL LABEL */}
                <span className="mt-2 text-sm font-medium text-[#7A0000]">
                  Level {level}
                </span>
              </div>
            </div>

            {/* CONNECTOR */}
            {next && (
              <Connector
                fromSide={isLeft ? "left" : "right"}
                toSide={nextIsLeft ? "left" : "right"}
                done={unlocked}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}