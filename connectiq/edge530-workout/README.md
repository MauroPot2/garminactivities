# GarminActivities - Edge 530 Workout App

First Connect IQ MVP for following GarminActivities workouts directly on an Edge 530.

## What works in this first iteration

- Dedicated Connect IQ `watch-app` targeting Edge 530 (Connect IQ 3.3).
- Full-screen workout view sized dynamically for the Edge 530 display.
- Current step name and step counter.
- Step progress bar.
- Live current power, heart rate and cadence from `Toybox.Activity`.
- Power target with visual state:
  - yellow = below target
  - green = inside target
  - red = above target
- Remaining step time.
- Preview of the next step.
- Automatic step transitions.
- Manual step skip with the LAP button.
- START button starts/pauses the workout timer and FIT recording.
- FIT activity is saved when the workout finishes or the app exits.

## Current demo workout

The MVP currently ships with an in-app fixture:

1. 10:00 warm-up at 120-150 W
2. 4 x:
   - 5:00 at 200-220 W
   - 2:00 at 100-130 W
3. 10:00 cool-down at 0-130 W

This fixture will be replaced by workouts downloaded from the GarminActivities portal/API.

## Edge 530 controls

- `START`: start / pause workout and activity recording
- `LAP`: advance to the next workout step
- `ESC`: exit; the current FIT activity is saved

## Run in the Connect IQ simulator

1. Install the Garmin Connect IQ SDK and the Monkey C extension for VS Code.
2. Open this `connectiq/edge530-workout` folder in VS Code.
3. Make sure Edge 530 is installed in the SDK Manager.
4. Open a `.mc` source file.
5. Run `Monkey C: Run App` / Run Without Debugging and select Edge 530.

## Side-load on a physical Edge 530

1. Connect the Edge 530 to the Mac via USB.
2. Run `Monkey C: Build for Device` in VS Code.
3. Select Edge 530.
4. Copy the generated `.prg` file into `GARMIN/APPS` on the Edge.
5. Disconnect safely and launch GarminActivities from the Connect IQ apps list.

No Connect IQ Store publication is required for side-loading during development.

## Next milestones

1. Replace the hard-coded fixture with the portal workout JSON model.
2. Add workout persistence for offline rides.
3. Add API synchronization through `Toybox.Communications`.
4. Add a workout-selection screen before the ride.
5. Add secondary data and workout-overview pages using UP/DOWN.
6. Add countdown/target alerts and step-change feedback.
7. Save workout metadata and step boundaries into the resulting FIT activity for post-ride analysis.
