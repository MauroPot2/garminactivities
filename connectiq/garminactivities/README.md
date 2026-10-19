# GarminActivities for Edge 530

Single Connect IQ watch-app for the Edge 530.

## Screens

### Dashboard
Restores the original GarminActivities riding dashboard with power, power zone, heart rate, cadence, speed, distance, grade, elapsed time and ascent.

Press `DOWN` to open the workout screen.

### Workout
Shows the current workout step, live power, target range, remaining time, heart rate, cadence and next step.

- `START`: start/pause workout and FIT recording
- `LAP`: advance to the next step
- `UP` or `ESC`: return to Dashboard without stopping the workout

The workout timer lives in the application object, so it keeps running while switching between Dashboard and Workout.

## Simulator-first workflow

Open `connectiq/garminactivities` in VS Code and run with `Command + F5`, selecting Edge 530. Do not side-load to the physical unit until this build has passed the simulator.

The current workout is still a local fixture. The next milestone is loading workouts created by VeloLab Workout Studio.
