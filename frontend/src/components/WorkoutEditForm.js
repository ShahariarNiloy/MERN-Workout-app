import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutEditForm = ({
  workout,
  id,
  setShowEditForm,
  showWhichEditForm,
}) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    if (showWhichEditForm !== id) {
      setShowEditForm(false);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    const workouts = { title, load, reps };
    if (title === "") {
      workouts.title = workout.title;
    }
    if (load === "") {
      workouts.load = workout.load;
    }
    if (reps === "") {
      workouts.reps = workout.reps;
    }

    const response = await fetch(`/api/workouts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(workouts),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json?.emptyField);
    }
    if (response.ok) {
      setShowEditForm(false);
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      setEmptyFields([]);
      dispatch({
        type: "EDIT_WORKOUT",
        payload: {
          ...json,
          title: workouts.title,
          reps: workouts.reps,
          load: workouts.load,
        },
      });
    }
  };
  const handleClose = () => {
    setShowEditForm(false);
    setError(null);
    setTitle("");
    setLoad("");
    setReps("");
    setEmptyFields([]);
  };

  return (
    <div className="workout-edit">
      <form className="edit" onSubmit={handleSubmit}>
        <h3>Edit Workout</h3>

        <label>Exercise Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
          required
        />

        <label>Load (in kg):</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFields.includes("load") ? "error" : ""}
          required
        />

        <label>Number of Reps:</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes("reps") ? "error" : ""}
          required
        />

        <button>Edit</button>
        <button className="close" onClick={handleClose}>
          Close
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default WorkoutEditForm;
