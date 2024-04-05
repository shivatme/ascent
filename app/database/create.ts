// -- First, alter the table to rename the sets_data column and add a new sets_json column
// ALTER TABLE routine_exercises
// RENAME TO routine_exercises_old;

// CREATE TABLE routine_exercises (
//     id INTEGER PRIMARY KEY,
//     routine_id TEXT,
//     exercise_id TEXT,
//     sets_json TEXT,
//     FOREIGN KEY (routine_id) REFERENCES routines(id),
//     FOREIGN KEY (exercise_id) REFERENCES exercises(id)
// );

// -- Now, update the sets_json column with the JSON-formatted sets_data from the old table
// INSERT INTO routine_exercises (id, routine_id, exercise_id, sets_json)
// SELECT id, routine_id, exercise_id, sets_data FROM routine_exercises_old;

// -- Drop the old table once the data has been transferred
// DROP TABLE routine_exercises_old;
