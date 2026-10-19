using Toybox.Application as App;
using Toybox.Activity as Activity;
using Toybox.ActivityRecording as Recording;

class GarminActivitiesWorkoutApp extends App.AppBase {
    private var _engine;
    private var _session = null;

    function initialize() {
        App.AppBase.initialize();
        _engine = new WorkoutEngine();
    }

    function getInitialView() {
        var view = new WorkoutView(_engine);
        return [ view, new WorkoutDelegate(view, _engine) ];
    }

    function getEngine() {
        return _engine;
    }

    function startRecording() {
        if (_session == null) {
            _session = Recording.createSession({
                :name=>"GA Workout",
                :sport=>Activity.SPORT_CYCLING,
                :subSport=>Activity.SUB_SPORT_ROAD
            });
        }

        if (!_session.isRecording()) {
            _session.start();
        }
    }

    function pauseRecording() {
        if (_session != null && _session.isRecording()) {
            _session.stop();
        }
    }

    function finishRecording() {
        if (_session == null) {
            return;
        }

        if (_session.isRecording()) {
            _session.stop();
        }
        _session.save();
        _session = null;
    }

    function onStop(state) {
        finishRecording();
    }
}
