import * as SQLite from "expo-sqlite/next";
import { Exercise, Muscles } from "../types";

const db = SQLite.openDatabaseSync("Ascent.db");

const getMuscleGroups = async () => {
  console.log("ca");
  const result = await db.getAllAsync<Muscles>(
    "SELECT DISTINCT primaryMuscles FROM exercises;"
  );
  return result;
};

const getMuscleExercise = async (primaryMuscle: string) => {
  const result = await db.getAllAsync<Exercise>(
    "SELECT * FROM exercises WHERE primaryMuscles=?;",
    [primaryMuscle]
  );
  return result;
};

async function getAllExercises() {
  const result = await db.getAllAsync<Exercise>("SELECT * FROM exercises;");

  return result;
}

export default { getMuscleGroups, getMuscleExercise, getAllExercises };
