export interface Routine {
  id: string;
  name: string;
  day: string;
}

export interface RoutineExercise {
  id: string;
  name: string;
  sets_data: string;
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
