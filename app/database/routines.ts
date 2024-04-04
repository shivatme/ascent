import * as SQLite from "expo-sqlite/next";
import { Exercise, Routine, RoutineExercise } from "../types";

const db = SQLite.openDatabaseSync("Ascent.db");

const addRoutine = async (id: string, routine: string, day: string) => {
  const result = await db.runAsync(
    `INSERT INTO routines (id, name, day) VALUES (?, ?, ?)`,
    [id, routine, day]
  );
  return result;
};

const getRoutines = async () => {
  const result = await db.getAllAsync<Routine>("SELECT * FROM routines;");

  return result;
};

const deleteRoutine = async (routine: Routine) => {
  const result = await db.runAsync(`DELETE FROM routines WHERE id = ?`, [
    routine.id,
  ]);
  return result;
};

const getRoutineExercises = async (routine_id: string) => {
  const result = await db.getAllAsync<RoutineExercise>(
    `SELECT routine_exercises.id, name, sets_data
    FROM routine_exercises
    JOIN exercises
        ON routine_exercises.exercise_id=exercises.id
        WHERE routine_id=?;`,
    [routine_id]
  );

  return result;
};

const addRoutineExercise = async (
  routine_id: string,
  exercise_id: string,
  sets_data: string
) => {
  const result = await db.runAsync(
    `INSERT INTO routine_exercises (routine_id, exercise_id, sets_data) VALUES (?, ?, ?)`,
    [routine_id, exercise_id, sets_data]
  );
  return result;
};

export default {
  getRoutines,
  deleteRoutine,
  addRoutine,
  getRoutineExercises,
  addRoutineExercise,
};
