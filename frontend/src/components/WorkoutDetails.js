import moment from "moment";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const createdAtDate = moment(
    workout.createdAt.split("T")[0],
    "YYYY-MM-DD"
  ).format("DD-MMM-YYYY");
  const createdAtTime = moment(
    workout.createdAt.split("T")[1].split(".")[0],
    "hh:mm:ss"
  ).format("hh:mm a");

  const handleClick = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>
        <strong>Date: </strong>
        {createdAtDate}
      </p>
      <p>
        <strong>Time: </strong>
        {createdAtTime}
      </p>

      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
