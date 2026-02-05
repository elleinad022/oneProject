export const normalizeExerciseName = (name) => {
  return name.toLowerCase().trim().replace(/\s+/g, "");
};
