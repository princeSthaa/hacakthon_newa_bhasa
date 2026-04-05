import { useEffect, useState } from "react";

const PROGRESS_KEY = "newari_progress_v1";

const getCategory = (level) => {
  if (level === 1 || level === 6 || level === 11 || level === 16) return "food";
  if (level === 2 || level === 7 || level === 12 || level === 17) return "animals";
  if (level === 3 || level === 8 || level === 13 || level === 18) return "jatra";
  if (level === 4 || level === 9 || level === 14 || level === 19) return "general";
  if (level === 5 || level === 10 || level === 15 || level === 20) return "household";
};

export default function Progress() {
  const [progress, setProgress] = useState({
    unlockedLevel: 1,
    exercises: {}
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(PROGRESS_KEY));
    if (data) setProgress(data);
  }, []);

  const { unlockedLevel, exercises } = progress;

  const totalLevels = 20;
  const completedLevels = unlockedLevel - 1;

  // categories based on your system
  const categories = [
    { key: "food", label: "Food 🍛" },
    { key: "animals", label: "Animals 🐘" },
    { key: "jatra", label: "Jatra 🎉" },
    { key: "general", label: "General 🧠" },
    { key: "household", label: "Household 🏠" },
  ];

  const ProgressBar = ({ pct }) => (
    <div className="w-full h-2.5 rounded-full bg-[#F0E0D0] overflow-hidden">
      <div
        className="h-full bg-[#7A0000] transition-all duration-700"
        style={{ width: `${pct}%` }}
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-6">

      {/* ─── HEADER ─── */}
      <div>
        <h2 className="text-2xl font-extrabold text-[#1A0A0A]">
          Your Progress
        </h2>
        <p className="text-gray-500 text-sm">
          {completedLevels} of {totalLevels} levels completed
        </p>
      </div>

      {/* ─── OVERALL PROGRESS ─── */}
      <div className="bg-white rounded-2xl p-6 border border-[#F0E0D0] shadow-sm flex flex-col gap-3">
        <div className="flex justify-between text-sm font-semibold">
          <span>Overall</span>
          <span className="text-[#7A0000]">
            {Math.round((completedLevels / totalLevels) * 100)}%
          </span>
        </div>

        <ProgressBar pct={(completedLevels / totalLevels) * 100} />

        <p className="text-xs text-gray-400">
          {completedLevels} / {totalLevels} levels
        </p>
      </div>

      {/* ─── CATEGORY PROGRESS ─── */}
      <div className="grid sm:grid-cols-2 gap-4">
        {categories.map(({ key, label }) => {
          const levelsInCategory = Array.from({ length: 20 }, (_, i) => i + 1)
            .filter(lvl => getCategory(lvl) === key);

          const done = levelsInCategory.filter(lvl => lvl < unlockedLevel).length;
          const pct = Math.round((done / levelsInCategory.length) * 100);

          return (
            <div
              key={key}
              className="bg-white rounded-2xl p-5 border border-[#F0E0D0] shadow-sm flex flex-col gap-3"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-[#1A0A0A]">
                  {label}
                </span>
                <span className="text-xs font-semibold text-[#7A0000]">
                  {pct}%
                </span>
              </div>

              <ProgressBar pct={pct} />

              <p className="text-xs text-gray-400">
                {done} / {levelsInCategory.length} levels
              </p>
            </div>
          );
        })}
      </div>

      {/* ─── LEVEL GRID ─── */}
      <div className="bg-white rounded-2xl p-6 border border-[#F0E0D0] shadow-sm">

        <h3 className="font-bold text-[#1A0A0A] mb-4 text-sm">
          All Levels
        </h3>

        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 20 }, (_, i) => i + 1).map((lvl) => {
            const done = lvl < unlockedLevel;
            const active = lvl === unlockedLevel;

            return (
              <div
                key={lvl}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold border-2
                  ${done
                    ? "bg-[#7A0000] border-[#7A0000] text-white"
                    : active
                      ? "bg-[#FDF6EC] border-[#7A0000] text-[#7A0000] shadow-md"
                      : "bg-[#F7F0E8] border-[#E8D5CC] text-gray-400"
                  }`}
              >
                {done ? "✓" : lvl}
              </div>
            );
          })}
        </div>

        {/* legend */}
        <div className="flex gap-6 mt-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#7A0000] rounded"></span>
            Completed
          </span>

          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 border-2 border-[#7A0000] bg-[#FDF6EC] rounded"></span>
            Current
          </span>

          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#E8D5CC] rounded"></span>
            Locked
          </span>
        </div>

      </div>

    </div>
  );
}