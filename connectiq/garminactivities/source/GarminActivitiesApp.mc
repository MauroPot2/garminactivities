using Toybox.Activity as Activity;
using Toybox.ActivityRecording as Recording;
using Toybox.Application as App;
using Toybox.Timer as Timer;
using Toybox.WatchUi as Ui;

class GarminActivitiesApp extends App.AppBase {
    private var _engine;
    private var _session = null;
    private var _timer;
    private var _workoutSaved = false;

    function initialize() {
        App.AppBase.initialize();
        _engine = new WorkoutEngine();
        _timer = new Timer.Timer();
        _timer.start(method(:onTick), 1000, true);
    }

    function getInitialView() {
        var view = new DashboardView();
        return [ view, new DashboardDelegate() ];
    }

    function getEngine() {
        return _engine;
    }

    function showDashboard() {
        Ui.switchToView(new DashboardView(), new DashboardDelegate(), Ui.SLIDE_RIGHT);
    }

    function showWorkout() {
        var view = new WorkoutView(_engine);
        Ui.switchToView(view, new WorkoutDelegate(_engine), Ui.SLIDE_LEFT);
    }

    function toggleWorkout() {
        if (_engine.isComplete()) {
            return;
        }

        _engine.toggle();
        if (_engine.isRunning()) {
            startRecording();
        } else {
            pauseRecording();
        }
        Ui.requestUpdate();
    }

    function onTick() as Void {
        _engine.tick();

        if (_engine.isComplete() && !_workoutSaved) {
            _workoutSaved = true;
            finishRecording();
        }

        Ui.requestUpdate();
    }

    function startRecording() {
        if (_session == null) {
            _session = Recording.createSession({
                :name=>"GarminActivities",
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
        if (_timer != null) {
            _timer.stop();
        }
        finishRecording();
    }
}
