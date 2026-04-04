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
    const [data, setData] = useState([]);
    
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
                    <ExerciseTwo level={id} category={category} setExercise={setExercise} textData={data}/>
                }
                {
                    exercise === "3" &&
                    <ExerciseThree level={id} category={category} setExercise={setExercise} pictureData={data}/>
                }
                {
                    exercise === "4" &&
                    <ExerciseFour level={id} category={category} setExercise={setExercise} audioData={data}/>
                }
                {
                    exercise === "5" &&
                    <ExerciseFive level={id} category={category} audioData={data}/>
                }
            </div>
        </>
    )
}
