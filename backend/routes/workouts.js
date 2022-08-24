const express = require("express");
const {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const router = express.Router();

// Get All Workouts
router.get("/", getAllWorkouts);

// Get a Single Workout
router.get("/:id", getSingleWorkout);

// Post a new Workout
router.post("/", createWorkout);

// Delete a Workout
router.delete("/:id", deleteWorkout);

// Update a Workout
router.patch("/:id", updateWorkout);

module.exports = router;
