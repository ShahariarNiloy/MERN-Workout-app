import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import WorkoutEditForm from "./WorkoutEditForm";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({
  workout,
  id,
  setShowWhichEditForm,
  showWhichEditForm,
}) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [showEditForm, setShowEditForm] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    if (workout.createdAt !== workout.updatedAt) {
      setIsUpdate(true);
    }
  }, [showWhichEditForm, workout]);
  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const handleEdit = () => {
    setShowWhichEditForm(id);
    setShowEditForm(true);
  };

  return (
    <>
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
          <strong>Created: </strong>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          }).replace("about", "About")}
        </p>
        {isUpdate ? (
          <p>
            <strong>Edited: </strong>
            {formatDistanceToNow(new Date(workout.updatedAt), {
              addSuffix: true,
            }).replace("about", "About")}
          </p>
        ) : (
          <></>
        )}
        <span
          className="material-symbols-outlined"
          style={{ marginRight: "45px" }}
          onClick={handleEdit}
        >
          edit
        </span>

        <span className="material-symbols-outlined" onClick={handleDelete}>
          delete
        </span>
      </div>

      {showEditForm && (
        <WorkoutEditForm
          key={id}
          workout={workout}
          id={id}
          setShowEditForm={setShowEditForm}
          setShowWhichEditForm={setShowWhichEditForm}
          showWhichEditForm={showWhichEditForm}
        />
      )}
    </>
  );
};

export default WorkoutDetails;
