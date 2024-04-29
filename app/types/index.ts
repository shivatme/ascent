export interface Routine {
  id: string;
  name: string;
  day: string;
}

export interface RoutineExercise {
  id: string;
  name: string;
  sets_data: SetData[];
}

interface SetData {
  reps: number;
  weight: number;
}

export interface EditRoutineExercise {
  id: string;
  sets_data: SetData[]; // Declare sets_data as an array of SetData
  routine_id?: string;
  exercise_id?: string;
  name: string;
}

export interface Muscles {
  primaryMuscles: string;
}

export interface Exercise {
  name: string;
  force: string;
  level: string;
  mechanic: string;
  equipment: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  images: string[];
  id: string;
}
