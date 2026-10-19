using Toybox.Application as App;

class GarminWorkoutApp extends App.AppBase {
    function initialize() {
        App.AppBase.initialize();
    }

    function getInitialView() {
        return [ new WorkoutView(new WorkoutEngine()) ];
    }
}
