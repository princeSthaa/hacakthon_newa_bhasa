import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ExerciseOne from "../components/ExerciseOne";
import ExerciseTwo from "../components/ExerciseTwo";
import ExerciseThree from "../components/ExerciseThree";
import ExerciseFour from "../components/ExerciseFour";
import ExerciseFive from "../components/ExerciseFive";

export default function Level() {
    let navigate = useNavigate();
    const { id, category } = useParams();
    const exercises = [1, 2, 3, 4, 5];
    const [exercise, setExercise] = useState("1");
    useEffect(() => {
        if (!localStorage.getItem("userLoggedIn")) {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <button className="border" onClick={() => { navigate("/dashboard") }}>Go Back</button>
            <div>Level {id}</div>
            <div>Category {category}</div>
            <div className="flex gap-4">
                {exercises.map((exe) => (
                    <button key={exe} className="exercise" onClick={() => { setExercise(`${exe}`) }}>Exercise {exe}</button>
                ))}
            </div>
            <div>
                {
                    exercise === "1" &&
                    <ExerciseOne level={id} category={category} setExercise={setExercise} />
                }
                {
                    exercise === "2" &&
                    <ExerciseTwo level={id} category={category} setExercise={setExercise} />
                }
                {
                    exercise === "3" &&
                    <ExerciseThree level={id} category={category} setExercise={setExercise} />
                }
                {
                    exercise === "4" &&
                    <ExerciseFour level={id} category={category} setExercise={setExercise} />
                }
                {
                    exercise === "5" &&
                    <ExerciseFive level={id} category={category} />
                }
            </div>
        </>
    )
}
