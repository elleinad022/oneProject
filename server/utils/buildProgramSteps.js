const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function buildProgramSteps(plan) {
  const workoutMap = new Map();

  plan.forEach((day) => {
    workoutMap.set(day.day, day.exercises);
  });

  return WEEKDAYS.map((weekDay) => {
    if (workoutMap.has(weekDay)) {
      return {
        indexType: "workout",
        label: weekDay,
        exercises: workoutMap.get(weekDay),
      };
    }

    return {
      indexType: "rest",
      label: weekDay,
    };
  });
}
