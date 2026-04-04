import { useState } from "react";
import { useParams } from "react-router";
import ExerciseOne from "../ExerciseOne";
import ExerciseTwo from "../ExerciseTwo";
import ExerciseThree from "../ExerciseThree";
import ExerciseFour from "../ExerciseFour";
import ExerciseFive from "../ExerciseFive";

export default function Level() {
    const { id, category } = useParams();
    const exercises = [1,2,3,4,5];
    const [exercise,setExercise] = useState("1");
    return (
        <>
            <div>Level {id}</div>
            <div>Category {category}</div>
            <div className="flex gap-4">
                {exercises.map((exe) => (
                    <button key={exe} className="exercise" onClick={()=>{setExercise(`${exe}`)}}>Exercise {exe}</button>
                ))}
            </div>
            <div>
                {
                    exercise==="1" &&
                    <ExerciseOne level={id} category={category} setExercise={setExercise}/>
                }
                {
                    exercise==="2" &&
                    <ExerciseTwo level={id} category={category} setExercise={setExercise}/>
                }
                {
                    exercise==="3" &&
                    <ExerciseThree level={id} category={category} setExercise={setExercise}/>
                }
                {
                    exercise==="4" &&
                    <ExerciseFour level={id} category={category} setExercise={setExercise}/>
                }
                {
                    exercise==="5" &&
                    <ExerciseFive level={id} category={category}/>
                }
            </div>
        </>
    )
}
