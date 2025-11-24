
import { ProgramTemplate, UserSettings, ExerciseType } from './types';

export const EXERCISE_TRANSLATIONS: Record<string, { zh: string; en: string }> = {
  [ExerciseType.Squat]: { zh: "深蹲", en: "Squat" },
  [ExerciseType.Bench]: { zh: "卧推", en: "Bench Press" },
  [ExerciseType.Deadlift]: { zh: "硬拉", en: "Deadlift" },
  [ExerciseType.PullUp]: { zh: "引体向上", en: "Pull-up" },
  [ExerciseType.PauseSquat]: { zh: "暂停深蹲", en: "Pause Squat" },
  [ExerciseType.OverheadPress]: { zh: "推举", en: "Overhead Press" },
};

export const DEFAULT_SETTINGS: UserSettings = {
  bodyWeight: 75,
  smallestPlate: 1.25,
  oneRMs: {
    [ExerciseType.Squat]: 140,
    [ExerciseType.Bench]: 100,
    [ExerciseType.Deadlift]: 180,
    [ExerciseType.PullUp]: 20,
  },
  selectedTemplateId: "default-1",
};

export const DEFAULT_TEMPLATES: ProgramTemplate[] = [
{
  "id": "default-1",
  "name": "通用模板（力训）",
  "author": "system",
  "description": "蹲推拉常规计划",
  "weeks": [
    {
      "id": "w1",
      "name": "每周相同",
      "days": [
        {
          "name": "周一",
          "exercises": [
            {
              "name": "Squat",
              "percent": 93,
              "sets": 1,
              "reps": 4
            },
            {
              "name": "Squat",
              "percent": 89,
              "sets": 4,
              "reps": 6
            },
            {
              "name": "Bench",
              "percent": 87,
              "sets": 4,
              "reps": 4
            },
            {
              "name": "PullUp",
              "percent": 78,
              "sets": 4,
              "reps": 8
            }
          ]
        },
        {
          "name": "周三",
          "exercises": [
            {
              "name": "Bench",
              "percent": 88,
              "sets": 4,
              "reps": 4
            },
            {
              "name": "Squat",
              "percent": 89,
              "sets": 4,
              "reps": 6
            },
            {
              "name": "OverheadPress",
              "percent": 78,
              "sets": 4,
              "reps": 8
            },
            {
              "name": "Deadlift",
              "percent": 92,
              "sets": 1,
              "reps": 1
            }
          ]
        },
        {
          "name": "周五",
          "exercises": [
            {
              "name": "Squat",
              "percent": 96,
              "sets": 1,
              "reps": 4
            },
            {
              "name": "Squat",
              "percent": 90,
              "sets": 4,
              "reps": 6
            },
            {
              "name": "Bench",
              "percent": 88,
              "sets": 4,
              "reps": 4
            },
            {
              "name": "PullUp",
              "percent": 79,
              "sets": 4,
              "reps": 8
            }
          ]
        }
      ]
    }
  ]
},
];

// Exercises that trigger the (1RM + BW) * % - BW formula
export const BODYWEIGHT_EXERCISES = [
  ExerciseType.Squat,
  ExerciseType.PullUp, 
  ExerciseType.PauseSquat
];
