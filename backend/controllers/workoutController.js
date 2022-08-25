const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workouts

const getAllWorkouts = async (req, res) => {
  try {
    const user_id = req.user._id;

    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get a single workout

const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({ error: "Not A Valid Workout Id" });
  }

  try {
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(400).json({ error: "No Workout Found" });
    }
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// create a new workout

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  const emptyField = [];

  if (!title) {
    emptyField.push("title");
  }
  if (!load) {
    emptyField.push("load");
  }
  if (!reps) {
    emptyField.push("reps");
  }
  if (emptyField.length > 0) {
    return res
      .status(400)
      .json({ error: "Please Fill Out All The Field", emptyField });
  }

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete a workout

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({ error: "Not A Valid Workout Id" });
  }
  try {
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
      return res.status(400).json({ error: "No Workout Found" });
    }
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// update a workout

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({ error: "Not A Valid Workout Id" });
  }

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!workout) {
      return res.status(400).json({ error: "No Workout Found" });
    }
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
