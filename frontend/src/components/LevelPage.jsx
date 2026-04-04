import { useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import ExerciseOne from "./ExerciseOne";
import ExerciseTwo from "./ExerciseTwo";
import ExerciseThree from "./ExerciseThree";
import ExerciseFour from "./ExerciseFour";
import ExerciseFive from "./ExerciseFive";
import {
    isLevelUnlocked,
    isExerciseUnlocked,
} from "../utils/progress";
import { useNavigate } from "react-router-dom";

export default function LevelPage() {
    const { level, category } = useParams();

    const [exercise, setExercise] = useState("1");
    const navigate = useNavigate();

    // 🔒 PREMIUM LOCK
    if (Number(level) > 5) {
        navigate("/premium");
        return null;
    }

    if (!isLevelUnlocked(level)) {
        return (
            <div className="text-center mt-10 text-red-500 text-xl">
                🔒 You must complete previous levels first.
            </div>
        );
    }

    const openExercise = (num) => {
        if (isExerciseUnlocked(level, num)) {
            setExercise(String(num));
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl mb-6 font-bold">
                Level {level} - {category}
            </h1>

            <div className="flex gap-3 mb-8 flex-wrap">
                {[1, 2, 3, 4, 5].map((num) => {
                    const unlocked = isExerciseUnlocked(level, num);

                    return (
                        <button
                            key={num}
                            disabled={!unlocked}
                            onClick={() => openExercise(num)}
                            className={`px-4 py-2 rounded border ${exercise === String(num)
                                ? "bg-green-500 text-white"
                                : unlocked
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                }`}
                        >
                            Exercise {num} {unlocked ? "✅" : "🔒"}
                        </button>
                    );
                })}
            </div>

            {exercise === "1" && (
                <ExerciseOne
                    level={level}
                    category={category}
                    setExercise={setExercise}
                />
            )}

            {exercise === "2" && (
                <ExerciseTwo
                    level={level}
                    category={category}
                    setExercise={setExercise}
                />
            )}

            {exercise === "3" && (
                <ExerciseThree
                    level={level}
                    category={category}
                    setExercise={setExercise}
                />
            )}

            {exercise === "4" && (
                <ExerciseFour
                    level={level}
                    category={category}
                    setExercise={setExercise}
                />
            )}

            {exercise === "5" && (
                <ExerciseFive
                    level={level}
                    category={category}
                    setExercise={setExercise}
                />
            )}
        </div>
    );
}