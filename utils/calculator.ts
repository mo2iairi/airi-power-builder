
import { BODYWEIGHT_EXERCISES, EXERCISE_TRANSLATIONS } from '../constants';
import { ProgramTemplate, UserSettings, ExerciseType, Language } from '../types';

/**
 * Rounds a weight to the nearest increment based on the smallest plate available.
 * step = smallestPlate * 2 (because you add plates to both sides)
 */
export const roundWeight = (weight: number, smallestPlate: number): number => {
  if (weight <= 0) return 0;
  const step = smallestPlate * 2;
  return Math.round(weight / step) * step;
};

/**
 * Helper to get display name based on language
 */
export const getExerciseDisplayName = (name: string, lang: Language): string => {
  if (EXERCISE_TRANSLATIONS[name]) {
    return EXERCISE_TRANSLATIONS[name][lang];
  }
  return name;
};

/**
 * Extract unique exercise names from a template that likely require a 1RM input.
 */
export const extractRequiredLifts = (template: ProgramTemplate): string[] => {
  const lifts = new Set<string>();
  
  template.weeks.forEach(week => {
    week.days.forEach(day => {
      day.exercises.forEach(ex => {
        if (ex.name && ex.percent > 0) {
           lifts.add(ex.name);
        }
      });
    });
  });

  return Array.from(lifts).sort();
};

/**
 * Calculates the working weight.
 * Special Logic: For Squat and Pull-up type movements: (1RM + BW) * Intensity - BW
 */
export const calculateLoad = (
  exerciseName: string,
  intensity: number,
  settings: UserSettings
): number => {
  const { bodyWeight, smallestPlate, oneRMs } = settings;
  
  // 1. Try exact match (Enum match)
  let base1RM = oneRMs[exerciseName] || 0;

  // 2. Fallback Logic for compatibility or partial matches
  if (base1RM === 0) {
      // Simple mapping fallback if strict match fails (e.g. PauseSquat uses Squat max)
      if (exerciseName === ExerciseType.PauseSquat) base1RM = oneRMs[ExerciseType.Squat] || 0;
  }

  // 3. Check if it's a bodyweight compound movement
  const isSpecialBodyweight = BODYWEIGHT_EXERCISES.includes(exerciseName as ExerciseType) || 
    ['squat', 'pull', 'chin', 'dip', '深蹲', '引体'].some(k => exerciseName.toLowerCase().includes(k));

  let targetLoad = 0;

  if (isSpecialBodyweight) {
    // Formula: (1RM + BodyWeight) * Intensity% - BodyWeight
    const totalCapacity = base1RM + bodyWeight;
    const totalTarget = totalCapacity * (intensity / 100);
    targetLoad = totalTarget - bodyWeight;
  } else {
    // Standard Formula
    targetLoad = base1RM * (intensity / 100);
  }

  return roundWeight(targetLoad, smallestPlate);
};
