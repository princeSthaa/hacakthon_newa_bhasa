const PROGRESS_KEY = "newari_progress_v1";
export function getProgress() {
    const saved = localStorage.getItem(PROGRESS_KEY);

  if (saved) {
    return JSON.parse(saved);
  }


  const defaultProgress = {
    unlockedLevel: 1,
    exercises: {
      1: 1,
    },
  };

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(defaultProgress));
  return defaultProgress;
}

export function unlockNextExercise(level, currentExercise) {
  const progress = getProgress();

  const nextExercise = currentExercise + 1;

  if (!progress.exercises[level]) {
    progress.exercises[level] = 1;
  }

  if (nextExercise <= 5) {
    progress.exercises[level] = Math.max(
      progress.exercises[level],
      nextExercise
    );
  } else {
    const nextLevel = Number(level) + 1;

    progress.unlockedLevel = Math.max(
      progress.unlockedLevel,
      nextLevel
    );

    if (!progress.exercises[nextLevel]) {
      progress.exercises[nextLevel] = 1;
    }
  }

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function isLevelUnlocked(level) {
  const progress = getProgress();
  return Number(level) <= Number(progress.unlockedLevel);
}

export function isExerciseUnlocked(level, exercise) {
  const progress = getProgress();

  if (!progress.exercises[level]) {
    progress.exercises[level] = 1;
  }

  return Number(exercise) <= Number(progress.exercises[level]);
}

export function resetProgress() {
  localStorage.removeItem(PROGRESS_KEY);
}