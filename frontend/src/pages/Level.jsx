import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ExerciseOne from "../components/ExerciseOne";
import ExerciseTwo from "../components/ExerciseTwo";
import ExerciseThree from "../components/ExerciseThree";
import ExerciseFour from "../components/ExerciseFour";
import ExerciseFive from "../components/ExerciseFive";

const EXERCISES = [1, 2, 3, 4, 5];

const EXERCISE_LABELS = {
    1: "MCQ",
    2: "Matching",
    3: "Image Match",
    4: "Audio Learn",
    5: "Audio Learn",
};

/* ── single exercise tab button ───────────────────────────────────────── */
function ExerciseTab({ num, active, unlocked, onClick }) {
    const isActive = active === num;
    const isLocked = !unlocked;

    return (
        <button
            onClick={onClick}
            disabled={isLocked}
            title={isLocked ? "Complete the previous exercise first" : EXERCISE_LABELS[num]}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                padding: "10px 14px",
                borderRadius: 14,
                border: isActive
                    ? "2.5px solid #7A0000"
                    : "2.5px solid transparent",
                background: isActive
                    ? "#7A000015"
                    : isLocked
                        ? "#F0EAE7"
                        : "#fff",
                color: isActive
                    ? "#7A0000"
                    : isLocked
                        ? "#C0AFA8"
                        : "#1A0A0A",
                fontWeight: 700,
                fontSize: 12,
                cursor: isLocked ? "not-allowed" : "pointer",
                boxShadow: isActive
                    ? "0 0 0 4px #7A000018, 0 2px 10px #7A000025"
                    : isLocked
                        ? "none"
                        : "0 1px 6px #00000012",
                transition: "all 0.18s ease",
                minWidth: 70,
                opacity: isLocked ? 0.55 : 1,
                position: "relative",
            }}
        >
            {/* lock badge */}
            {isLocked && (
                <span style={{
                    position: "absolute", top: -6, right: -6,
                    background: "#C0AFA8", color: "#fff",
                    borderRadius: "50%", width: 18, height: 18,
                    fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    🔒
                </span>
            )}

            {/* active indicator dot */}
            {isActive && (
                <span style={{
                    position: "absolute", top: -5, left: "50%", transform: "translateX(-50%)",
                    width: 8, height: 8, borderRadius: "50%", background: "#7A0000",
                }} />
            )}

            <span style={{ fontSize: 18 }}>
                {isActive ? "📝" : isLocked ? "🔒" : "✅"}
            </span>
            <span>Ex {num}</span>
            <span style={{ fontSize: 9, fontWeight: 600, opacity: 0.7, textAlign: "center", lineHeight: 1.2 }}>
                {EXERCISE_LABELS[num]}
            </span>
        </button>
    );
}

/* ── page ─────────────────────────────────────────────────────────────── */
export default function Level() {
    let navigate = useNavigate();
    const { id, category } = useParams();

    // Data fetching state
    const [data, setData] = useState([]);

    // highest exercise the user has unlocked (1-indexed); starts at 1
    const [highestUnlocked, setHighestUnlocked] = useState(1);
    const [activeExercise, setActiveExercise] = useState(1);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/data/api/v0/${category}/${id}/text.json`
        );

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    useEffect(() => {
        if (!localStorage.getItem("userLoggedIn")) {
            navigate("/login");
        } else {
            fetchData();
        }
        // eslint-disable-next-line
    }, [id, category]);

    // called by each ExerciseN when the user answers correctly
    const handleExerciseComplete = (completedNum) => {
        const next = completedNum + 1;
        if (next <= 5) {
            setHighestUnlocked((prev) => Math.max(prev, next));
            setActiveExercise(next);
        }
    };

    // Wrapper so existing exercises that use setExercise("2") still work
    const setExercise = (numStr) => {
        const n = Number(numStr);
        setHighestUnlocked((prev) => Math.max(prev, n));
        setActiveExercise(n);
    };

    const categoryLabel = category
        ? category.charAt(0).toUpperCase() + category.slice(1)
        : "";

    return (
        <div style={{ minHeight: "100vh", background: "#F7F0E8" }}>

            {/* ── top bar ─────────────────────────────────────────────────── */}
            <div style={{
                position: "sticky", top: 0, zIndex: 20,
                background: "rgba(253,246,236,0.94)", backdropFilter: "blur(8px)",
                borderBottom: "1px solid #E8D5CC",
                padding: "13px 20px", display: "flex", alignItems: "center", gap: 20,
            }}>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="confirm-btn confirm-btn-confirm"
                    style={{ fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                >
                Back
                </button>
                <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 11, color: "#9A8880", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
                        {categoryLabel}
                    </p>
                    <p style={{ margin: 0, fontSize: 16, fontWeight: 900, color: "#1A0A0A" }}>
                        Level {id}
                    </p>
                </div>
                {/* progress pips */}
                <div style={{ display: "flex", gap: 5 }}>
                    {EXERCISES.map((n) => (
                        <div key={n} style={{
                            width: 28, height: 6, borderRadius: 9999,
                            background: n < activeExercise
                                ? "#7A0000"
                                : n === activeExercise
                                    ? "#7A000060"
                                    : "#E0D0CA",
                            transition: "background 0.3s",
                        }} />
                    ))}
                </div>
            </div>

            {/* ── exercise tabs ────────────────────────────────────────────── */}
            <div style={{
                display: "flex", gap: 10, overflowX: "auto", padding: "18px 16px 4px",
                scrollbarWidth: "none",
            }}>
                {EXERCISES.map((n) => (
                    <ExerciseTab
                        key={n}
                        num={n}
                        active={activeExercise}
                        unlocked={n <= highestUnlocked}
                        onClick={() => n <= highestUnlocked && setActiveExercise(n)}
                    />
                ))}
            </div>

            {/* ── exercise content ─────────────────────────────────────────── */}
            <div style={{ maxWidth: 640, margin: "0 auto", padding: "20px 16px 60px" }}>
                {/* active exercise label */}
                <div style={{
                    background: "#7A0000", color: "#fff",
                    borderRadius: "12px 12px 0 0", padding: "10px 18px",
                    fontWeight: 800, fontSize: 13, letterSpacing: 0.4,
                    display: "flex", alignItems: "center", gap: 8,
                }}>
                    📝 Exercise {activeExercise} — {EXERCISE_LABELS[activeExercise]}
                </div>
                <div style={{
                    background: "#fff", border: "2px solid #7A000030",
                    borderRadius: "0 0 16px 16px", padding: "24px 20px",
                    boxShadow: "0 4px 20px #00000010",
                }}>
                    {activeExercise === 1 && (
                        <ExerciseOne level={id} category={category} setExercise={setExercise} />
                    )}
                    {activeExercise === 2 && (
                        <ExerciseTwo level={id} category={category} setExercise={setExercise} textData={data} />
                    )}
                    {activeExercise === 3 && (
                        <ExerciseThree level={id} category={category} setExercise={setExercise} pictureData={data} />
                    )}
                    {activeExercise === 4 && (
                        <ExerciseFour level={id} category={category} setExercise={setExercise} audioData={data} />
                    )}
                    {activeExercise === 5 && (
                        <ExerciseFive level={id} category={category} audioData={data} />
                    )}
                </div>
            </div>
        </div>
    );
}