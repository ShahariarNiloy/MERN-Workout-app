const express = require("express");

const router = express.Router();

// Get All Workouts
router.get("/", (req, res) => {
  res.json({ message: "Get all workouts" });
});

// Get a Single Workout
router.get("/:id", (req, res) => {
  res.json({ message: "Get a Single workouts" });
});

// Post a new Workout
router.post("/", (req, res) => {
  res.json({ message: "Post a new workout" });
});

// Delete a Workout
router.delete("/:id", (req, res) => {
  res.json({ message: "Delete a  workout" });
});

// Update a Workout
router.patch("/:id", (req, res) => {
  res.json({ message: "Update a  workout" });
});

module.exports = router;
