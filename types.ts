
export interface UserSettings {
  bodyWeight: number;
  smallestPlate: number; // Smallest plate on one side (e.g. 1.25kg)
  oneRMs: Record<string, number>; // Dynamic mapping: "ExerciseType" -> Weight
  selectedTemplateId: string;
}

export enum ExerciseType {
  Squat = "Squat",
  Bench = "Bench",
  Deadlift = "Deadlift",
  PullUp = "PullUp",
  PauseSquat = "PauseSquat",
  OverheadPress = "OverheadPress"
}

export interface Exercise {
  name: string | ExerciseType;
  percent: number; // Intensity (0-100)
  sets: number;
  reps: number;
}

export interface Day {
  name: string;
  exercises: Exercise[];
}

export interface Week {
  id: string; // For React keys
  name: string;
  days: Day[];
}

export interface ProgramTemplate {
  id: string;
  name: string;
  author: string;
  description: string;
  weeks: Week[];
}

export enum Language {
  ZH = 'zh',
  EN = 'en'
}
